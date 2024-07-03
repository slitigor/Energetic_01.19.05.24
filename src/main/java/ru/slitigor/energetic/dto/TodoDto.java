package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoDto {
    private Long id;
    private String title;
    private String description;
    private String stage;
    private TaskCategoryDto category;
}
