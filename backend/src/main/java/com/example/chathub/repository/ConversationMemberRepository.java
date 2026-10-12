package com.example.chathub.repository;

import com.example.chathub.model.ConversationMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationMemberRepository extends JpaRepository<ConversationMember, Long> {
}
