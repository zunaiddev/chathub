package com.example.chathub.conversation;

import com.example.chathub.audit.AuditEventService;
import com.example.chathub.enums.ConversationType;
import com.example.chathub.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final AuditEventService auditEventService;

    @Transactional
    public Conversation createConversation(User directHighUser, User directLowUser, ConversationType type) {
//        Conversation conversation = conversationRepository
//                .findByDirectHighUserAndDirectLowUser(directHighUser, directLowUser).orElse(null);
//
//        if (conversation == null) {
//            return conversationRepository.save(new Conversation(directHighUser, type));
//        }
//
//        return conversation;
        return null;
    }
}