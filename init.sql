CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    total_duration INTEGER NOT NULL,
    work_duration INTEGER NOT NULL,
    rest_duration INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
