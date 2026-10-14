package com.example.chathub.user;

import com.example.chathub.security.principal.UserPrincipal;
import com.example.chathub.user.dto.PublicUserRes;
import com.example.chathub.user.dto.UserResponse;
import com.example.chathub.validation.ValidEmail;
import com.example.chathub.utils.Normalizer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;

    @GetMapping
    public UserResponse getUser(@AuthenticationPrincipal UserPrincipal principal) {
        return new UserResponse(principal.user());
    }

    @GetMapping("/search")
    public PublicUserRes findUser(@RequestParam("email") @ValidEmail String email) {
        return userService.searchByEmail(Normalizer.normalizeEmail(email));
    }
}
