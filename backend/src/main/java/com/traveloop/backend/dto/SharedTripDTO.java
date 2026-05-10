package com.traveloop.backend.dto;

import java.time.LocalDateTime;

public class SharedTripDTO {
    private Long id;
    private String publicToken;
    private Boolean shareEnabled;
    private LocalDateTime createdAt;
    private Long tripId;

    public SharedTripDTO() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPublicToken() { return publicToken; }
    public void setPublicToken(String publicToken) { this.publicToken = publicToken; }
    public Boolean getShareEnabled() { return shareEnabled; }
    public void setShareEnabled(Boolean shareEnabled) { this.shareEnabled = shareEnabled; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }
}
