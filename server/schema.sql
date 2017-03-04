/* REMEMBER TO GET RID OF THIS BEFORE FINALIZING THE APP*/
DROP DATABASE chat;





CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  id INT AUTO_INCREMENT,
  roomname VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR(20),
  PRIMARY KEY(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT,
  username INT,
  message VARCHAR(20),
  roomname INT,
  PRIMARY KEY (id), 
  FOREIGN KEY (username) REFERENCES users(id),
  FOREIGN KEY (roomname) REFERENCES rooms(id)
);

SHOW tables;
DESCRIBE rooms;
DESCRIBE users;
DESCRIBE messages;

SELECT * FROM rooms;
SELECT * FROM users;
SELECT * FROM messages;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

