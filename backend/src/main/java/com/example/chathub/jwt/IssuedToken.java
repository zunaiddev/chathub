package com.example.chathub.jwt;

import com.example.chathub.enums.TokenType;

import java.time.Instant;

public record IssuedToken(
        String token,
        Instant expiresAt,
        TokenType tokenType
) {
}