create table conversation_members
(
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    conversation_id BIGINT NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
    user_id            BIGINT      NOT NULL REFERENCES users (id),
    joined_at          TIMESTAMP   NOT NULL,

    UNIQUE (conversation_id, user_id)
);