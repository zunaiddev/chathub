package com.example.chathub.filter;

import com.example.chathub.enums.ErrorCode;
import com.example.chathub.enums.TokenType;
import com.example.chathub.exception.CustomException;
import com.example.chathub.jwt.JwtService;
import com.example.chathub.model.User;
import com.example.chathub.security.UserPrincipal;
import com.example.chathub.service.UserService;
import com.example.chathub.utils.Utils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        return request.getRequestURI().startsWith("/api/auth");
    }

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        try {

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new CustomException(HttpStatus.UNAUTHORIZED, "Missing or invalid Bearer header", ErrorCode.MISSING_TOKEN);
            }

            String token = authHeader.substring(7);

            Claims claims = jwtService.parse(token);

            if (TokenType.valueOf(claims.get("type", String.class)) != TokenType.AUTH) {
                throw new CustomException(HttpStatus.FORBIDDEN, "This token is not allowed here", ErrorCode.INVALID_TOKEN);
            }

            final User user = userService.findById(Long.parseLong(claims.getSubject()));

            UserDetails details = new UserPrincipal(user);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    details, null, details.getAuthorities()
            );

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);
        } catch (CustomException e) {
            Utils.setError(response, e.getStatus(), e.getMessage(), e.getCode());
        } catch (ExpiredJwtException e) {
            Utils.setError(response, HttpStatus.UNAUTHORIZED, "Token has been expired", ErrorCode.EXPIRED_TOKEN);
        } catch (JwtException e) {
            Utils.setError(response, HttpStatus.UNAUTHORIZED, e.getMessage(), ErrorCode.JWT_ERROR);
        } catch (Exception e) {
            Utils.setError(response, HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}