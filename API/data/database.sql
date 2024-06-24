CREATE DATABASE IF NOT EXISTS forum_b1 CHARACTER SET = utf8mb4;

CREATE USER IF NOT EXISTS 'forum_user'@'localhost' IDENTIFIED BY 'notrepremierforum';

GRANT SELECT, INSERT, UPDATE, DELETE ON forum_b1.* TO 'forum_user'@'localhost';