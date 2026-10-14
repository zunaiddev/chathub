package com.example.chathub.conversation;

import com.example.chathub.conversation.dto.ConversationRes;
import com.example.chathub.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/conversations")
@RequiredArgsConstructor
public class ConversationController {
    private final ConversationService conversationService;

    @PostMapping("/{userId}")
    public ConversationRes create(@AuthenticationPrincipal UserPrincipal principal,
                                  @PathVariable long userId) {
        return conversationService.createConversation(principal.user(), userId);
    }
}
