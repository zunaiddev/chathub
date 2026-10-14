package com.example.chathub.conversation;

import com.example.chathub.conversation.dto.ConversationRes;
import com.example.chathub.user.User;
import com.example.chathub.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class ConversationServiceTest {
    @Autowired
    private ConversationService conversationService;

    @Autowired
    private UserRepository userRepo;

    @Test
    void createConversation() {
        User user1 = userRepo.save(new User("User 1", "user1@gmail.com", "Test@123"));
        User user2 = userRepo.save(new User("User 2", "user2@gmail.com", "Test@123"));

        ConversationRes conversation = conversationService.createConversation(user1, user2.getId());
        ConversationRes conversation2 = conversationService.createConversation(user1, user2.getId());

        assertNotNull(conversation);
        assertNotNull(conversation2);
    }
}