package ru.slitigor.energetic.service.impls;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.TaskCategory;
import ru.slitigor.energetic.repository.TaskCategoryRepository;
import ru.slitigor.energetic.service.TaskCategoryService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TaskCategoryServiceImpl implements TaskCategoryService {
    private final TaskCategoryRepository repository;

    @Override
    public TaskCategory getById(Integer id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("TaskCategory", "id", id.toString()));
    }

    @Override
    public List<TaskCategory> getAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public TaskCategory createCategory(TaskCategory category) {
        Optional<TaskCategory> isExists = repository.findById(category.getId());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The category with the id '%s' already exists!", category.getId()
        ));

        return repository.save(category);
    }

    @Override
    @Transactional
    public TaskCategory updateCategory(Integer id, TaskCategory category) {
        Optional<TaskCategory> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("TaskCategory", "id", id.toString());
        category.setId(id);
        return repository.save(category);
    }

    @Override
    @Transactional
    public void deleteCategory(TaskCategory category) {
        repository.delete(category);
    }
}
