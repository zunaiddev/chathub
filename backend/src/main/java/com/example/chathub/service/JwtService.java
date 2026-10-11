package com.example.chathub.service;

import com.example.chathub.model.UserAccount;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import security.IssuedToken;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {
    private final SecretKey secretKey;

    public JwtService(@Value("${chathub.security.jwt-secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public IssuedToken issueToken(UserAccount user) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(Duration.ofMinutes(15));

        String token = Jwts.builder().subject(user.getId().toString())
                .claim("email", user.getEmail())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiresAt))
                .signWith(secretKey)
                .compact();

        return new IssuedToken(token, expiresAt);
    }
}
