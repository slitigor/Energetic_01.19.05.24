package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.ConnectionDto;
import ru.slitigor.energetic.dto.RzaDeviceDto;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.RzaDevice;
import ru.slitigor.energetic.model.enums.ConnectionType;
import ru.slitigor.energetic.model.enums.Voltage;

@Component
@RequiredArgsConstructor
public class ConnectionMapper {
    private final SubstationMapper sMapper;
    private final RzaDeviceMapper dMapper;

    public Connection convertToModel(ConnectionDto dto) {
        Connection model = new Connection();
        model.setId(dto.getId());
        model.setName(dto.getName());
        model.setConnectionType(ConnectionType.getTypeByVal(dto.getConnectionType()));
        model.setVoltage(Voltage.getNominalByVal(dto.getVoltage()));
        for (RzaDeviceDto devDto: dto.getDeviceList()) {
            RzaDevice dev = dMapper.convertToModel(devDto);
            model.addDevice(dev);
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
        for (RzaDevice dModel: model.getDeviceList()) {
            RzaDeviceDto devDto = dMapper.convertToDto(dModel);
            dto.getDeviceList().add(devDto);
        }
        dto.setSubstation(sMapper.convertToDto(model.getSubstation()));

        return dto;
    }
}
