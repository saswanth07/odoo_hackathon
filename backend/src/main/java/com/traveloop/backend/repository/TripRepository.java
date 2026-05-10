package com.traveloop.backend.repository;

import com.traveloop.backend.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUserId(Long userId);

    @org.springframework.data.jpa.repository.Query("SELECT SUM(t.estimatedCost) FROM Trip t")
    Double sumAllEstimatedCosts();
}
