package com.traveloop.backend.controller;

import com.traveloop.backend.dto.ActivityRequestDTO;
import com.traveloop.backend.dto.ActivityResponseDTO;
import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping("/stops/{stopId}/activities")
    public ResponseEntity<ApiResponse<ActivityResponseDTO>> createActivity(@PathVariable Long stopId, @Valid @RequestBody ActivityRequestDTO request) {
        ActivityResponseDTO response = activityService.createActivity(stopId, request);
        return new ResponseEntity<>(new ApiResponse<>(true, "Activity created successfully", response), HttpStatus.CREATED);
    }

    @GetMapping("/stops/{stopId}/activities")
    public ResponseEntity<ApiResponse<List<ActivityResponseDTO>>> getActivitiesByStop(@PathVariable Long stopId) {
        List<ActivityResponseDTO> response = activityService.getActivitiesByStop(stopId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Activities retrieved successfully", response));
    }

    @PutMapping("/activities/{id}")
    public ResponseEntity<ApiResponse<ActivityResponseDTO>> updateActivity(@PathVariable Long id, @Valid @RequestBody ActivityRequestDTO request) {
        ActivityResponseDTO response = activityService.updateActivity(id, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Activity updated successfully", response));
    }

    @DeleteMapping("/activities/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Activity deleted successfully", null));
    }
}
