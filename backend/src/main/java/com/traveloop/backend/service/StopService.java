package com.traveloop.backend.service;

import com.traveloop.backend.dto.StopRequestDTO;
import com.traveloop.backend.dto.StopResponseDTO;
import com.traveloop.backend.entity.Stop;
import com.traveloop.backend.entity.Trip;
import com.traveloop.backend.exception.ResourceNotFoundException;
import com.traveloop.backend.repository.StopRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StopService {

    private final StopRepository stopRepository;
    private final TripService tripService;
    private final WeatherService weatherService;
    private final PackingService packingService;

    public StopService(StopRepository stopRepository, TripService tripService, 
                       WeatherService weatherService, PackingService packingService) {
        this.stopRepository = stopRepository;
        this.tripService = tripService;
        this.weatherService = weatherService;
        this.packingService = packingService;
    }

    public StopResponseDTO createStop(Long tripId, StopRequestDTO request) {
        Trip trip = tripService.getTripEntity(tripId);

        Stop stop = new Stop();
        stop.setCityName(request.getCityName());
        stop.setCountry(request.getCountry());
        stop.setArrivalDate(request.getArrivalDate());
        stop.setDepartureDate(request.getDepartureDate());
        stop.setPositionIndex(request.getPositionIndex());
        stop.setTrip(trip);

        Stop savedStop = stopRepository.save(stop);

        // Fetch weather and auto-pack items
        String condition = weatherService.getWeatherCondition(savedStop.getCityName());
        if (!"NORMAL".equals(condition)) {
            packingService.autoGenerateItems(tripId, condition);
        }

        return mapToResponse(savedStop);
    }

    public List<StopResponseDTO> getStopsByTrip(Long tripId) {
        return stopRepository.findByTripId(tripId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public StopResponseDTO updateStop(Long stopId, StopRequestDTO request) {
        Stop stop = stopRepository.findById(stopId)
                .orElseThrow(() -> new ResourceNotFoundException("Stop not found with id: " + stopId));

        stop.setCityName(request.getCityName());
        stop.setCountry(request.getCountry());
        stop.setArrivalDate(request.getArrivalDate());
        stop.setDepartureDate(request.getDepartureDate());
        stop.setPositionIndex(request.getPositionIndex());

        Stop updatedStop = stopRepository.save(stop);
        return mapToResponse(updatedStop);
    }

    public void deleteStop(Long stopId) {
        Stop stop = stopRepository.findById(stopId)
                .orElseThrow(() -> new ResourceNotFoundException("Stop not found with id: " + stopId));
        stopRepository.delete(stop);
    }

    public StopResponseDTO mapToResponse(Stop stop) {
        StopResponseDTO dto = new StopResponseDTO();
        dto.setId(stop.getId());
        dto.setCityName(stop.getCityName());
        dto.setCountry(stop.getCountry());
        dto.setArrivalDate(stop.getArrivalDate());
        dto.setDepartureDate(stop.getDepartureDate());
        dto.setPositionIndex(stop.getPositionIndex());
        dto.setEstimatedStayCost(stop.getEstimatedStayCost());
        dto.setTripId(stop.getTrip().getId());
        return dto;
    }
}
