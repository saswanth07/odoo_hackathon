package com.traveloop.backend.controller;

import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.dto.SharedTripDTO;
import com.traveloop.backend.service.SharedTripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SharedTripController {

    private final SharedTripService sharedTripService;

    public SharedTripController(SharedTripService sharedTripService) {
        this.sharedTripService = sharedTripService;
    }

    @PostMapping("/trips/{id}/share")
    public ResponseEntity<ApiResponse<SharedTripDTO>> generateShareLink(@PathVariable Long id) {
        SharedTripDTO response = sharedTripService.generateShareLink(id);
        return new ResponseEntity<>(new ApiResponse<>(true, "Share link generated successfully", response), HttpStatus.CREATED);
    }

    @GetMapping("/public/{token}")
    public ResponseEntity<ApiResponse<SharedTripDTO>> getSharedTrip(@PathVariable String token) {
        SharedTripDTO response = sharedTripService.getSharedTrip(token);
        return ResponseEntity.ok(new ApiResponse<>(true, "Shared trip retrieved successfully", response));
    }
}
