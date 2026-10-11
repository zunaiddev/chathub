package com.example.chathub.service;

import com.example.chathub.repository.UserAccountRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAccountService {
    private final UserAccountRepository userService;

    @PostConstruct
    public void checkUser() {
        userService.findAll().forEach(System.out::println);
    }
}
