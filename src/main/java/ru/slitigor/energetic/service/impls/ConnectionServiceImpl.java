package ru.slitigor.energetic.service.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.repository.ConnectionRepository;
import ru.slitigor.energetic.service.ConnectionService;
import ru.slitigor.energetic.service.SubstationService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ConnectionServiceImpl implements ConnectionService {
    private final ConnectionRepository repository;
    private final SubstationService service;

    @Override
    public Connection getById(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Connection", "id", id.toString()));
    }

    @Override
    public Connection getByNameAndSubstationId(String name, Integer id) {
        return repository.findByNameAndSubstation_Id(name, id).orElseThrow(() ->
                new ResourceNotFoundException("Connection", "name", name));
    }

    @Override
    public List<Connection> getAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Connection createConnection(Connection connection) {
        Optional<Connection> isExists =
                repository.findByNameAndSubstation_Id(connection.getName(),
                        connection.getSubstation().getId());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The connection with the name '%s' already exists!", connection.getName()
        ));
        updateLinkSubstation(connection);
        return repository.save(connection);
    }

    @Override
    @Transactional
    public Connection updateConnection(Long id, Connection connection) {
        Optional<Connection> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("Connection", "id", id.toString());
        connection.setId(id);
        updateLinkSubstation(connection);
        return repository.save(connection);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteConnection(Connection connection) {
        repository.delete(connection);
    }

    private void updateLinkSubstation(Connection connection) {
        Substation substation = service.getByName(connection.getSubstation().getName());
        connection.setSubstation(substation);
        substation.getConnectionList().add(connection);
    }
}
