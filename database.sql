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
-- Test data
SELECT * FROM users;
-- select * from users, user_roles where users.id = user_roles.id;
-- Insert data
INSERT INTO users (user_name,user_email,user_password) VALUES('Anh','anh@gmail.com','Anh'); 
INSERT INTO user_roles(user_role) VALUES('admin');
--psql -U postgre

--\c MeUWeek2_database
--\dt