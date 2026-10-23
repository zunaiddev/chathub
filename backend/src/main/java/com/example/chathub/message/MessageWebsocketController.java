package com.example.chathub.message;

import com.example.chathub.enums.Topics;
import com.example.chathub.message.dto.SendMessageReq;
import com.example.chathub.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageWebsocketController {
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/conversations/{conversationId}/send")
    public void sendMessage(@DestinationVariable Long conversationId,
                            @Payload @Valid SendMessageReq req,
                            Authentication authentication) {
        messagingTemplate.convertAndSend(Topics.CONVERSATION + conversationId, req);
    }
}
