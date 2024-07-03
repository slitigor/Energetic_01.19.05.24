package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.Protection;

import java.util.Optional;

public interface ProtectionRepository extends JpaRepository<Protection, Long> {
    Optional<Protection> findByName(String name);
}
