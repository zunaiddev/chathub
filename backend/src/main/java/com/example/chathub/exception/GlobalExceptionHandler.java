package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.webmvc.error.DefaultErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    public GlobalExceptionHandler(DefaultErrorAttributes errorAttributes) {
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(@NonNull CustomException exc) {
        log.warn(exc.getMessage());
        return ResponseEntity.status(exc.getStatus())
                .body(new ErrorResponse(exc.getMessage(), exc.getCode(), exc.getDetails()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exc) {
        Map<String, String> errors = new HashMap<>();

        exc.getBindingResult().getFieldErrors()
                .forEach(fieldError -> errors.put(fieldError.getField(), fieldError.getDefaultMessage()));

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(errors);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(Exception exc) {
        log.warn(exc.getMessage());

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT)
                .body(new ErrorResponse("Invalid or Missing Required Request body",
                        ErrorCode.INVALID_BODY));
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(BadCredentialsException.class)
    public ErrorResponse handleBadCredentialsException(BadCredentialsException exc) {
        log.warn(exc.getMessage());

        return new ErrorResponse("Invalid Email Or Password", ErrorCode.INVALID_EMAIL_OR_PASSWORD);
    }

    @ResponseStatus(HttpStatus.LOCKED)
    @ExceptionHandler(LockedException.class)
    public ErrorResponse handleBadCredentialsException(LockedException exc) {
        log.warn(exc.getMessage());

        return new ErrorResponse("Account is locked", HttpStatus.LOCKED);
    }

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleJwtException(JwtException jwtException) {
        log.warn(jwtException.getMessage());

        return new ErrorResponse(jwtException.getMessage(), ErrorCode.INVALID_JWT);
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleMissingRequestCookieException(MissingRequestCookieException exc) {
        log.warn(exc.getMessage());

        return new ErrorResponse("Missing Cookie " + exc.getCookieName(), ErrorCode.MISSING_COOKIE);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException exc) {
        log.warn(exc.getMessage());

        return new ErrorResponse(String.format("Path Argument %s must be a type of %s",
                exc.getName(), exc.getRequiredType()), ErrorCode.INVALID_PATH_ARGUMENT);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNoResourceFoundException(NoResourceFoundException exc) {
        log.warn(exc.getMessage());

        return new ErrorResponse(exc.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception exc) {
        log.error(exc.getMessage(), exc);

        return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Something Went Wrong",
                        ErrorCode.INTERNAL_SERVER_ERROR));
    }
}