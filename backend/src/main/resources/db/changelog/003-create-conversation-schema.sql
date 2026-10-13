create table conversations
(
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type       VARCHAR(20) NOT NULL,
    created_by            BIGINT      NOT NULL REFERENCES users (id),
    created_at TIMESTAMP   NOT NULL
);