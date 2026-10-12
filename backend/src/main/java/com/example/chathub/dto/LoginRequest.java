package com.example.chathub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record LoginRequest(
        @NotNull(message = "email is required") @Email String email,
        @NotNull String password
) {
}