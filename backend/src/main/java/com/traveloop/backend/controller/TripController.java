package com.traveloop.backend.controller;

import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.dto.TripRequestDTO;
import com.traveloop.backend.dto.TripResponseDTO;
import com.traveloop.backend.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TripResponseDTO>> createTrip(@Valid @RequestBody TripRequestDTO request, Authentication authentication) {
        TripResponseDTO response = tripService.createTrip(authentication.getName(), request);
        return new ResponseEntity<>(new ApiResponse<>(true, "Trip created successfully", response), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TripResponseDTO>>> getUserTrips(Authentication authentication) {
        List<TripResponseDTO> response = tripService.getUserTrips(authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Trips retrieved successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TripResponseDTO>> getTripById(@PathVariable Long id) {
        TripResponseDTO response = tripService.getTripById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Trip retrieved successfully", response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TripResponseDTO>> updateTrip(@PathVariable Long id, @Valid @RequestBody TripRequestDTO request) {
        TripResponseDTO response = tripService.updateTrip(id, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Trip updated successfully", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Trip deleted successfully", null));
    }
}
