package com.example.chathub.jwt;

import com.example.chathub.enums.TokenType;
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

    public IssuedToken issueToken(String subject, Map<String, ?> claims) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(Duration.ofMinutes(15));

        String token = Jwts.builder().subject(subject)
                .claims(claims)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiresAt))
                .signWith(secretKey)
                .compact();

        return new IssuedToken(token, expiresAt, TokenType.valueOf(claims.get("type").toString()));
    }
}
