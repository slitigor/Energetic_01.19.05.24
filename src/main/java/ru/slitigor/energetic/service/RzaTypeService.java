package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.RzaType;

import java.util.List;

public interface RzaTypeService {
    RzaType getById(Integer id);
    RzaType getByType(String type);
    List<RzaType> getAll();
    RzaType createType(RzaType type);
    RzaType updateType(Integer id, RzaType type);
    void deleteById(Integer id);
    void deleteType(RzaType type);
}
