package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.TaskCategory;

public interface TaskCategoryRepository extends JpaRepository<TaskCategory, Integer> {
}
