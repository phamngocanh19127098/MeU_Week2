CREATE DATABASE shop_database;



CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    role_name text NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    login_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price double precision NULL,
    stock int NOT NULL,
    image_url text
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_price double precision NULL,
    time timestamp NULL DEFAULT now()
);


CREATE TABLE order_details (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity int DEFAULT 1,
);

ALTER TABLE products 
ADD CONSTRAINT product_user_fk FOREIGN KEY (user_id) REFERENCES users(id);


ALTER TABLE orders
ADD CONSTRAINT order_user_fk FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE order_details
ADD CONSTRAINT order_detail_order_fk FOREIGN KEY (order_id) REFERENCES orders(id);

ALTER TABLE order_details
ADD CONSTRAINT order_detail_product_fk FOREIGN KEY (product_id) REFERENCES products(id);

INSERT INTO users (name,address,role_name,login_name, password)
 VALUES('Admin 1','TP HCM','Admin','admin','123');

 INSERT INTO users (name,address,role_name,login_name, password)
 VALUES('Shop 1','Arizona','Shop','shop','123');

  INSERT INTO users (name,address,role_name,login_name, password)
  VALUES('User 1','Arizona','User','user','123');