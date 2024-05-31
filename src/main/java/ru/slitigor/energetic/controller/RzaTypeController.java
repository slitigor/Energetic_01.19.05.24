package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.RzaTypeDto;
import ru.slitigor.energetic.mapper.RzaTypeMapper;
import ru.slitigor.energetic.model.RzaType;
import ru.slitigor.energetic.service.RzaTypeService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.RzaTypeValidator;

import java.util.List;

@RestController
@RequestMapping("rza_type")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class RzaTypeController {
    private final RzaTypeService service;
    private final RzaTypeMapper mapper;
    private final RzaTypeValidator validator;

    @GetMapping
    public ResponseEntity<List<RzaTypeDto>> getAllTypes() {
        List<RzaTypeDto> types = service.getAll().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(types, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<RzaTypeDto> createType(@RequestBody @Valid RzaTypeDto dto,
                                                 BindingResult br) {
        RzaType toCreated = mapper.convertToModel(dto);
        validator.validate(toCreated, br);
        if (br.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(br));
        service.createType(toCreated);
        return new ResponseEntity<>(mapper.convertToDto(toCreated), HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<RzaTypeDto> updateType(@PathVariable Integer id,
                                                 @RequestBody @Valid RzaTypeDto dto,
                                                 BindingResult br) {
        if (br.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(br));
        RzaType toUpdated = mapper.convertToModel(dto);
        service.updateType(id, toUpdated);
        return new ResponseEntity<>(mapper.convertToDto(toUpdated), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteType(@PathVariable Integer id) {
        service.deleteById(id);
        return new ResponseEntity<>(String.format(
                "The RZA Type with the id '%s' has been deleted from the database.", id),
                HttpStatus.OK);
    }
}
