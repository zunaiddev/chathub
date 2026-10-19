package com.example.chathub.security.jwt;

import com.example.chathub.enums.TokenType;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.Map;

class JwtServiceTest {
    JwtService jwtService = new JwtService("this-is-a-basic-test-secret-just-for-testing");

    @Test
    void generateAccessToken() {
        System.out.println(jwtService.generateAccessToken(1));
    }

    @Test
    void generateRefreshToken() {
        System.out.println(jwtService.generateRefreshToken(1));
    }

    @Test
    void testParse() throws InterruptedException {
        String token = jwtService.issueToken("1", Duration.ofMinutes(5), Map.of("type", "REFRESH"));

        JwtClaims claims = jwtService.parse(token, TokenType.REFRESH);

        System.out.println(claims.getJwtId());
    }
}