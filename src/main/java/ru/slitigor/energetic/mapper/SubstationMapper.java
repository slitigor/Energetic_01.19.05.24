package ru.slitigor.energetic.mapper;

import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.SubstationDto;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.model.enums.Districts;
import ru.slitigor.energetic.model.enums.PSSchema;

@Component
public class SubstationMapper {
    public Substation convertToModel(SubstationDto dto) {
        Substation model = new Substation();
        model.setId(dto.getId());
        model.setName(dto.getName());
        model.setPsSchema(PSSchema.getSchemaByVal(dto.getPsSchema()));
        model.setDistrict(Districts.getDistrictByVal(dto.getDistrict()));

        return model;
    }

    public SubstationDto convertToDto(Substation model) {
        SubstationDto dto = new SubstationDto();
        dto.setId(model.getId());
        dto.setName(model.getName());
        dto.setPsSchema(model.getPsSchema().getValue());
        dto.setDistrict(model.getDistrict().getValue());

        return dto;
    }
}
