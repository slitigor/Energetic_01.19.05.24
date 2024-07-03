package ru.slitigor.energetic.mapper;

import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.TaskCategoryDto;
import ru.slitigor.energetic.model.TaskCategory;

@Component
public class TaskCategoryMapper {
    public TaskCategory convertToModel(TaskCategoryDto dto) {
        TaskCategory model = new TaskCategory();
        model.setId(dto.getId());
        model.setTitle(dto.getTitle());
        return model;
    }

    public TaskCategoryDto convertToDto(TaskCategory model) {
        TaskCategoryDto dto = new TaskCategoryDto();
        dto.setId(model.getId());
        dto.setTitle(model.getTitle());
        return dto;
    }
}
