package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import org.springframework.http.HttpStatus;

import java.util.Map;

public class WebSocketException extends CustomException {
    public WebSocketException(String message, ErrorCode code) {
        super(HttpStatus.UNAUTHORIZED, message, code, Map.of("type", "WEBSOCKET_ERROR"));
    }

    public WebSocketException(HttpStatus status, String message, ErrorCode code) {
        super(status, message, code, Map.of("type", "WEBSOCKET_ERROR"));
    }
}