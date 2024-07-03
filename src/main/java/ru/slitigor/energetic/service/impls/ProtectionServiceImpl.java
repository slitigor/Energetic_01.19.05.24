package ru.slitigor.energetic.service.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Protection;
import ru.slitigor.energetic.repository.ProtectionRepository;
import ru.slitigor.energetic.service.ProtectionService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProtectionServiceImpl implements ProtectionService {
    private final ProtectionRepository repository;

    @Override
    public Protection getById(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Protection", "id", id.toString()));
    }

    @Override
    public Protection getByName(String name) {
        return repository.findByName(name).orElseThrow(() ->
                new ResourceNotFoundException("Protection", "name", name));
    }

    @Override
    public List<Protection> getAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Protection createProtection(Protection protection) {
        Optional<Protection> isExists = repository.findByName(protection.getName());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The Protection with the name '%s' already exists!", protection.getName()
        ));
        return repository.save(protection);
    }

    @Override
    @Transactional
    public Protection updateProtection(Long id, Protection protection) {
        Optional<Protection> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new  ResourceNotFoundException("Protection", "id", id.toString());
        protection.setId(id);
        return repository.save(protection);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteProtection(Protection protection) {
        repository.delete(protection);
    }

    private void updateLinkConnection(Protection protection) {

    }
}
