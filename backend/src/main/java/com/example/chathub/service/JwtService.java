package com.example.chathub.service;

import com.example.chathub.enums.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    private final SecretKey secretKey;

    public JwtService(@Value("${chathub.security.jwt-secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String issueToken(String subject, Duration expiry, Map<String, Object> claims) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(expiry);

        return Jwts.builder().subject(subject)
                .claims(claims)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiresAt))
                .signWith(secretKey)
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parser().verifyWith(secretKey)
                .build().parseSignedClaims(token).getPayload();
    }

    public String generateAccessToken(long userId) {
        return this.issueToken(String.valueOf(userId), Duration.ofMinutes(15), Map.of("type", TokenType.AUTH));
    }

    public String generateRefreshToken(long userId) {
        return this.issueToken(String.valueOf(userId), Duration.ofDays(30), Map.of("type", TokenType.REFRESH));
    }
}
