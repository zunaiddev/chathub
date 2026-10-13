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
class ConversationRepositoryTest {
    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    private final String email = "user@test.com";

    @Test
    void createUsers() {
        User user = new User("User 1", email, "Test@123");

        assertNotNull(user);
    }

    @Test
    void saveConversation() {
        User user = userRepository.findByEmail(email).orElse(null);

        assertNotNull(user, "User not found");

        Conversation conversation = conversationRepository.save(new Conversation(user, ConversationType.DIRECT));

        assertNotNull(conversation, "Conversation is null");
    }

    @Test
    void findConversationByCreatedBy() {
        User user = userRepository.findByEmail(email).orElse(null);

        assertNotNull(user, "User not found");

        Conversation conversation = conversationRepository
                .findByCreatedBy(user).orElse(null);

        Assert.notNull(conversation, "Conversation is Null");
    }
}