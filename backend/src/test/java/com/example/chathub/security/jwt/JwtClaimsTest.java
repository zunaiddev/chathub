package com.example.chathub.security.jwt;

import com.example.chathub.enums.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;

import java.util.Map;

class JwtClaimsTest {

    @Test
    void getUserId() {
        Claims claims = Jwts.claims().subject("77").build();

        JwtClaims jwtClaims = new JwtClaims(claims);

        long userId = jwtClaims.getUserId();

        System.out.println("userId = " + userId);
    }

    @Test
    void getTokenType() {
        Claims claims = Jwts.claims().add(Map.of("type", "AUTH")).build();

        JwtClaims jwtClaims = new JwtClaims(claims);

        TokenType type = jwtClaims.getTokenType();

        System.out.println("type = " + type);
    }

    @Test
    void getJwtId() {
        Claims claims = Jwts.claims().subject("77").build();

        JwtClaims jwtClaims = new JwtClaims(claims);

        System.out.println("Jwt Id = " + jwtClaims.getJwtId());
    }
}