CREATE DATABASE genkaix_task_1;

USE genkaix_task_1;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password VARCHAR(255),
  image LONGBLOB,
  role VARCHAR(20) DEFAULT 'USER'
);
