package com.example.chathub.service;

import com.example.chathub.model.AuditEvent;
import com.example.chathub.repository.AuditEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuditEventService {
    private final AuditEventRepository auditEventRepository;
    private final ObjectMapper objectMapper;

    public void record(UUID actorId, String action, String resourceType,
                       String resourceId, Map<String, ?> metadata) {
        auditEventRepository.save(new AuditEvent(actorId, action, resourceType, resourceId, this.toJson(metadata)));
    }

    private String toJson(Map<String, ?> metadata) {
        return objectMapper.writeValueAsString(metadata);
    }
}