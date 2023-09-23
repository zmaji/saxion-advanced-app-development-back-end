CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    postID INT NOT NULL,
    content TEXT,
    FOREIGN KEY (userID) REFERENCES users(id),
    FOREIGN KEY (postID) REFERENCES posts(id)
);

INSERT INTO comments (userID, postID, content) VALUES
    ('1', '1', 'Content 1'),
    ('2', '2', 'Content 2');