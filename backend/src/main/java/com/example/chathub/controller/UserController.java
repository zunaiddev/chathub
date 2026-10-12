package com.example.chathub.controller;

import com.example.chathub.model.User;
import com.example.chathub.security.UserPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping
    public User getUser(@AuthenticationPrincipal UserPrincipal principal) {
        return principal.user();
    }
}
