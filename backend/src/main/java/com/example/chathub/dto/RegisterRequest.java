package com.example.chathub.dto;

import com.example.chathub.validation.ValidEmail;
import com.example.chathub.validation.ValidName;
import com.example.chathub.validation.ValidPassword;

public record RegisterRequest(
        @ValidName String name,
        @ValidEmail String email,
        @ValidPassword String password
) {
}