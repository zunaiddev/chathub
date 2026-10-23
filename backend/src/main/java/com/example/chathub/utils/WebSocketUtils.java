package com.example.chathub.utils;

import com.example.chathub.security.principal.UserPrincipal;
import com.example.chathub.user.User;
import org.springframework.security.core.Authentication;

import java.security.Principal;

public class WebSocketUtils {
    public static User getUser(Principal principal) {
        if (principal instanceof Authentication authentication
                && authentication.getPrincipal() instanceof UserPrincipal(User user)) {
            return user;
        }

        return null;
    }
}