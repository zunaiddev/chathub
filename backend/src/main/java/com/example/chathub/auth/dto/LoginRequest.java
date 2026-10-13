package com.example.chathub.auth.dto;

import com.example.chathub.cleanup.EmailDeserializer;
import com.example.chathub.validation.ValidEmail;
import jakarta.validation.constraints.NotBlank;
import tools.jackson.databind.annotation.JsonDeserialize;

public record LoginRequest(
        @JsonDeserialize(using = EmailDeserializer.class) @ValidEmail String email,
        @NotBlank(message = "password is required") String password
) {
}