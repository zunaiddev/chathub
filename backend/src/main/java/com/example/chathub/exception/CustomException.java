package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Getter
public class CustomException extends RuntimeException {
    private final boolean success;
    private final HttpStatus status;
    private final Map<String, ?> details;
    private final ErrorCode code;

    public CustomException(HttpStatus status, String message, ErrorCode code, Map<String, ?> details) {
        super(message);
        this.status = status;
        this.success = false;
        this.details = details;
        this.code = code;
    }

    public CustomException(HttpStatus status, String message, ErrorCode code) {
        this(status, message, code, null);
    }
}