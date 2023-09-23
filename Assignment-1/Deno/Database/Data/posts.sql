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