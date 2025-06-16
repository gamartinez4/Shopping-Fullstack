CREATE TABLE usuarios(
    id int PRIMARY KEY NOT NULL,
	nombre varchar(50) NOT NULL ,
	contraseña varchar(50) NOT NULL ,
	token varchar (50) NOT NULL ,
);

CREATE TABLE categorias(
    id int PRIMARY KEY NOT NULL,
	nombre varchar(50) NOT NULL 
	
);

CREATE table productos(
	id int PRIMARY KEY NOT NULL,
	nombre varchar(50) NOT NULL ,
	stock int,
	precio int, 
	id_categorias INT FOREIGN KEY REFERENCES categorias(id) ON DELETE CASCADE
);

CREATE TABLE ordenes (
    id_usuario INT,
    id_productos INT,
    cantidad INT,
    PRIMARY KEY (id_usuario, id_productos),
    FOREIGN KEY (id_usuario) REFERENCES categorias(id) ON DELETE CASCADE,
    FOREIGN KEY (id_productos) REFERENCES usuarios(id) ON DELETE CASCADE
);


INSERT INTO usuarios (id, nombre, contraseña, token) VALUES
(1, 'John Doe', 'password1', 'abc123'),
(2, 'Jane Smith', 'password2', 'def456'),
(3, 'Michael Johnson', 'password3', 'ghi789'),
(4, 'Emily Davis', 'password4', 'jkl012'),
(5, 'David Lee', 'password5', 'mno345');

-- Insert 4 categories
INSERT INTO categorias (id, nombre) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Toys'),
(4, 'Home');

-- Insert 30 products
INSERT INTO productos (id, nombre, stock, precio, id_categorias) VALUES
(1, 'Smartphone', 20, 599, 1),
(2, 'Laptop', 15, 899, 1),
(3, 'Tablet', 18, 399, 1),
(4, 'T-Shirt', 50, 50, 2),
(5, 'Jeans', 30, 60, 2),
(6, 'Dress', 25, 40, 2),
(7, 'Teddy Bear', 35, 38, 3),
(8, 'Building Blocks', 40, 20, 3),
(9, 'Puzzle', 45, 10, 3),
(10, 'Lamp', 22, 35, 4),
(11, 'Chair', 18, 80, 4),
(12, 'Sofa', 12, 300, 4),
(13, 'Headphones', 25, 60, 1),
(14, 'Speaker', 30, 80, 1),
(15, 'Power Bank', 28, 40, 1),
(16, 'Skirt', 35, 30, 2),
(17, 'Blouse', 40, 35, 2),
(18, 'Jacket', 27, 60, 2),
(19, 'Plush Toy', 32, 20, 3),
(20, 'Remote Control Car', 38, 35, 3),
(21, 'Board Game', 41, 25, 3),
(22, 'Rug', 24, 90, 4),
(23, 'Curtains', 29, 70, 4),
(24, 'Vase', 33, 45, 4),
(25, 'Smartwatch', 22, 199, 1),
(26, 'Earbuds', 27, 50, 1),
(27, 'External Hard Drive', 24, 80, 1),
(28, 'Scarf', 31, 20, 2),
(29, 'Hat', 36, 15, 2),
(30, 'Gloves', 28, 18, 2);

-- Insert 2 orders
INSERT INTO ordenes (id_usuario, id_productos, cantidad) VALUES
(1, 3, 6),
(2, 4, 4),
(2, 3, 7),
(3, 1, 1),
(1, 2, 1),
(2, 1, 3)



DROP TABLE categorias
DROP TABLE ordenes
DROP TABLE productos
DROP TABLE usuarios

select * from productos