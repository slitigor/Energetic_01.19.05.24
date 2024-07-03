package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.Protection;
import ru.slitigor.energetic.repository.ProtectionRepository;

@Component
@RequiredArgsConstructor
public class ProtectionValidator implements Validator {
    private final ProtectionRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return Protection.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Protection protection = (Protection) target;
        if (repository.findByName(protection.getName()).isPresent())
            errors.rejectValue("name", String.format(
                    "The Protection with the name '%s' already exists in the database.", protection.getName()));
    }
}
