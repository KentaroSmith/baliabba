DROP DATABASE IF EXISTS baliabba_db;
CREATE DATABASE baliabba_db;
USE baliabba_db;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INT NOT Null,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Left Sock","Clothing",200,1),
("Right Sock","Clothing",200,1),
("Shirt","Clothing",300,1), 
("Pants","Clothing",400,1),
("Tighty Whiteies","Clothing",100,1),
("Macbook Air","Electronics",2000,1),
("Chromebook","Electronics",200,1),
("HP Pavillion","Electronics",600,1),
("Gaming Monitor","Electronics",200,1),
("Keyboard and Mouse","Electronics",60,1);


UPDATE products SET price=2500 WHERE item_id=6;
SELECT * FROM products;



