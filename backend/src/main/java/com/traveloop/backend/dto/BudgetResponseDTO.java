package com.traveloop.backend.dto;

import java.util.List;

public class BudgetResponseDTO {
    private Long tripId;
    private Double budgetLimit;
    private Double totalEstimatedCost;
    private String status; // e.g., OVER_BUDGET, UNDER_BUDGET
    private Double averageDailyCost;
    private List<String> optimizationSuggestions;
    private List<ActivityResponseDTO> expensiveActivities;
    private List<StopResponseDTO> expensiveStops;

    public BudgetResponseDTO() {
    }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }
    public Double getBudgetLimit() { return budgetLimit; }
    public void setBudgetLimit(Double budgetLimit) { this.budgetLimit = budgetLimit; }
    public Double getTotalEstimatedCost() { return totalEstimatedCost; }
    public void setTotalEstimatedCost(Double totalEstimatedCost) { this.totalEstimatedCost = totalEstimatedCost; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Double getAverageDailyCost() { return averageDailyCost; }
    public void setAverageDailyCost(Double averageDailyCost) { this.averageDailyCost = averageDailyCost; }
    public List<String> getOptimizationSuggestions() { return optimizationSuggestions; }
    public void setOptimizationSuggestions(List<String> optimizationSuggestions) { this.optimizationSuggestions = optimizationSuggestions; }
    public List<ActivityResponseDTO> getExpensiveActivities() { return expensiveActivities; }
    public void setExpensiveActivities(List<ActivityResponseDTO> expensiveActivities) { this.expensiveActivities = expensiveActivities; }
    public List<StopResponseDTO> getExpensiveStops() { return expensiveStops; }
    public void setExpensiveStops(List<StopResponseDTO> expensiveStops) { this.expensiveStops = expensiveStops; }
}
