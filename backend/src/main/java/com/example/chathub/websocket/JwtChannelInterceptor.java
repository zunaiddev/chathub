package com.example.chathub.websocket;

import com.example.chathub.enums.ErrorCode;
import com.example.chathub.enums.TokenType;
import com.example.chathub.exception.CustomException;
import com.example.chathub.security.jwt.JwtClaims;
import com.example.chathub.security.jwt.JwtService;
import com.example.chathub.security.principal.UserPrincipal;
import com.example.chathub.user.User;
import com.example.chathub.user.UserService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtChannelInterceptor implements ChannelInterceptor {
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public Message<?> preSend(@NonNull Message<?> message, @NonNull MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authorization =
                    accessor.getFirstNativeHeader("Authorization");

            if (authorization == null || !authorization.startsWith("Bearer ")) {
                throw new CustomException(HttpStatus.UNAUTHORIZED,
                        "Invalid or missing Authorization Token", ErrorCode.INVALID_TOKEN);
            }

            final String token = authorization.substring(7);

            JwtClaims claims = jwtService.parse(token, TokenType.AUTH);
            User user = userService.findById(claims.getUserId());

            if (user.isLocked()) {
                throw new LockedException("Account is locked");
            }

            UserPrincipal principal = new UserPrincipal(user);
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

            accessor.setUser(authentication);
        }

        return MessageBuilder.createMessage(message.getPayload(), accessor.getMessageHeaders());
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
}