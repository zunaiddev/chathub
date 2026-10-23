package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.stomp.StompCommand;

import java.util.Map;

public class WebSocketException extends CustomException {
    public WebSocketException(String message, ErrorCode code) {
        super(HttpStatus.UNAUTHORIZED, message, code, Map.of("command", "ERROR"));
    }

    public WebSocketException(String message, ErrorCode code, StompCommand command) {
        super(HttpStatus.UNAUTHORIZED, message, code, Map.of("command", command.toString()));
    }

    public WebSocketException(HttpStatus status, String message, ErrorCode code) {
        super(status, message, code, Map.of("command", "ERROR"));
    }
}