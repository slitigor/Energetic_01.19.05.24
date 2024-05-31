package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.RzaType;

import java.util.Optional;

public interface RzaTypeRepository extends JpaRepository<RzaType, Integer> {
    Optional<RzaType> findByType(String type);
}
