package com.example.chathub.conversation;

import com.example.chathub.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConversationMemberService {
    private final UserRepository userRepository;
}
