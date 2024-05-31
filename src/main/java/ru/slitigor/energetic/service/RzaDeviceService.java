package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.RzaDevice;

import java.util.List;

public interface RzaDeviceService {
    RzaDevice getById(Integer id);
    RzaDevice getByName(String name);
    List<RzaDevice> getAll();
    RzaDevice createDevice(RzaDevice device);
    RzaDevice updateDevice(Integer id, RzaDevice device);
    void deleteById(Integer id);
    void deleteDevice(RzaDevice device);
}
