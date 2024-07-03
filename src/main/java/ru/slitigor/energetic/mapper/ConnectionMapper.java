package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.ConnectionDto;
import ru.slitigor.energetic.dto.ProtectionDto;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.Protection;
import ru.slitigor.energetic.model.enums.ConnectionType;
import ru.slitigor.energetic.model.enums.Voltage;

@Component
@RequiredArgsConstructor
public class ConnectionMapper {
    private final SubstationMapper sMapper;
    private final ProtectionMapper pMapper;

    public Connection convertToModel(ConnectionDto dto) {
        Connection model = new Connection();
        model.setId(dto.getId());
        model.setName(dto.getName());
        model.setConnectionType(ConnectionType.getTypeByVal(dto.getConnectionType()));
        model.setVoltage(Voltage.getNominalByVal(dto.getVoltage()));
        for (ProtectionDto protectionDto: dto.getProtectionList()) {
            Protection protection = pMapper.convertToModel(protectionDto);
            model.addProtection(protection);
        }
        model.setSubstation(sMapper.convertToModel(dto.getSubstation()));

        return model;
    }

    public ConnectionDto convertToDto(Connection model) {
        ConnectionDto dto = new ConnectionDto();
        dto.setId(model.getId());
        dto.setName(model.getName());
        dto.setConnectionType(model.getConnectionType().getValue());
        dto.setVoltage(model.getVoltage().getValue());
        for (Protection pModel: model.getProtectionList()) {
            ProtectionDto pDto = pMapper.convertToDto(pModel);
            dto.getProtectionList().add(pDto);
        }
        dto.setSubstation(sMapper.convertToDto(model.getSubstation()));

        return dto;
    }
}
