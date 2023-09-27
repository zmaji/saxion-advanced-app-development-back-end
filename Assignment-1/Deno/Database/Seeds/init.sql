-- Change caching sha2 method to mysql native method because Deno MySQL library doesn't support it
ALTER USER 'root'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'myrootpassword';

-- TODO: Change to import individual .sql files
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

CREATE TABLE IF NOT EXISTS articles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
content TEXT
);

INSERT INTO articles (title, description, content) VALUES
    ('Article 1', 'Description 1', 'Content 1'),
    ('Article 2', 'Description 2', 'Content 2');

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(255),
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    FOREIGN KEY (userID) REFERENCES users(id)
);

INSERT INTO posts (userID, title, content, category, likes, dislikes) VALUES
    ('1', 'Title 1', 'Post content 1', 'Category 1', 10, 5),
    ('2', 'Title 1', 'Post content 2', 'Cateogry 2', 10, 5);

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    postID INT NOT NULL,
    content TEXT,
    FOREIGN KEY (userID) REFERENCES users(id),
    FOREIGN KEY (postID) REFERENCES posts(id)
);

INSERT INTO comments (userID, postID, content) VALUES
    ('1', '1', 'Comment content 1'),
    ('2', '2', 'Comment content 2'),
    ('1', '1', 'Comment content 3'),
    ('2', '2', 'Comment content 4');    