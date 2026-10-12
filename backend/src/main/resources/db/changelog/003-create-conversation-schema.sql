create table conversations
(
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type                  varchar(20) NOT NULL,
    title                 varchar(120),
    created_by            BIGINT      NOT NULL REFERENCES users (id),
    next_message_sequence BIGINT      NOT NULL DEFAULT 1,
    created_at            TIMESTAMP   NOT NULL,
    updated_at            TIMESTAMP   NOT NULL
);