-- Prevents table duplicates
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS calendars;
DROP TABLE IF EXISTS events;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password_hash TEXT
);

CREATE TABLE calendars (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name TEXT,
    description TEXT,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    calendar_id INTEGER,
    title TEXT,
    date DATE,
    start_time TIME,
    end_time TIME,
    location TEXT,
    description TEXT,

    FOREIGN KEY (user_id)
        REFERENCES users(id),
    
    FOREIGN KEY (calendar_id)
        REFERENCES calendars(id)
);