package com.example.chathub.auth;

import com.example.chathub.audit.AuditEventService;
import com.example.chathub.auth.dto.AuthResponse;
import com.example.chathub.auth.dto.LoginRequest;
import com.example.chathub.auth.dto.RegisterRequest;
import com.example.chathub.enums.AuditEventType;
import com.example.chathub.enums.AuditResourceType;
import com.example.chathub.enums.AuditStatus;
import com.example.chathub.exception.ConflictException;
import com.example.chathub.security.jwt.JwtService;
import com.example.chathub.security.principal.UserPrincipal;
import com.example.chathub.user.User;
import com.example.chathub.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final AuditEventService auditEventService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userService.existsByEmail(request.email())) {
            throw new ConflictException("email already exists");
        }

        System.out.println();

        User user = userService.createUserAccount(request.name(), request.email(),
                passwordEncoder.encode(request.password()));

        auditEventService.record(user.getId(), AuditEventType.USER_REGISTERED, AuditResourceType.USER, user.getId().toString(), AuditStatus.SUCCESS);

        String accessToken = jwtService.generateAccessToken(user.getId());
        String refreshToken = jwtService.generateRefreshToken(user.getId());

        return new AuthResponse(user.getId(), accessToken, refreshToken);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        if (!authentication.isAuthenticated() || principal == null) {
            throw new UsernameNotFoundException("Invalid email or password");
        }


        User user = principal.user();

        auditEventService.record(user.getId(), AuditEventType.USER_LOGIN, AuditResourceType.USER, user.getId().toString(), AuditStatus.SUCCESS);

        String accessToken = jwtService.generateAccessToken(user.getId());
        String refreshToken = jwtService.generateRefreshToken(user.getId());

        return new AuthResponse(user.getId(), accessToken, refreshToken);
    }
}
