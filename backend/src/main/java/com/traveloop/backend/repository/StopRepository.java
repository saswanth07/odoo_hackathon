package com.traveloop.backend.repository;

import com.traveloop.backend.entity.Stop;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StopRepository extends JpaRepository<Stop, Long> {
    List<Stop> findByTripId(Long tripId);

    @org.springframework.data.jpa.repository.Query("SELECT s.cityName, COUNT(s) FROM Stop s GROUP BY s.cityName ORDER BY COUNT(s) DESC")
    List<Object[]> findTopCities(org.springframework.data.domain.Pageable pageable);
}
