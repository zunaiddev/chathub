package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.authentication.LockedException;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketExceptionHandler extends StompSubProtocolErrorHandler {
    private final ObjectMapper mapper;

    @Override
    public Message<byte[]> handleClientMessageProcessingError(
            Message<byte[]> clientMessage, @NonNull Throwable exception) {

        Throwable cause = exception;

        while (cause.getCause() != null) {
            cause = cause.getCause();
        }

        ErrorResponse response = getErrorResponse(cause);

        byte[] payload = mapper.writeValueAsBytes(response);

        String command = (String) response.details().get("command");

        StompHeaderAccessor accessor =
                StompHeaderAccessor.create(command == null
                        ? StompCommand.ERROR : StompCommand.valueOf(command));

        accessor.setMessage(response.message());
        accessor.setLeaveMutable(true);

        return MessageBuilder.createMessage(payload, accessor.getMessageHeaders());
    }

    private ErrorResponse getErrorResponse(Throwable exception) {
        log.warn(exception.getMessage());

        String message = "Something went wrong";
        ErrorCode errorCode = ErrorCode.UNKNOWN;
        Map<String, ?> details = Map.of("type", "WEBSOCKET_ERROR");

        switch (exception) {
            case MessageDeliveryException _ -> {
                message = exception.getMessage();
                errorCode = ErrorCode.INVALID_STOMP;
            }
            case LockedException _ -> {
                message = exception.getMessage();
                errorCode = ErrorCode.LOCKED;
            }
            case CustomException customException -> {
                message = customException.getMessage();
                errorCode = customException.getCode();
                details = customException.getDetails();
            }
            default -> {
            }
        }

        return new ErrorResponse(message, errorCode, details);
    }
}