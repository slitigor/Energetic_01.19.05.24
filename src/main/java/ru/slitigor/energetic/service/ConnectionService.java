package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Connection;

import java.util.List;

public interface ConnectionService {
    Connection getById(Long id);
    Connection getByNameAndSubstationId(String name, Integer id);
    List<Connection> getAll();
    Connection createConnection(Connection connection);
    Connection updateConnection(Long id, Connection connection);
    void deleteById(Long id);
    void deleteConnection(Connection connection);
}
