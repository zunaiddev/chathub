package com.example.chathub.websocket;

import com.example.chathub.enums.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;
import tools.jackson.databind.ObjectMapper;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WebSocketErrorHandler extends StompSubProtocolErrorHandler {
    private final ObjectMapper mapper;

    @Override
    public Message<byte[]> handleClientMessageProcessingError(
            Message<byte[]> clientMessage, @NonNull Throwable exception) {
        StompHeaderAccessor accessor =
                StompHeaderAccessor.create(StompCommand.ERROR);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("success", false);
        body.put("status", HttpStatus.UNAUTHORIZED);
        body.put("code", ErrorCode.UNAUTHORISED);
        body.put("message", "Unauthorized");

        byte[] payload = mapper.writeValueAsBytes(body);

        accessor.setMessage("Unauthorized");
        accessor.setLeaveMutable(true);

        return MessageBuilder.createMessage(payload, accessor.getMessageHeaders());
    }
}