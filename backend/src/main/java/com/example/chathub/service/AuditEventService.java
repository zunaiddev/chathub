package com.example.chathub.service;

import com.example.chathub.enums.AuditEventType;
import com.example.chathub.enums.AuditResourceType;
import com.example.chathub.enums.AuditStatus;
import com.example.chathub.model.AuditEvent;
import com.example.chathub.repository.AuditEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.time.Instant;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuditEventService {
    private final AuditEventRepository auditEventRepository;
    private final ObjectMapper objectMapper;

    public void record(long actorId, AuditEventType type, AuditResourceType resourceType,
                       String resourceId, AuditStatus status, String desc, Map<String, ?> metadata) {
        AuditEvent event = new AuditEvent(null, actorId, type,
                resourceType, resourceId, status,
                desc, toJson(metadata), Instant.now());

        auditEventRepository.save(event);
    }

    public void record(long actorId, AuditEventType type, AuditResourceType resourceType,
                       String resourceId, AuditStatus status) {
        this.record(actorId, type, resourceType, resourceId, status, null, null);
    }

    private String toJson(Map<String, ?> metadata) {
        return metadata == null ? null : objectMapper.writeValueAsString(metadata);
    }
}