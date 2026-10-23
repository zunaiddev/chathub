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
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.security.Principal;

@Controller
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    @EventListener
    public void handleConnectedListener(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        User user = this.getUser(accessor.getUser());

        log.info("[Connect] User connected to session {}. id: {}, email: {}",
                accessor.getSessionId(), user.getId(), user.getEmail());
    }

    @EventListener
    public void handleDisconnectedListener(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        log.info("[Disconnect] User Disconnected to session {}", sessionId);
    }

    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        User user = this.getUser(accessor.getUser());

        log.info("[Subscribe] User {} Subscribed to destination {}", user.getEmail(), accessor.getDestination());
    }

    @EventListener
    public void handleUnsubscribe(SessionUnsubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        User user = this.getUser(accessor.getUser());

        log.info("[Unsubscribe] User {} Unsubscribed from destination {}",
                user.getEmail(), accessor.getDestination());
    }

    private User getUser(Principal principal) {
        if (principal instanceof Authentication authentication
                && authentication.getPrincipal() instanceof UserPrincipal(User user)) {
            return user;
        }

        return new User("Guest", "guest@guest.com", "Guest");
    }
}