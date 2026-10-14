package com.example.chathub.conversation.dto;

import com.example.chathub.conversation.Conversation;
import com.example.chathub.enums.ConversationType;

import java.time.Instant;

public record ConversationRes(long id, ConversationType type, long createdBy, Instant createdAt) {
    public ConversationRes(Conversation conversation) {
        this(conversation.getId(), conversation.getType(), conversation.getCreatedBy().getId(),
                conversation.getCreatedAt());
    }
}