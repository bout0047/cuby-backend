CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE,
        name VARCHAR(255) UNIQUE not null,
        email VARCHAR(255) UNIQUE not null,
        goals text[],
        stats text [],
        interests text []
);