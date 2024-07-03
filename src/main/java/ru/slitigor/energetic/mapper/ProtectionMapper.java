package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.ProtectionDto;
import ru.slitigor.energetic.model.Protection;

@Component
@RequiredArgsConstructor
public class ProtectionMapper {
    private final RzaDeviceMapper deviceMapper;
    private final RzaTypeMapper typeMapper;

    public Protection convertToModel(ProtectionDto dto) {
        Protection model = new Protection();
        model.setId(dto.getId());
        model.setName(dto.getName());
        model.setDevice(deviceMapper.convertToModel(dto.getDevice()));
        model.setType(typeMapper.convertToModel(dto.getType()));

        return model;
    }

    public ProtectionDto convertToDto(Protection model) {
        ProtectionDto dto = new ProtectionDto();
        dto.setId(model.getId());
        dto.setName(model.getName());
        dto.setDevice(deviceMapper.convertToDto(model.getDevice()));
        dto.setType(typeMapper.convertToDto(model.getType()));

        return dto;
    }
}
