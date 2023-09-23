CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickName VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255)
);

INSERT INTO users (firstName, lastName, email, nickName) VALUES
    ('Maurice', 'ten Teije', '502241@student.saxion.nl', 'zmaji'),
    ('Nils', 'Kimenai', '493217@student.saxion.nl', 'Gardif');