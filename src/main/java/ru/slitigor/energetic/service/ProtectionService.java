package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Protection;

import java.util.List;

public interface ProtectionService {
    Protection getById(Long id);
    Protection getByName(String name);
    List<Protection> getAll();
    Protection createProtection(Protection protection);
    Protection updateProtection(Long id, Protection protection);
    void deleteById(Long id);
    void deleteProtection(Protection protection);
}
