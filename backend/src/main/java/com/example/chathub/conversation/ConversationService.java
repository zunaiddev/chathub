package com.example.chathub.conversation;

import com.example.chathub.audit.AuditEventService;
import com.example.chathub.conversation.dto.ConversationRes;
import com.example.chathub.enums.ConversationType;
import com.example.chathub.user.User;
import com.example.chathub.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final UserService userService;
    private final ConversationMemberService memberService;

    private final AuditEventService auditEventService;

    @Transactional
    public ConversationRes createConversation(User user, long userId) {
        User user2 = userService.findById(userId);

        Optional<Conversation> conversation = conversationRepository
                .findDirectConversation(user.getId(), user2.getId(), ConversationType.DIRECT);

        if (conversation.isPresent()) {
            return new ConversationRes(conversation.get());
        }

        Conversation newConversation = conversationRepository.save(new Conversation(user, ConversationType.DIRECT));

        memberService.create(newConversation, user, user2);

        return new ConversationRes(newConversation);
    }
}