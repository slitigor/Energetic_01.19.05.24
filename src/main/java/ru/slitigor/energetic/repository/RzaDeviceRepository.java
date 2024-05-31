package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.RzaDevice;

import java.util.Optional;

public interface RzaDeviceRepository extends JpaRepository<RzaDevice, Integer> {
    Optional<RzaDevice> findByName(String name);
}
