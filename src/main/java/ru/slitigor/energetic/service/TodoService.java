package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Todo;

import java.util.List;

public interface TodoService {
    Todo getById(Long id);
    List<Todo> getAll();
    Todo createTodo(Todo todo);
    Todo updateTodo(Long id, Todo todo);
    void deleteTodo(Todo todo);
}
