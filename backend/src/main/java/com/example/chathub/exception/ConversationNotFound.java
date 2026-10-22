package com.example.chathub.exception;

import com.example.chathub.enums.ErrorCode;
import org.springframework.http.HttpStatus;

public class ConversationNotFound extends CustomException {

    public ConversationNotFound(String message) {
        super(HttpStatus.NOT_FOUND, message, ErrorCode.CONVERSATION_NOT_FOUND);
    }
}