package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import org.springframework.http.HttpStatus;

public class ConflictException extends CustomException {
    public ConflictException(String message) {
        this(message, ErrorCode.CONFLICT);
    }

    public ConflictException(String message, ErrorCode code) {
        super(HttpStatus.CONFLICT, message, code);
    }
}
