package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.TaskCategory;

import java.util.List;

public interface TaskCategoryService {
    TaskCategory getById(Integer id);
    List<TaskCategory> getAll();
    TaskCategory createCategory(TaskCategory category);
    TaskCategory updateCategory(Integer id, TaskCategory category);
    void deleteCategory(TaskCategory category);
}
