package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.ProtectionDto;
import ru.slitigor.energetic.mapper.ProtectionMapper;
import ru.slitigor.energetic.model.Protection;
import ru.slitigor.energetic.service.ProtectionService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.ProtectionValidator;

import java.util.List;

@RestController
@RequestMapping("protection")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class ProtectionController {
    private final ProtectionService service;
    private final ProtectionMapper mapper;
    private final ProtectionValidator validator;

    @GetMapping
    public ResponseEntity<List<ProtectionDto>> getAllProtection() {
        List<ProtectionDto> protectionList = service.getAll().stream().map(mapper::convertToDto)
                .toList();
        return new ResponseEntity<>(protectionList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProtectionDto> createProtection(@RequestBody @Valid ProtectionDto dto,
                                                          BindingResult br) {
        Protection toCreated = mapper.convertToModel(dto);
        validator.validate(toCreated, br);
        if (br.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(br));
        service.createProtection(toCreated);
        return new ResponseEntity<>(mapper.convertToDto(toCreated), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProtectionDto> updateProtection(@PathVariable Long id,
                                                          @RequestBody @Valid ProtectionDto dto,
                                                          BindingResult br) {
        if (br.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(br));
        Protection toUpdated = mapper.convertToModel(dto);
        service.updateProtection(id, toUpdated);
        return new ResponseEntity<>(mapper.convertToDto(toUpdated), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProtection(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(String.format(
                "The Protection with the id '%s' has been deleted from the database.", id
        ), HttpStatus.OK);
    }
}
