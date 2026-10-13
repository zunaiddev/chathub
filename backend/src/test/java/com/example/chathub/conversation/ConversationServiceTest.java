package com.example.chathub.conversation;

import com.example.chathub.enums.ConversationType;
import com.example.chathub.user.User;
import com.example.chathub.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class ConversationServiceTest {
    @Autowired
    private ConversationService conversationService;

    @Autowired
    private UserRepository userRepo;

    @Test
    void createConversation() {
        User highUser = userRepo.findByEmail("user1@test.com").orElse(null);
        User lowUser = userRepo.findByEmail("user2@test.com").orElse(null);

        Assert.notNull(highUser, "No Higher User Present");
        Assert.notNull(lowUser, "No Low User Present");

        Conversation conversation = conversationService.createConversation(highUser, lowUser, ConversationType.DIRECT);

        assertNotNull(conversation);
    }
}