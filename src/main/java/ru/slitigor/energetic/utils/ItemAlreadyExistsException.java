package ru.slitigor.energetic.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ItemAlreadyExistsException extends RuntimeException {
    private String message;

    public ItemAlreadyExistsException(String message) { super(message); }
}
