package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(@NonNull CustomException exc) {
        log.warn(exc.getMessage());
        return ResponseEntity.status(exc.getStatus())
                .body(new ErrorResponse(exc.getMessage(), exc.getCode(), exc.getDetails()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception exc) {
        log.error(exc.getMessage(), exc);

        return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Something Went Wrong",
                        ErrorCode.INTERNAL_SERVER_ERROR));
    }
}