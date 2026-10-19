package com.example.chathub.security.filter;

import com.example.chathub.enums.ErrorCode;
import com.example.chathub.enums.TokenType;
import com.example.chathub.exception.CustomException;
import com.example.chathub.security.jwt.JwtService;
import com.example.chathub.security.principal.UserPrincipal;
import com.example.chathub.user.User;
import com.example.chathub.user.UserService;
import com.example.chathub.utils.Routes;
import com.example.chathub.utils.Utils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.LockedException;
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
        return Routes.shouldNotFilter(request.getRequestURI());
    }

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws IOException {
        String authHeader = request.getHeader("Authorization");

        try {

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new CustomException(HttpStatus.UNAUTHORIZED, "Missing or invalid Bearer header", ErrorCode.MISSING_TOKEN);
            }

            String token = authHeader.substring(7);

            var claims = jwtService.parse(token, TokenType.AUTH);
            final User user = userService.findById(claims.getUserId());

            UsernamePasswordAuthenticationToken authToken = getAuthToken(user);

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);
        } catch (CustomException e) {
            Utils.setError(response, e.getStatus(), e.getMessage(), e.getCode());
        } catch (LockedException e) {
            Utils.setError(response, HttpStatus.LOCKED, e.getMessage());
        } catch (Exception e) {
            Utils.setError(response, HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    private static @NonNull UsernamePasswordAuthenticationToken getAuthToken(User user) {
        if (user.isLocked()){
            throw new LockedException("Access Denied Account is locked");
        }

        if (!user.isEnabled()){
            throw new CustomException(HttpStatus.UNAUTHORIZED, "This token is not enabled", ErrorCode.ACCOUNT_DISABLED);
        }

        UserDetails details = new UserPrincipal(user);

        return new UsernamePasswordAuthenticationToken(
                details, null, details.getAuthorities()
        );
    }
}
