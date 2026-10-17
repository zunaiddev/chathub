package com.example.chathub.security.jwt;

import com.example.chathub.enums.TokenType;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.*;

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
        String token = jwtService.issueToken("1", Duration.ofSeconds(5), Map.of("type", "REFRESH"));

        Claims claims = jwtService.parse(token, TokenType.REFRESH);

        Claims claims1 = new Claims() {
            @Override
            public String getIssuer() {
                return "";
            }

            @Override
            public String getSubject() {
                return "";
            }

            @Override
            public Set<String> getAudience() {
                return Set.of();
            }

            @Override
            public Date getExpiration() {
                return null;
            }

            @Override
            public Date getNotBefore() {
                return null;
            }

            @Override
            public Date getIssuedAt() {
                return null;
            }

            @Override
            public String getId() {
                return "";
            }

            @Override
            public <T> T get(String claimName, Class<T> requiredType) {
                return null;
            }

            @Override
            public int size() {
                return 0;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public boolean containsKey(Object key) {
                return false;
            }

            @Override
            public boolean containsValue(Object value) {
                return false;
            }

            @Override
            public Object get(Object key) {
                return null;
            }

            @Override
            public Object put(String key, Object value) {
                return null;
            }

            @Override
            public Object remove(Object key) {
                return null;
            }

            @Override
            public void putAll(Map<? extends String, ?> m) {

            }

            @Override
            public void clear() {

            }

            @Override
            public Set<String> keySet() {
                return Set.of();
            }

            @Override
            public Collection<Object> values() {
                return List.of();
            }

            @Override
            public Set<Entry<String, Object>> entrySet() {
                return Set.of();
            }
        };
    }
}