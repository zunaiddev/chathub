package com.example.chathub.message;

import com.example.chathub.conversation.ConversationService;
import com.example.chathub.enums.Topics;
import com.example.chathub.message.dto.SendMessageReq;
import com.example.chathub.utils.WebSocketUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class MessageWebsocketController {
    private final ConversationService conversationService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/conversations/{conversationId}/send")
    public void sendMessage(@DestinationVariable Long conversationId,
                            @Payload @Valid SendMessageReq req,
                            Principal principal) {
        messagingTemplate.convertAndSend(
                Topics.CONVERSATION + conversationId,
                conversationService.sendMessage(WebSocketUtils.getUser(principal), conversationId, req)
        );
    }
}
