package ru.slitigor.energetic.service.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.repository.SubstationRepository;
import ru.slitigor.energetic.service.SubstationService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SubstationServiceImpl implements SubstationService {
    private final SubstationRepository repository;

    @Override
    public Substation getById(Integer id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Substation", "id", id.toString()));
    }

    @Override
    public Substation getByName(String name) {
        return repository.findByName(name).orElseThrow(() ->
                new ResourceNotFoundException("Substation", "name", name));
    }

    @Override
    public List<Substation> getAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Substation createSubstation(Substation substation) {
        Optional<Substation> isExists = repository.findByName(substation.getName());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The substation with the name '%s' already exists!", substation.getName()
        ));
        return repository.save(substation);
    }

    @Override
    @Transactional
    public Substation updateSubstation(Integer id, Substation substation) {
        Optional<Substation> isExists = repository.findById(id);
        if(isExists.isEmpty()) throw new ResourceNotFoundException("Substation", "id", id.toString());
        substation.setId(id);
        return repository.save(substation);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteSubstation(Substation substation) {
        repository.delete(substation);
    }
}
