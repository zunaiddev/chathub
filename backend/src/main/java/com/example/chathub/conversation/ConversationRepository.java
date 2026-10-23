package com.example.chathub.conversation;

import com.example.chathub.enums.ConversationType;
import com.example.chathub.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findByCreatedBy(User user);

    @Query("""
            SELECT conversation from Conversation conversation WHERE conversation.type = :type
            AND EXISTS (SELECT  cm1.id FROM ConversationMember cm1 where cm1.conversation = conversation AND cm1.user.id = :userId1)
            AND EXISTS (SELECT cm2.id from ConversationMember cm2 where cm2.conversation = conversation AND cm2.user.id = :userId2)
            """)
    Optional<Conversation> findDirectConversation(long userId1, long userId2, ConversationType type);


    @Query("""
            SELECT c FROM Conversation c
            WHERE EXISTS (
                SELECT cm.id
                FROM ConversationMember cm
                WHERE cm.conversation = c
                  AND cm.user.id = :userId
            )
            ORDER BY c.createdAt DESC
            """)
    List<Conversation> findAllByUserId(long userId);

    @Query("""
            SELECT c FROM Conversation c WHERE c.id = :conversationId
            AND EXISTS (SELECT cm.id FROM ConversationMember cm WHERE cm.conversation = c
                        AND cm.user = :user)
            """)
    Optional<Conversation> findByIdAndUser(long conversationId, User user);

    @Query("""
             SELECT CASE WHEN COUNT(cm) > 0 THEN true ELSE false END FROM ConversationMember cm WHERE cm.conversation.id = :conversationId
             AND cm.user = :user
            """)
    boolean existsByIdAndUser(long conversationId, User user);
}