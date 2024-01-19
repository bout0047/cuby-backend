CREATE TABLE IF NOT EXISTS calendar_entries (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(50),
    eventId INTEGER,
    name VARCHAR(100),
    datetime VARCHAR NOT NULL
);
