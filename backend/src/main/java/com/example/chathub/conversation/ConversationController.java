package com.example.chathub.conversation;

import com.example.chathub.conversation.dto.ConversationRes;
import com.example.chathub.message.dto.MessageRes;
import com.example.chathub.message.dto.SendMessageReq;
import com.example.chathub.security.principal.UserPrincipal;
import jakarta.validation.Valid;
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
        return conversationService.findAllConversations(principal.user());
    }

    @PostMapping("/{userId}")
    public ConversationRes create(@AuthenticationPrincipal UserPrincipal principal,
                                  @PathVariable long userId) {
        return conversationService.createConversation(principal.user(), userId);
    }

    @GetMapping("/{conversationId}/messages")
    public List<MessageRes> getMessages(@AuthenticationPrincipal UserPrincipal principal,
                                        @PathVariable long conversationId) {
        return conversationService.getMessages(principal.user(), conversationId);
    }

    @PostMapping("/{conversationId}/messages")
    public MessageRes sendMessage(@AuthenticationPrincipal UserPrincipal principal,
                                  @PathVariable long conversationId,
                                  @RequestBody @Valid SendMessageReq req) {
        return conversationService.sendMessage(principal.user(), conversationId, req);
    }
}