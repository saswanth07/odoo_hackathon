package com.traveloop.backend.dto;

import java.time.LocalDate;

public class StopResponseDTO {
    private Long id;
    private String cityName;
    private String country;
    private LocalDate arrivalDate;
    private LocalDate departureDate;
    private Integer positionIndex;
    private Double estimatedStayCost;
    private Long tripId;

    public StopResponseDTO() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public LocalDate getArrivalDate() { return arrivalDate; }
    public void setArrivalDate(LocalDate arrivalDate) { this.arrivalDate = arrivalDate; }
    public LocalDate getDepartureDate() { return departureDate; }
    public void setDepartureDate(LocalDate departureDate) { this.departureDate = departureDate; }
    public Integer getPositionIndex() { return positionIndex; }
    public void setPositionIndex(Integer positionIndex) { this.positionIndex = positionIndex; }
    public Double getEstimatedStayCost() { return estimatedStayCost; }
    public void setEstimatedStayCost(Double estimatedStayCost) { this.estimatedStayCost = estimatedStayCost; }
    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }
}
