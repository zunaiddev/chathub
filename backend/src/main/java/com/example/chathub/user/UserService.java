package com.example.chathub.user;

import com.example.chathub.enums.ErrorCode;
import com.example.chathub.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User findById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "User not found with id " + id, ErrorCode.USER_NOT_FOUND));
    }

    public User createUserAccount(String name, String email, String password) {
        return userRepository.save(new User(name, email, password));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
