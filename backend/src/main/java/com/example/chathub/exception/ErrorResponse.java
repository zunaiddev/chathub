package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import org.springframework.http.HttpStatus;

import java.util.Map;

public record ErrorResponse(
        boolean success,
        String message,
        String code,
        Map<String, ?> details
) {
    public ErrorResponse(String message, HttpStatus status) {
        this(false, message, status.name(), null);
    }

    public ErrorResponse(String message, ErrorCode code) {
        this(false, message, code.name(), null);
    }

    public ErrorResponse(String message, ErrorCode code, Map<String, ?> details) {
        this(false, message, code.name(), details);
    }
}