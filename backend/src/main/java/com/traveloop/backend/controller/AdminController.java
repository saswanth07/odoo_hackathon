package com.traveloop.backend.controller;

import com.traveloop.backend.dto.AnalyticsResponseDTO;
import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AnalyticsService analyticsService;

    public AdminController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<AnalyticsResponseDTO>> getAnalytics() {
        AnalyticsResponseDTO response = analyticsService.getPlatformAnalytics();
        return ResponseEntity.ok(new ApiResponse<>(true, "Analytics retrieved successfully", response));
    }
}
