package com.example.chathub.user;

import com.example.chathub.security.principal.UserPrincipal;
import com.example.chathub.user.dto.UserResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UsersController {
    @GetMapping
    public UserResponse getUser(@AuthenticationPrincipal UserPrincipal principal) {
        return new UserResponse(principal.user());
    }
}