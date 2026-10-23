package com.example.chathub.websocket;

import com.example.chathub.conversation.ConversationService;
import com.example.chathub.enums.ErrorCode;
import com.example.chathub.enums.TokenType;
import com.example.chathub.enums.Topics;
import com.example.chathub.exception.WebSocketException;
import com.example.chathub.security.jwt.JwtClaims;
import com.example.chathub.security.jwt.JwtService;
import com.example.chathub.security.principal.UserPrincipal;
import com.example.chathub.user.User;
import com.example.chathub.user.UserService;
import com.example.chathub.utils.WebSocketUtils;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class JwtChannelInterceptor implements ChannelInterceptor {
    private final JwtService jwtService;
    private final UserService userService;
    private final ConversationService conversationService;

    @Override
    public Message<?> preSend(@NonNull Message<?> message,
                              @NonNull MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor == null) {
            throw new MessageDeliveryException("Invalid Stomp Message");
        }

        final StompCommand command = accessor.getCommand();

        if (StompCommand.CONNECT.equals(command)) {
            validateConnection(accessor);
        } else if (StompCommand.SUBSCRIBE.equals(command)) {
            validateSubscription(accessor);
        }

//        return MessageBuilder.createMessage(message.getPayload(), accessor.getMessageHeaders());
        return message;
    }

//    @Override
//    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, @NonNull Map<String, Object> attributes) throws Exception {
//        System.out.println(request.getHeaders());
//        return false;
//    }
//
//    @Override
//    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, @Nullable Exception exception) {
//
//    }

    private void validateConnection(StompHeaderAccessor accessor) {
        String authorization =
                accessor.getFirstNativeHeader("Authorization");

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new WebSocketException("Invalid or missing Authorization Header",
                    ErrorCode.INVALID_TOKEN, StompCommand.ERROR);
        }

        final String token = authorization.substring(7);

        JwtClaims claims = jwtService.parse(token, TokenType.AUTH);
        User user = userService.findById(claims.getUserId());

        if (user.isLocked()) {
            throw new LockedException("Account is locked");
        }

        if (!user.isEnabled()) {
            throw new WebSocketException("Account is not enabled yet",
                    ErrorCode.ACCOUNT_DISABLED, StompCommand.ERROR);
        }

        UserPrincipal principal = new UserPrincipal(user);
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

        accessor.setUser(authentication);
    }

    private void validateSubscription(StompHeaderAccessor accessor) {
        User user = WebSocketUtils.getUser(accessor.getUser());

        if (user == null) {
            throw new WebSocketException("Unauthorised User",
                    ErrorCode.UNAUTHORISED, StompCommand.UNSUBSCRIBE);
        }

        String destination = accessor.getDestination();

        if (destination == null || destination.isEmpty()) {
            throw new WebSocketException("Subscription destination is required",
                    ErrorCode.INVALID_DESTINATION, StompCommand.UNSUBSCRIBE);
        }

        Pattern pattern = Pattern.compile(String.format("^%s(\\d+)$", Topics.CONVERSATION));
        Matcher matcher = pattern.matcher(destination);

        if (!matcher.matches()) {
            throw new WebSocketException("Invalid subscription destination",
                    ErrorCode.INVALID_DESTINATION, StompCommand.UNSUBSCRIBE);
        }

        long conversationId = Long.parseLong(matcher.group(1));

        if (!conversationService.isMember(conversationId, user)) {
            throw new WebSocketException("Could not find Conversation",
                    ErrorCode.CONVERSATION_NOT_FOUND, StompCommand.UNSUBSCRIBE);
        }
    }
}