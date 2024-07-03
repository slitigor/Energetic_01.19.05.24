package ru.slitigor.energetic.service.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.RzaDevice;
import ru.slitigor.energetic.repository.RzaDeviceRepository;
import ru.slitigor.energetic.service.RzaDeviceService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RzaDeviceServiceImpl implements RzaDeviceService {
    private final RzaDeviceRepository repository;

    @Override
    public RzaDevice getById(Integer id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("RzaDevice", "id", id.toString()));
    }

    @Override
    public RzaDevice getByName(String name) {
        return repository.findByName(name).orElseThrow(() ->
                new ResourceNotFoundException("RzaDevice", "name", name));
    }

    @Override
    public List<RzaDevice> getAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public RzaDevice createDevice(RzaDevice device) {
        Optional<RzaDevice> isExists = repository.findByName(device.getName());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The Rza Device with the name '%s' already exists!", device.getName()));
        return repository.save(device);
    }

    @Override
    @Transactional
    public RzaDevice updateDevice(Integer id, RzaDevice device) {
        Optional<RzaDevice> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("RzaDevice", "id", id.toString());
        device.setId(id);
        return repository.save(device);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteDevice(RzaDevice device) {
        repository.delete(device);
    }
}
