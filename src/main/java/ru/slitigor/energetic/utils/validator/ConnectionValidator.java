package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.repository.ConnectionRepository;

@Component
@RequiredArgsConstructor
public class ConnectionValidator implements Validator {
    private final ConnectionRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return Connection.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Connection connection = (Connection) target;
        if (repository.findByNameAndSubstation_Id(connection.getName(),
                connection.getSubstation().getId()).isPresent())
            errors.rejectValue("name", String.format(
                    "The connection with the name '%s' already exists in the database.", connection.getName()));
    }
}
