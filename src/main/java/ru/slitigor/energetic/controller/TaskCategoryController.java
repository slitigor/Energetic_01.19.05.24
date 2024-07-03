package ru.slitigor.energetic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.TaskCategoryDto;
import ru.slitigor.energetic.mapper.TaskCategoryMapper;
import ru.slitigor.energetic.model.TaskCategory;
import ru.slitigor.energetic.service.TaskCategoryService;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class TaskCategoryController {
    private final TaskCategoryService service;
    private final TaskCategoryMapper mapper;

    @GetMapping
    public ResponseEntity<List<TaskCategoryDto>> getAllTasks() {
        List<TaskCategoryDto> categoryList = service.getAll().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TaskCategoryDto> createCategory(@RequestBody TaskCategoryDto dto) {
        TaskCategory toCreated = mapper.convertToModel(dto);
        service.createCategory(toCreated);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskCategoryDto> updateCategory(@PathVariable Integer id, TaskCategoryDto dto) {
        TaskCategory toUpdated = mapper.convertToModel(dto);
        service.updateCategory(id, toUpdated);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer id) {
        service.deleteCategory(service.getById(id));
        return new ResponseEntity<>(String.format(
                "The category with the id '%s' has been deleted from the database.", id
        ), HttpStatus.OK);
    }
}
