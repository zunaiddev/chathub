package com.example.chathub.conversation;

import com.example.chathub.conversation.dto.ConversationRes;
import com.example.chathub.enums.ConversationType;
import com.example.chathub.exception.ConflictException;
import com.example.chathub.exception.ConversationNotFound;
import com.example.chathub.message.Message;
import com.example.chathub.message.MessageService;
import com.example.chathub.message.dto.MessageRes;
import com.example.chathub.message.dto.SendMessageReq;
import com.example.chathub.user.User;
import com.example.chathub.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final UserService userService;
    private final ConversationMemberService memberService;
    private final MessageService messageService;

    @Transactional
    public ConversationRes createConversation(User user, long userId) {
        if (user.getId().equals(userId)) {
            throw new ConflictException("You can't create a conversation with yourself");
        }

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

    public List<ConversationRes> findAllConversations(User user) {
        return conversationRepository.findAllByUserId(user.getId())
                .stream().map(ConversationRes::new).toList();
    }

    public List<MessageRes> getMessages(User user, long conversationId) {
        Conversation conversation = findConversation(user, conversationId);

        return messageService.findMessages(conversation)
                .stream().map(MessageRes::new).toList();
    }

    public MessageRes sendMessage(User user, long conversationId, SendMessageReq req) {
        Conversation conversation = findConversation(user, conversationId);

        Message message = messageService.createMessage(req.message(), user, conversation);

        return new MessageRes(message);
    }

    public Conversation findConversation(User user, long conversationId) {
        return conversationRepository.findByIdAndUser(conversationId, user)
                .orElseThrow(() -> new ConversationNotFound("Conversation not found with id " + conversationId));
    }

    public boolean isMember(long conversationId, User user) {
        return conversationRepository.existsByIdAndUser(conversationId, user);
    }
}