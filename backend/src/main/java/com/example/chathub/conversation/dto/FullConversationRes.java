package com.example.chathub.conversation.dto;

import com.example.chathub.enums.ConversationType;
import com.example.chathub.message.dto.MessageRes;

import java.time.Instant;

public record FullConversationRes(
        long id,
        ConversationType type,
        Instant createdAt,
        ConversationDisplayInfo displayInfo,
        MessageRes lastMessage,

        long unreadCount
) {
}
