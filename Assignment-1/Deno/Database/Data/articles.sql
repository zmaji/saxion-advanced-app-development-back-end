CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT
);

INSERT INTO articles (name, description, content) VALUES
    ('Article 1', 'Description 1', 'Content 1'),
    ('Article 2', 'Description 2', 'Content 2');