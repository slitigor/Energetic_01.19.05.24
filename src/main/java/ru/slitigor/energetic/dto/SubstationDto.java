package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubstationDto {
    private Integer id;
    private String name;
    private String psSchema;
    private String district;
}
