package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.RzaType;
import ru.slitigor.energetic.repository.RzaTypeRepository;

@Component
@RequiredArgsConstructor
public class RzaTypeValidator implements Validator {
    private final RzaTypeRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return RzaType.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        RzaType type = (RzaType) target;
        if (repository.findByType(type.getType()).isPresent())
            errors.rejectValue("type", String.format(
                    "The Rza Type with the name '%s' already exists in the database.", type.getType()));
    }
}
