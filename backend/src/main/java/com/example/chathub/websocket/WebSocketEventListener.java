package com.example.chathub.websocket;

import com.example.chathub.security.principal.UserPrincipal;
import com.example.chathub.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;

@Controller
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    @EventListener
    public void handleConnectedListener(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal principal = accessor.getUser();

        if (principal instanceof Authentication authentication
                && authentication.getPrincipal() instanceof UserPrincipal(User user)) {
            log.info("User connected to session {}. id: {}, email: {}",
                    accessor.getSessionId(), user.getId(), user.getEmail());
        } else {
            log.warn("No authenticated principal for session {}", accessor.getSessionId());
        }
    }

    @EventListener
    public void handleDisconnectedListener(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        log.info("User Disconnected to session {}", sessionId);
    }
}