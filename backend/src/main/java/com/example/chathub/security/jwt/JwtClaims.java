package com.example.chathub.security.jwt;

import com.example.chathub.enums.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.ToString;

@ToString
public final class JwtClaims {
    private final Claims claims;

    public JwtClaims(Claims claims) {
        this.claims = claims;
    }

    public long getUserId() {
        String subject = claims.getSubject();

        if (subject == null) {
            throw new JwtException("Jwt Subject is missing");
        }

        try {
            return Long.parseLong(claims.getSubject());
        } catch (NumberFormatException e) {
            throw new JwtException("Invalid Jwt Subject", e);
        }
    }

    public TokenType getTokenType() {
        String type = claims.get("type", String.class);

        if (type == null) {
            throw new JwtException("Jwt type is missing");
        }

        try {
            return TokenType.valueOf(type);
        } catch (IllegalArgumentException e) {
            throw new JwtException("Invalid Jwt Type", e);
        }
    }

    public String getJwtId() {
        String jwtId = claims.getId();

        if (jwtId == null) {
            throw new JwtException("Jwt Id is missing");
        }

        return jwtId;
    }
}