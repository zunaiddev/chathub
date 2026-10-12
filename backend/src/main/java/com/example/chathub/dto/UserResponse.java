package com.example.chathub.dto;

import com.example.chathub.enums.UserRole;
import com.example.chathub.model.User;

import java.time.Instant;

public record UserResponse(
        long id,
        String name,
        String email,
        UserRole role,
        boolean locked,
        boolean enabled,
        Instant createdAt,
        Instant updatedAt
) {
    public UserResponse(User user) {
        this(user.getId(), user.getName(), user.getEmail(), user.getRole(),
                user.isLocked(), user.isEnabled(), user.getCreatedAt(), user.getUpdatedAt());
    }
}
