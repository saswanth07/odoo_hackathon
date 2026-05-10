package com.traveloop.backend.dto;

import java.util.Map;

public class AnalyticsResponseDTO {
    private long totalUsers;
    private long totalTrips;
    private double totalPlatformEstimatedCost;
    private Map<String, Long> topCities;

    public AnalyticsResponseDTO() {}

    public AnalyticsResponseDTO(long totalUsers, long totalTrips, double totalPlatformEstimatedCost, Map<String, Long> topCities) {
        this.totalUsers = totalUsers;
        this.totalTrips = totalTrips;
        this.totalPlatformEstimatedCost = totalPlatformEstimatedCost;
        this.topCities = topCities;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalTrips() {
        return totalTrips;
    }

    public void setTotalTrips(long totalTrips) {
        this.totalTrips = totalTrips;
    }

    public double getTotalPlatformEstimatedCost() {
        return totalPlatformEstimatedCost;
    }

    public void setTotalPlatformEstimatedCost(double totalPlatformEstimatedCost) {
        this.totalPlatformEstimatedCost = totalPlatformEstimatedCost;
    }

    public Map<String, Long> getTopCities() {
        return topCities;
    }

    public void setTopCities(Map<String, Long> topCities) {
        this.topCities = topCities;
    }
}
