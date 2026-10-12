package com.example.chathub.service;

import com.example.chathub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConversationMemberService {
    private final UserRepository userRepository;
}
