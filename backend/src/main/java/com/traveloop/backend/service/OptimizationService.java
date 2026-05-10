package com.traveloop.backend.service;

import com.traveloop.backend.dto.ActivityResponseDTO;
import com.traveloop.backend.dto.BudgetResponseDTO;
import com.traveloop.backend.dto.StopResponseDTO;
import com.traveloop.backend.entity.Activity;
import com.traveloop.backend.entity.Stop;
import com.traveloop.backend.entity.Trip;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class OptimizationService {

    private final ActivityService activityService;
    private final StopService stopService;

    public OptimizationService(ActivityService activityService, StopService stopService) {
        this.activityService = activityService;
        this.stopService = stopService;
    }

    public BudgetResponseDTO analyzeAndOptimizeBudget(Trip trip) {
        BudgetResponseDTO analysis = new BudgetResponseDTO();
        analysis.setTripId(trip.getId());
        analysis.setBudgetLimit(trip.getBudgetLimit());

        double totalEstimatedCost = 0.0;
        List<ActivityResponseDTO> expensiveActivities = new ArrayList<>();
        List<StopResponseDTO> expensiveStops = new ArrayList<>();
        List<String> suggestions = new ArrayList<>();

        for (Stop stop : trip.getStops()) {
            double stopCost = 0.0;
            for (Activity activity : stop.getActivities()) {
                double cost = activity.getEstimatedCost() != null ? activity.getEstimatedCost() : 0.0;
                stopCost += cost;
                
                // Rule 2: If activity cost > 20% of budget
                if (cost > (trip.getBudgetLimit() * 0.20)) {
                    expensiveActivities.add(activityService.mapToResponse(activity));
                    suggestions.add("Consider finding cheaper alternatives for activity: " + activity.getActivityName());
                }
            }
            
            // Rule 3: If city cost index high (approximate by stop cost > 40% of budget)
            if (stopCost > (trip.getBudgetLimit() * 0.40)) {
                expensiveStops.add(stopService.mapToResponse(stop));
                suggestions.add("Consider reducing stay duration in expensive city: " + stop.getCityName());
            }
            totalEstimatedCost += stopCost;
        }

        analysis.setTotalEstimatedCost(totalEstimatedCost);

        // Rule 1: If estimatedCost > budgetLimit
        if (totalEstimatedCost > trip.getBudgetLimit()) {
            analysis.setStatus("OVER_BUDGET");
            suggestions.add("Your trip is over budget. Consider cheaper transport or public transport suggestions.");
        } else {
            analysis.setStatus("UNDER_BUDGET");
        }

        // Rule 4: Calculate Average Daily Cost
        long days = ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate());
        if (days == 0) days = 1; // avoid division by zero
        analysis.setAverageDailyCost(totalEstimatedCost / days);

        analysis.setExpensiveActivities(expensiveActivities);
        analysis.setExpensiveStops(expensiveStops);
        analysis.setOptimizationSuggestions(suggestions);

        return analysis;
    }
}
