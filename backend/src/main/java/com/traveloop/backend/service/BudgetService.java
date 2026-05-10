package com.traveloop.backend.service;

import com.traveloop.backend.dto.BudgetResponseDTO;
import com.traveloop.backend.entity.Trip;
import org.springframework.stereotype.Service;

@Service
public class BudgetService {

    private final TripService tripService;
    private final OptimizationService optimizationService;

    public BudgetService(TripService tripService, OptimizationService optimizationService) {
        this.tripService = tripService;
        this.optimizationService = optimizationService;
    }

    public BudgetResponseDTO getBudgetAnalysis(Long tripId) {
        Trip trip = tripService.getTripEntity(tripId);
        return optimizationService.analyzeAndOptimizeBudget(trip);
    }
}
