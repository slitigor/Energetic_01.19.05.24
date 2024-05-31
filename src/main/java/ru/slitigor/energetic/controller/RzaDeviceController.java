package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.RzaDeviceDto;
import ru.slitigor.energetic.mapper.RzaDeviceMapper;
import ru.slitigor.energetic.model.RzaDevice;
import ru.slitigor.energetic.service.RzaDeviceService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.RzaDeviceValidator;

import java.util.List;

@RestController
@RequestMapping("rza_device")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class RzaDeviceController {
    private final RzaDeviceService service;
    private final RzaDeviceMapper mapper;
    private final RzaDeviceValidator validator;

    @GetMapping
    public ResponseEntity<List<RzaDeviceDto>> getAllDevices() {
        List<RzaDeviceDto> devices = service.getAll().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<RzaDeviceDto> createDevice(@RequestBody @Valid RzaDeviceDto dto,
                                                     BindingResult br) {
        RzaDevice toCreated = mapper.convertToModel(dto);
        validator.validate(toCreated, br);
        if (br.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(br));
        service.createDevice(toCreated);
        return new ResponseEntity<>(mapper.convertToDto(toCreated), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<RzaDeviceDto> updateDevice(@PathVariable Integer id,
                                                     @RequestBody @Valid RzaDeviceDto dto,
                                                     BindingResult br) {
        if (br.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(br));
        RzaDevice toUpdated = mapper.convertToModel(dto);
        service.updateDevice(id, toUpdated);
        return new ResponseEntity<>(mapper.convertToDto(toUpdated), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDevice(@PathVariable Integer id) {
        service.deleteById(id);
        return new ResponseEntity<>(String.format(
                "The RZA Device with the id '%s' has been deleted from the database.", id),
                HttpStatus.OK);
    }
}
