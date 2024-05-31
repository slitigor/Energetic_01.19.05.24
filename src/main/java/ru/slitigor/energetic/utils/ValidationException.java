package ru.slitigor.energetic.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ValidationException extends RuntimeException{
    private String message;
    public ValidationException(String message) { super(message); }
}
