package ru.slitigor.energetic.service.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Todo;
import ru.slitigor.energetic.repository.TodoRepository;
import ru.slitigor.energetic.service.TodoService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
    private final TodoRepository repository;

    @Override
    public Todo getById(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Todo", "id", id.toString()));
    }

    @Override
    public List<Todo> getAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Todo createTodo(Todo todo) {
        Optional<Todo> isExists = repository.findById(todo.getId());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The todo with the id '%s' already exists!", todo.getId()
        ));
        return repository.save(todo);
    }

    @Override
    @Transactional
    public Todo updateTodo(Long id, Todo todo) {
        Optional<Todo> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("Todo", "id", id.toString());
        todo.setId(id);
        return repository.save(todo);
    }

    @Override
    @Transactional
    public void deleteTodo(Todo todo) {
        repository.delete(todo);
    }
}
