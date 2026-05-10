package com.traveloop.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class PackingItemDTO {
    private Long id;
    @NotBlank
    private String itemName;
    private String category;
    private Boolean packedStatus;
    private Long tripId;

    public PackingItemDTO() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Boolean getPackedStatus() { return packedStatus; }
    public void setPackedStatus(Boolean packedStatus) { this.packedStatus = packedStatus; }
    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }
}
