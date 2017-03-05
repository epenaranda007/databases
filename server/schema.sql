/* REMEMBER TO GET RID OF THIS BEFORE FINALIZING THE APP*/
DROP DATABASE chat;


CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
-- CREATE TABLE rooms (
--   id INT AUTO_INCREMENT,
--   roomname VARCHAR(20),
--   PRIMARY KEY (id)
-- );

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT,
  roomname VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT,
  username_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  roomname_id INT NOT NULL,
  PRIMARY KEY (id)
);

SHOW tables;

-- INSERT into messages(username,message,roomname) VALUES ('Valjean', 'In mercy\s name, three dayas is all I need.','Hello');

-- DESCRIBE rooms;
DESCRIBE users;
DESCRIBE messages;

-- SELECT * FROM rooms;
SELECT * FROM users;
SELECT * FROM messages;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

