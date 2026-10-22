package com.example.chathub.message;

import com.example.chathub.conversation.Conversation;
import com.example.chathub.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepo messageRepo;

    public Message createMessage(String message, User user, Conversation conversation) {
        return messageRepo.save(new Message(message, user, conversation));
    }

    public List<Message> findMessages(Conversation conversation) {
        return messageRepo.findAllByConversation(conversation);
    }
}