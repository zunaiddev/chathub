package com.example.chathub.model;

import com.example.chathub.enums.UserRole;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Locale;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean locked;

    @Column(nullable = false)
    private boolean enabled;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public User(String name, String email, String password, UserRole role) {
        this.name = name;
        this.email = email.strip().toLowerCase(Locale.ROOT);
        this.password = password;
        this.enabled = true;
        this.locked = false;
        this.role = role;
    }

    public User(String name, String email, String password) {
        this(name, email, password, UserRole.USER);
    }

    @PrePersist
    public void prePersist() {
        final Instant now = Instant.now();

        this.createdAt = now;
        this.updatedAt = now;
    }
}