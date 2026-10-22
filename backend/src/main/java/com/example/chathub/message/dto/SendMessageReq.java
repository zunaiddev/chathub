package com.example.chathub.message.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SendMessageReq(
        @NotNull(message = "message is required")
        @NotBlank(message = "Message can't be blank")
        String message) {
}