package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.RzaDeviceDto;
import ru.slitigor.energetic.model.RzaDevice;

@Component
@RequiredArgsConstructor
public class RzaDeviceMapper {

    public RzaDevice convertToModel(RzaDeviceDto dto) {
        RzaDevice model = new RzaDevice();
        model.setId(dto.getId());
        model.setName(dto.getName());
        model.setDescription(dto.getDescription());

        return model;
    }

    public RzaDeviceDto convertToDto(RzaDevice model) {
        RzaDeviceDto dto = new RzaDeviceDto();
        dto.setId(model.getId());
        dto.setName(model.getName());
        dto.setDescription(model.getDescription());

        return dto;
    }
}
