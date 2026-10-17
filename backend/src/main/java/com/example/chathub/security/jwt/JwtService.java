package com.example.chathub.security.jwt;

import com.example.chathub.enums.ErrorCode;
import com.example.chathub.enums.TokenType;
import com.example.chathub.exception.CustomException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Slf4j
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

    public Claims parse(@NotNull String token, @NotNull TokenType tokenType) {
        try {
            Claims claims = Jwts.parser().verifyWith(secretKey)
                    .build().parseSignedClaims(token).getPayload();

            if (tokenType == null || !tokenType.equals(TokenType.valueOf(claims.get("type").toString()))) {
                throw new CustomException(HttpStatus.FORBIDDEN, "This token is not allowed here", ErrorCode.INVALID_TOKEN_TYPE);
            }

            return claims;
        } catch (CustomException e) {
            throw e;
        } catch (ExpiredJwtException e) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Token has been expired", ErrorCode.TOKEN_EXPIRED);
        } catch (SignatureException e) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Invalid Token Signature", ErrorCode.INVALID_SIGNATURE);
        } catch (JwtException e) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "Invalid Jwt Token", ErrorCode.TOKEN_EXPIRED);
        } catch (Exception e) {
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not parse Token", ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public String generateAccessToken(long userId) {
        return this.issueToken(String.valueOf(userId), Duration.ofMinutes(15), Map.of("type", TokenType.AUTH));
    }

    public String generateRefreshToken(long userId) {
        return this.issueToken(String.valueOf(userId), Duration.ofDays(30), Map.of("type", TokenType.REFRESH));
    }
}
