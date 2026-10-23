package com.example.chathub.websocket;

import com.example.chathub.user.User;
import com.example.chathub.utils.WebSocketUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
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

        log.info("[Connected] User connected to session {}. id: {}, email: {}",
                accessor.getSessionId(), user.getId(), user.getEmail());
    }

    @EventListener
    public void handleDisconnectedListener(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        log.info("[Disconnected] User Disconnected to session {}", sessionId);
    }

    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        User user = this.getUser(accessor.getUser());

        log.info("[Subscribed] User {} Subscribed to destination {}", user.getEmail(), accessor.getDestination());
    }

    @EventListener
    public void handleUnsubscribe(SessionUnsubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        User user = this.getUser(accessor.getUser());

        log.info("[Unsubscribed] User {} Unsubscribed from destination {}",
                user.getEmail(), accessor.getDestination());
    }

    private User getUser(Principal principal) {
        User user = WebSocketUtils.getUser(principal);

        return user == null ? new User("Guest", "guest@guest.com", "Guest") : user;
    }
}