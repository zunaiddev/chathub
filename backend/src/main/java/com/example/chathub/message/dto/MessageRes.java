package com.example.chathub.message.dto;

import com.example.chathub.message.Message;

import java.time.Instant;

public record MessageRes(long id, long conversationId, long senderId,
                         String content, Instant createdAt) {
    public MessageRes(Message message) {
        this(message.getId(),
                message.getConversation().getId(),
                message.getSender().getId(),
                message.getContent(), message.getCreatedAt());
    }
}