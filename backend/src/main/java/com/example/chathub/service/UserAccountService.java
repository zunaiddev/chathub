package com.example.chathub.service;

import com.example.chathub.model.User;
import com.example.chathub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAccountService {
    private final UserRepository userRepository;

    public User createUserAccount(String name, String email, String password) {
        return userRepository.save(new User(name, email, password));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
