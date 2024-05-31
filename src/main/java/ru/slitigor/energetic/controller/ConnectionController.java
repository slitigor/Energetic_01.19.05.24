package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.ConnectionDto;
import ru.slitigor.energetic.dto.RzaDeviceDto;
import ru.slitigor.energetic.mapper.ConnectionMapper;
import ru.slitigor.energetic.mapper.RzaDeviceMapper;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.RzaDevice;
import ru.slitigor.energetic.service.ConnectionService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.ConnectionValidator;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("connection")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class ConnectionController {
    private final ConnectionService service;
    private final ConnectionMapper mapper;
    private final RzaDeviceMapper deviceMapper;
    private final ConnectionValidator validator;

    @GetMapping
    public ResponseEntity<List<ConnectionDto>> getAllConnection() {
        List<ConnectionDto> connections = service.getAll().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(connections, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ConnectionDto> createConnection(@RequestBody @Valid ConnectionDto dto,
                                                          BindingResult br) {
        Connection toCreated = mapper.convertToModel(dto);
        validator.validate(toCreated, br);
        if (br.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(br));
        service.createConnection(toCreated);
        return new ResponseEntity<>(mapper.convertToDto(toCreated), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConnectionDto> updateConnection(@PathVariable Long id,
                                                          @RequestBody @Valid ConnectionDto dto,
                                                          BindingResult br) {
        if (br.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(br));
        Connection toUpdated = mapper.convertToModel(dto);
        service.updateConnection(id, toUpdated);
        return new ResponseEntity<>(mapper.convertToDto(toUpdated), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteConnection(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(String.format(
                "The connection with the id '%s' has been deleted from the database.", id),
                HttpStatus.OK);
    }
}
