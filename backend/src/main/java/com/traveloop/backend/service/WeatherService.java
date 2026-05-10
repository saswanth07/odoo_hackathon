package com.traveloop.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getWeatherCondition(String cityName) {
        try {
            // 1. Get Coordinates (Geocoding API)
            String geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + cityName + "&count=1";
            Map<String, Object> geoResponse = restTemplate.getForObject(geoUrl, Map.class);
            
            if (geoResponse == null || !geoResponse.containsKey("results")) {
                return "NORMAL"; // Fallback if city not found
            }

            List<Map<String, Object>> results = (List<Map<String, Object>>) geoResponse.get("results");
            if (results.isEmpty()) {
                return "NORMAL";
            }

            Map<String, Object> location = results.get(0);
            Double lat = (Double) location.get("latitude");
            Double lon = (Double) location.get("longitude");

            // 2. Get Forecast
            String weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&daily=precipitation_sum,temperature_2m_max&timezone=auto";
            Map<String, Object> weatherResponse = restTemplate.getForObject(weatherUrl, Map.class);

            if (weatherResponse == null || !weatherResponse.containsKey("daily")) {
                return "NORMAL";
            }

            Map<String, Object> daily = (Map<String, Object>) weatherResponse.get("daily");
            List<Double> precipitation = (List<Double>) daily.get("precipitation_sum");
            List<Double> maxTemps = (List<Double>) daily.get("temperature_2m_max");

            // Analyze next few days (sum precipitation, avg temp)
            double totalPrecip = 0;
            double avgMaxTemp = 0;
            int days = Math.min(3, precipitation.size());

            for (int i = 0; i < days; i++) {
                if (precipitation.get(i) != null) totalPrecip += precipitation.get(i);
                if (maxTemps.get(i) != null) avgMaxTemp += maxTemps.get(i);
            }
            avgMaxTemp /= days;

            if (totalPrecip > 5.0) {
                return "RAINY";
            } else if (avgMaxTemp > 25.0) {
                return "HOT";
            } else if (avgMaxTemp < 10.0) {
                return "COLD";
            } else {
                return "NORMAL";
            }

        } catch (Exception e) {
            // Fallback for hackathon demo (prevents crashing if no internet)
            System.err.println("Weather API failed: " + e.getMessage());
            return "NORMAL";
        }
    }
}
