package com.example.chathub.auth;

import com.example.chathub.auth.dto.AuthResponse;
import com.example.chathub.auth.dto.LoginRequest;
import com.example.chathub.auth.dto.RegisterRequest;
import com.example.chathub.utils.CookieUtils;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request,
                                 HttpServletResponse response) {
        AuthResponse authResponse = authService.register(request);

        CookieUtils.setCookie(response, authResponse.refreshToken());

        return authResponse;
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request,
                              HttpServletResponse response) {
        AuthResponse authResponse = authService.login(request);

        CookieUtils.setCookie(response, authResponse.refreshToken());

        return authResponse;
    }

    @PostMapping("/refresh")
    public AuthResponse refreshToken(@CookieValue(value = "refreshToken") String token) {
        return authService.refreshToken(token);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpServletResponse response) {
        CookieUtils.removeCookie(response);
    }
}
