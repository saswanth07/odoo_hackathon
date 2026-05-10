package com.traveloop.backend.service;

import com.traveloop.backend.dto.PackingItemDTO;
import com.traveloop.backend.entity.PackingItem;
import com.traveloop.backend.entity.Trip;
import com.traveloop.backend.exception.ResourceNotFoundException;
import com.traveloop.backend.repository.PackingItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PackingService {

    private final PackingItemRepository packingItemRepository;
    private final TripService tripService;

    public PackingService(PackingItemRepository packingItemRepository, TripService tripService) {
        this.packingItemRepository = packingItemRepository;
        this.tripService = tripService;
    }

    public PackingItemDTO createItem(Long tripId, PackingItemDTO request) {
        Trip trip = tripService.getTripEntity(tripId);

        PackingItem item = new PackingItem();
        item.setItemName(request.getItemName());
        item.setCategory(request.getCategory());
        item.setPackedStatus(request.getPackedStatus() != null ? request.getPackedStatus() : false);
        item.setTrip(trip);

        PackingItem savedItem = packingItemRepository.save(item);
        return mapToResponse(savedItem);
    }

    public List<PackingItemDTO> getItemsByTrip(Long tripId) {
        return packingItemRepository.findByTripId(tripId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PackingItemDTO updateItem(Long itemId, PackingItemDTO request) {
        PackingItem item = packingItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Packing item not found"));

        item.setItemName(request.getItemName());
        item.setCategory(request.getCategory());
        if (request.getPackedStatus() != null) {
            item.setPackedStatus(request.getPackedStatus());
        }

        PackingItem updatedItem = packingItemRepository.save(item);
        return mapToResponse(updatedItem);
    }

    public void deleteItem(Long itemId) {
        PackingItem item = packingItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Packing item not found"));
        packingItemRepository.delete(item);
    }

    public void autoGenerateItems(Long tripId, String condition) {
        Trip trip = tripService.getTripEntity(tripId);
        String category = "Weather Auto-Suggest";

        if ("RAINY".equals(condition)) {
            saveAutoItem(trip, "Umbrella", category);
            saveAutoItem(trip, "Waterproof Jacket", category);
        } else if ("HOT".equals(condition)) {
            saveAutoItem(trip, "Sunscreen", category);
            saveAutoItem(trip, "Sunglasses", category);
        } else if ("COLD".equals(condition)) {
            saveAutoItem(trip, "Heavy Coat", category);
            saveAutoItem(trip, "Gloves", category);
        }
    }

    private void saveAutoItem(Trip trip, String name, String category) {
        PackingItem item = new PackingItem();
        item.setItemName(name);
        item.setCategory(category);
        item.setPackedStatus(false);
        item.setTrip(trip);
        packingItemRepository.save(item);
    }

    private PackingItemDTO mapToResponse(PackingItem item) {
        PackingItemDTO dto = new PackingItemDTO();
        dto.setId(item.getId());
        dto.setItemName(item.getItemName());
        dto.setCategory(item.getCategory());
        dto.setPackedStatus(item.getPackedStatus());
        dto.setTripId(item.getTrip().getId());
        return dto;
    }
}
