package com.traveloop.backend.service;

import com.traveloop.backend.dto.AnalyticsResponseDTO;
import com.traveloop.backend.repository.StopRepository;
import com.traveloop.backend.repository.TripRepository;
import com.traveloop.backend.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final StopRepository stopRepository;

    public AnalyticsService(UserRepository userRepository, TripRepository tripRepository, StopRepository stopRepository) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
        this.stopRepository = stopRepository;
    }

    public AnalyticsResponseDTO getPlatformAnalytics() {
        long totalUsers = userRepository.count();
        long totalTrips = tripRepository.count();
        
        Double totalCost = tripRepository.sumAllEstimatedCosts();
        if (totalCost == null) {
            totalCost = 0.0;
        }

        List<Object[]> topCitiesResult = stopRepository.findTopCities(PageRequest.of(0, 5));
        Map<String, Long> topCities = new LinkedHashMap<>();
        for (Object[] row : topCitiesResult) {
            String city = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            topCities.put(city, count);
        }

        return new AnalyticsResponseDTO(totalUsers, totalTrips, totalCost, topCities);
    }
}
