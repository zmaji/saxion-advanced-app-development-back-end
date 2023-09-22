GRANT ALL PRIVILEGES ON mydatabase.* TO 'myusername'@'deno-mysql-1';

FLUSH PRIVILEGES;

USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL
);

INSERT INTO users (firstName, lastName) VALUES
    ('Maurice', 'ten Teije'),
    ('Nils', 'Kimenai');