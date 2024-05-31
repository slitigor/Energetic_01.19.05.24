package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.repository.SubstationRepository;
import ru.slitigor.energetic.service.SubstationService;

@Component
@RequiredArgsConstructor
public class SubstationValidator implements Validator {
    private final SubstationRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return Substation.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Substation substation = (Substation) target;
        if (repository.findByName(substation.getName()).isPresent())
            errors.rejectValue("name", String.format(
                    "The substation with the name '%s' already exists in the database.", substation.getName()
            ));
    }
}
