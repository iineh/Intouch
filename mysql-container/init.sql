CREATE DATABASE contacts_db;

USE contacts_db;

CREATE USER 'LU001intouch_user'@'%' IDENTIFIED BY 'iseveShare4rce.';
GRANT ALL PRIVILEGES ON contacts_db.* TO 'LU001intouch_user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL
);

INSERT INTO contacts (name, email, phone)
VALUES ('John Doe', 'johndoe@example.com', '1234567890');

INSERT INTO contacts (name, email, phone)
VALUES ('Jane Smith', 'janesmith@example.com', '9876543210');