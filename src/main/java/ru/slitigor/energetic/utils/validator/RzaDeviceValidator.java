package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.RzaDevice;
import ru.slitigor.energetic.repository.RzaDeviceRepository;

@Component
@RequiredArgsConstructor
public class RzaDeviceValidator implements Validator {
    private final RzaDeviceRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return RzaDevice.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        RzaDevice device = (RzaDevice) target;
        if(repository.findByName(device.getName()).isPresent())
            errors.rejectValue("name", String.format(
                    "The Rza Device with the name '%s' already exists in the database.", device.getName()));
    }
}
