package ru.slitigor.energetic.mapper;

import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.RzaTypeDto;
import ru.slitigor.energetic.model.RzaType;

@Component
public class RzaTypeMapper {

    public RzaType convertToModel(RzaTypeDto dto) {
        RzaType model = new RzaType();
        model.setId(dto.getId());
        model.setType(dto.getType());
        model.setVerificationCycle(dto.getVerificationCycle());

        return model;
    }

    public RzaTypeDto convertToDto(RzaType model) {
        RzaTypeDto dto = new RzaTypeDto();
        dto.setId(model.getId());
        dto.setType(model.getType());
        dto.setVerificationCycle(model.getVerificationCycle());

        return dto;
    }
}
