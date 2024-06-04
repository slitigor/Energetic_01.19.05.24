package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RzaTypeDto {
    private Integer id;
    private String type;
    private Byte verificationCycle;
    private RzaDeviceDto rzaDevice;
}
