package com.example.chathub.controller;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotNull @Size(max = 80) String name,
        @NotNull @Email @Size(max = 254) String email,
        @NotNull @Size(min = 6, max = 60) String password
) {
}
