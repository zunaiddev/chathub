package com.example.chathub.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;

public record AuthResponse(
        long id,
        String accessToken,
        @JsonIgnore String refreshToken
) {
}