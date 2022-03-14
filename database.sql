CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE DATABASE MeUWeek2_database;


--c\ into MeUWeek2_database

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_verified TEXT DEFAULT 0
);



CREATE TABLE user_roles(
    user_id uuid PRIMARY KEY,
    user_role TEXT NOT NULL,
    
    CONSTRAINT fk_user_userrole
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)

);
-- DROP TABLE user_roles;
-- DROP TABLE users;
-- Test data
SELECT * FROM users;
-- select * from users, user_roles where users.id = user_roles.id;
-- Insert data
INSERT INTO users (user_name,user_email,user_password) VALUES('A','nguyenvanA@gmail.com','123'); 
INSERT INTO users (user_name,user_email,user_password) VALUES('B','nguyenvanB@gmail.com','123'); 
INSERT INTO users (user_name,user_email,user_password) VALUES('C','nguyenvanC@gmail.com','123'); 
INSERT INTO users (user_name,user_email,user_password) VALUES('D','nguyenvanD@gmail.com','123'); 
INSERT INTO users (user_name,user_email,user_password) VALUES('E','nguyenvanE@gmail.com','123'); 
INSERT INTO users (user_name,user_email,user_password) VALUES('F','nguyenvanF@gmail.com','123'); 
--psql -U postgre

