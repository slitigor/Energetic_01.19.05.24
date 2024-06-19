package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
