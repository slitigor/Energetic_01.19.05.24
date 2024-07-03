package ru.slitigor.energetic.service.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.RzaType;
import ru.slitigor.energetic.repository.RzaTypeRepository;
import ru.slitigor.energetic.service.RzaTypeService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RzaTypeServiceImpl implements RzaTypeService {
    private final RzaTypeRepository repository;
    @Override
    public RzaType getById(Integer id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("RzaType", "id", id.toString()));
    }

    @Override
    public RzaType getByType(String type) {
        return repository.findByType(type).orElseThrow(() ->
                new ResourceNotFoundException("RzaType", "type", type));
    }

    @Override
    public List<RzaType> getAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public RzaType createType(RzaType type) {
        Optional<RzaType> isExists = repository.findByType(type.getType());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The Rza Type with the type '%s' already exists!", type.getType()));
        return repository.save(type);
    }

    @Override
    @Transactional
    public RzaType updateType(Integer id, RzaType type) {
        Optional<RzaType> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("RzaType", "id", id.toString());
        type.setId(id);
        return repository.save(type);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteType(RzaType type) {
        repository.delete(type);
    }

}
