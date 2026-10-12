package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;

import java.util.Map;

public record ErrorResponse(
        boolean success,
        String message,
        ErrorCode code,
        Map<String, ?> details
) {
    public ErrorResponse(String message, ErrorCode code) {
        this(false, message, code, null);
    }

    public ErrorResponse(String message, ErrorCode code, Map<String, ?> details) {
        this(false, message, code, details);
    }
}