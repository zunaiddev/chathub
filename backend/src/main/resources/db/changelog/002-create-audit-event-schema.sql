CREATE TABLE audit_events
(
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_id      BIGINT,
    event_type    VARCHAR(100) NOT NULL,

    resource_type VARCHAR(100) NOT NULL,
    resource_id   VARCHAR(100),

    status        VARCHAR(100) NOT NULL,

    description   TEXT  DEFAULT NULL,
    metadata      JSONB DEFAULT NULL,

    occurred_at   TIMESTAMPTZ  NOT NULL
)