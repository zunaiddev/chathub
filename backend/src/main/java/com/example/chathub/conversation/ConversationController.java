package com.example.chathub.conversation;

import com.example.chathub.conversation.dto.ConversationRes;
import com.example.chathub.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversations")
@RequiredArgsConstructor
public class ConversationController {
    private final ConversationService conversationService;

    @GetMapping()
    public List<ConversationRes> getAll(@AuthenticationPrincipal UserPrincipal principal) {
        return conversationService.findAllUser(principal.user());
    }

    @PostMapping("/{userId}")
    public ConversationRes create(@AuthenticationPrincipal UserPrincipal principal,
                                  @PathVariable long userId) {
        return conversationService.createConversation(principal.user(), userId);
    }
}