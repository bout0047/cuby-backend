CREATE TABLE IF NOT EXISTS calendar_entries (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(50),
    eventId INTEGER,
    datetime TIMESTAMP NOT NULL,
);
