package ru.slitigor.energetic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.TodoDto;
import ru.slitigor.energetic.mapper.TodoMapper;
import ru.slitigor.energetic.model.Todo;
import ru.slitigor.energetic.service.TodoService;

import java.util.List;

@RestController
@RequestMapping("todo")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class TodoController {
    private final TodoService service;
    private final TodoMapper mapper;

    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        List<TodoDto> todos = service.getAll().stream().map(mapper::convertToDto).toList();
        return  new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TodoDto> createTodo(@RequestBody TodoDto dto) {
        Todo toCreated = mapper.convertToModel(dto);
        service.createTodo(toCreated);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, TodoDto dto) {
        Todo toUpdated = mapper.convertToModel(dto);
        service.updateTodo(id, toUpdated);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
         service.deleteTodo(service.getById(id));
         return new ResponseEntity<>(String.format(
                 "The todo with the id '%s' has been deleted from the database.", id
         ), HttpStatus.OK);
    }
}
