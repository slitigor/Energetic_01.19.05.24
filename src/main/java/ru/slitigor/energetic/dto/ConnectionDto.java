package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class ConnectionDto {
    private Long id;
    private String name;
    private String connectionType;
    private String voltage;
    private SubstationDto substation;
    private Set<RzaDeviceDto> deviceList = new HashSet<>();
}
