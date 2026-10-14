package com.example.chathub.conversation;

import com.example.chathub.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationMemberService {
    private final ConversationMemberRepository memberRepo;

    public List<ConversationMember> create(Conversation conversation, User user1, User user2) {
        Instant now = Instant.now();

        List<ConversationMember> members = List.of(new ConversationMember(conversation, user1, now),
                new ConversationMember(conversation, user2, now));

        return memberRepo.saveAll(members);
    }
}
