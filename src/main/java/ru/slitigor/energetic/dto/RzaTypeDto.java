package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RzaTypeDto {
    private Integer id;
    private String type;
    private Byte verificationCycle;
}
