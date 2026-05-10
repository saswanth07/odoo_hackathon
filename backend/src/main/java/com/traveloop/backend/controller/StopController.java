package com.traveloop.backend.controller;

import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.dto.StopRequestDTO;
import com.traveloop.backend.dto.StopResponseDTO;
import com.traveloop.backend.service.StopService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StopController {

    private final StopService stopService;

    public StopController(StopService stopService) {
        this.stopService = stopService;
    }

    @PostMapping("/trips/{tripId}/stops")
    public ResponseEntity<ApiResponse<StopResponseDTO>> createStop(@PathVariable Long tripId, @Valid @RequestBody StopRequestDTO request) {
        StopResponseDTO response = stopService.createStop(tripId, request);
        return new ResponseEntity<>(new ApiResponse<>(true, "Stop created successfully", response), HttpStatus.CREATED);
    }

    @GetMapping("/trips/{tripId}/stops")
    public ResponseEntity<ApiResponse<List<StopResponseDTO>>> getStopsByTrip(@PathVariable Long tripId) {
        List<StopResponseDTO> response = stopService.getStopsByTrip(tripId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Stops retrieved successfully", response));
    }

    @PutMapping("/stops/{id}")
    public ResponseEntity<ApiResponse<StopResponseDTO>> updateStop(@PathVariable Long id, @Valid @RequestBody StopRequestDTO request) {
        StopResponseDTO response = stopService.updateStop(id, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Stop updated successfully", response));
    }

    @DeleteMapping("/stops/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStop(@PathVariable Long id) {
        stopService.deleteStop(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Stop deleted successfully", null));
    }
}
