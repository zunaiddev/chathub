create table conversation_members
(
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    conversation_id    BIGINT      NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
    user_id            BIGINT      NOT NULL REFERENCES users (id),
    role               VARCHAR(20) NOT NULL,
    last_read_sequence BIGINT      NOT NULL DEFAULT 0,
    joined_at          TIMESTAMP   NOT NULL,

    UNIQUE (conversation_id, user_id)
);