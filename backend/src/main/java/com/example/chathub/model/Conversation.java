package com.example.chathub.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Entity
@Table(name = "conversations")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String type;

    @Column(length = 120)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(name = "next_message_sequence", nullable = false)
    private Long nextMessageSequence = 1L;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Conversation(String type, String title, User createdBy) {
        this.type = type;
        this.title = title;
        this.createdBy = createdBy;
        this.nextMessageSequence = 1L;
    }

    @PrePersist
    protected void persist() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }
}