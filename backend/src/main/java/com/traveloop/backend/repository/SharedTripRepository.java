package com.traveloop.backend.repository;

import com.traveloop.backend.entity.SharedTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SharedTripRepository extends JpaRepository<SharedTrip, Long> {
    Optional<SharedTrip> findByPublicToken(String publicToken);
    Optional<SharedTrip> findByTripId(Long tripId);
}
