package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProtectionDto {
    private Long id;
    private String name;
    private RzaDeviceDto device;
    private RzaTypeDto type;
}
