package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.RzaTypeDto;
import ru.slitigor.energetic.model.RzaType;
import ru.slitigor.energetic.model.enums.Jurisdiction;

@Component
@RequiredArgsConstructor
public class RzaTypeMapper {
    private final RzaDeviceMapper dMapper;

    public RzaType convertToModel(RzaTypeDto dto) {
        RzaType model = new RzaType();
        model.setId(dto.getId());
        model.setType(dto.getType());
        model.setJurisdiction(Jurisdiction.getByVal(dto.getJurisdiction()));
        model.setCommissioning(dto.getCommissioning());
        model.setVerificationCycle(dto.getVerificationCycle());
        model.setRzaDevice(dMapper.convertToModel(dto.getRzaDevice()));

        return model;
    }

    public RzaTypeDto convertToDto(RzaType model) {
        RzaTypeDto dto = new RzaTypeDto();
        dto.setId(model.getId());
        dto.setType(model.getType());
        dto.setJurisdiction(model.getJurisdiction().getValue());
        dto.setCommissioning(model.getCommissioning());
        dto.setVerificationCycle(model.getVerificationCycle());
        dto.setRzaDevice(dMapper.convertToDto(model.getRzaDevice()));

        return dto;
    }
}
