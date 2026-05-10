package com.traveloop.backend.controller;

import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.dto.PackingItemDTO;
import com.traveloop.backend.service.PackingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PackingController {

    private final PackingService packingService;

    public PackingController(PackingService packingService) {
        this.packingService = packingService;
    }

    @PostMapping("/trips/{tripId}/packing-items")
    public ResponseEntity<ApiResponse<PackingItemDTO>> createItem(@PathVariable Long tripId, @Valid @RequestBody PackingItemDTO request) {
        PackingItemDTO response = packingService.createItem(tripId, request);
        return new ResponseEntity<>(new ApiResponse<>(true, "Packing item created successfully", response), HttpStatus.CREATED);
    }

    @GetMapping("/trips/{tripId}/packing-items")
    public ResponseEntity<ApiResponse<List<PackingItemDTO>>> getItemsByTrip(@PathVariable Long tripId) {
        List<PackingItemDTO> response = packingService.getItemsByTrip(tripId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Packing items retrieved successfully", response));
    }

    @PutMapping("/packing-items/{id}")
    public ResponseEntity<ApiResponse<PackingItemDTO>> updateItem(@PathVariable Long id, @Valid @RequestBody PackingItemDTO request) {
        PackingItemDTO response = packingService.updateItem(id, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Packing item updated successfully", response));
    }

    @DeleteMapping("/packing-items/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteItem(@PathVariable Long id) {
        packingService.deleteItem(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Packing item deleted successfully", null));
    }
}
