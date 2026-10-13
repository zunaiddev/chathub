package com.example.chathub.auth.dto;

import com.example.chathub.cleanup.EmailDeserializer;
import com.example.chathub.cleanup.NameDeserializer;
import com.example.chathub.validation.ValidEmail;
import com.example.chathub.validation.ValidName;
import com.example.chathub.validation.ValidPassword;
import tools.jackson.databind.annotation.JsonDeserialize;

public record RegisterRequest(
        @JsonDeserialize(using = NameDeserializer.class) @ValidName String name,
        @JsonDeserialize(using = EmailDeserializer.class) @ValidEmail String email,
        @ValidPassword String password
) {
}
