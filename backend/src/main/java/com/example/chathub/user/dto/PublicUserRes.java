package com.example.chathub.user.dto;

import com.example.chathub.user.User;

public record PublicUserRes(
        long id,
        String name,
        String email
) {
    public PublicUserRes(User user) {
        this(user.getId(), user.getName(), user.getEmail());
    }
}