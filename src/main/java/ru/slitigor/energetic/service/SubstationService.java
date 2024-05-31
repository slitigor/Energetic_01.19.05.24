package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Substation;

import java.util.List;

public interface SubstationService {
    Substation getById(Integer id);
    Substation getByName(String name);
    List<Substation> getAll();
    Substation createSubstation(Substation substation);
    Substation updateSubstation(Integer id, Substation substation);
    void deleteById(Integer id);
    void deleteSubstation(Substation substation);
}
