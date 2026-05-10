package com.traveloop.backend.service;

import com.traveloop.backend.dto.SharedTripDTO;
import com.traveloop.backend.entity.SharedTrip;
import com.traveloop.backend.entity.Trip;
import com.traveloop.backend.exception.ResourceNotFoundException;
import com.traveloop.backend.repository.SharedTripRepository;
import org.springframework.stereotype.Service;

@Service
public class SharedTripService {

    private final SharedTripRepository sharedTripRepository;
    private final TripService tripService;

    public SharedTripService(SharedTripRepository sharedTripRepository, TripService tripService) {
        this.sharedTripRepository = sharedTripRepository;
        this.tripService = tripService;
    }

    public SharedTripDTO generateShareLink(Long tripId) {
        Trip trip = tripService.getTripEntity(tripId);

        SharedTrip sharedTrip = sharedTripRepository.findByTripId(tripId).orElse(new SharedTrip());
        sharedTrip.setTrip(trip);
        sharedTrip.setShareEnabled(true);
        // The token is generated automatically via @PrePersist if null

        SharedTrip savedSharedTrip = sharedTripRepository.save(sharedTrip);
        return mapToResponse(savedSharedTrip);
    }

    public SharedTripDTO getSharedTrip(String publicToken) {
        SharedTrip sharedTrip = sharedTripRepository.findByPublicToken(publicToken)
                .orElseThrow(() -> new ResourceNotFoundException("Shared trip not found"));
        
        if (!sharedTrip.getShareEnabled()) {
            throw new ResourceNotFoundException("This trip is not shared publicly.");
        }

        return mapToResponse(sharedTrip);
    }

    private SharedTripDTO mapToResponse(SharedTrip sharedTrip) {
        SharedTripDTO dto = new SharedTripDTO();
        dto.setId(sharedTrip.getId());
        dto.setPublicToken(sharedTrip.getPublicToken());
        dto.setShareEnabled(sharedTrip.getShareEnabled());
        dto.setCreatedAt(sharedTrip.getCreatedAt());
        dto.setTripId(sharedTrip.getTrip().getId());
        return dto;
    }
}
