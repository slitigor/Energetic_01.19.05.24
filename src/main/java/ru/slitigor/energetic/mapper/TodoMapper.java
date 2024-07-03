package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.TodoDto;
import ru.slitigor.energetic.model.Todo;
import ru.slitigor.energetic.model.enums.Stage;

@Component
@RequiredArgsConstructor
public class TodoMapper {
    private final TaskCategoryMapper categoryMapper;
    public Todo convertToModel(TodoDto dto) {
        Todo model = new Todo();
        model.setId(dto.getId());
        model.setTitle(dto.getTitle());
        model.setDescription(dto.getDescription());
        model.setStage(Stage.getStageByVal(dto.getStage()));
        model.setCategory(categoryMapper.convertToModel(dto.getCategory()));
        return model;
    }

    public TodoDto convertToDto(Todo model) {
        TodoDto dto = new TodoDto();
        dto.setId(model.getId());
        dto.setTitle(model.getTitle());
        dto.setDescription(model.getDescription());
        dto.setStage(model.getStage().getValue());
        dto.setCategory(categoryMapper.convertToDto(model.getCategory()));
        return dto;
    }
}
