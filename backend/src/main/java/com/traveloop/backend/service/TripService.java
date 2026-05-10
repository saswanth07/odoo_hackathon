package com.traveloop.backend.service;

import com.traveloop.backend.dto.TripRequestDTO;
import com.traveloop.backend.dto.TripResponseDTO;
import com.traveloop.backend.entity.Trip;
import com.traveloop.backend.entity.User;
import com.traveloop.backend.exception.ResourceNotFoundException;
import com.traveloop.backend.repository.TripRepository;
import com.traveloop.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;

    public TripService(TripRepository tripRepository, UserRepository userRepository) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
    }

    public TripResponseDTO createTrip(String userEmail, TripRequestDTO request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Trip trip = new Trip();
        trip.setTitle(request.getTitle());
        trip.setDescription(request.getDescription());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setBudgetLimit(request.getBudgetLimit());
        trip.setUser(user);

        Trip savedTrip = tripRepository.save(trip);
        return mapToResponse(savedTrip);
    }

    public List<TripResponseDTO> getUserTrips(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return tripRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TripResponseDTO getTripById(Long tripId) {
        Trip trip = getTripEntity(tripId);
        return mapToResponse(trip);
    }
    
    public Trip getTripEntity(Long tripId) {
        return tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + tripId));
    }

    public TripResponseDTO updateTrip(Long tripId, TripRequestDTO request) {
        Trip trip = getTripEntity(tripId);
        trip.setTitle(request.getTitle());
        trip.setDescription(request.getDescription());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setBudgetLimit(request.getBudgetLimit());

        Trip updatedTrip = tripRepository.save(trip);
        return mapToResponse(updatedTrip);
    }

    public void deleteTrip(Long tripId) {
        Trip trip = getTripEntity(tripId);
        tripRepository.delete(trip);
    }

    public TripResponseDTO mapToResponse(Trip trip) {
        TripResponseDTO dto = new TripResponseDTO();
        dto.setId(trip.getId());
        dto.setTitle(trip.getTitle());
        dto.setDescription(trip.getDescription());
        dto.setStartDate(trip.getStartDate());
        dto.setEndDate(trip.getEndDate());
        dto.setBudgetLimit(trip.getBudgetLimit());
        dto.setEstimatedCost(trip.getEstimatedCost());
        dto.setCreatedAt(trip.getCreatedAt());
        dto.setUserId(trip.getUser().getId());
        return dto;
    }
}
