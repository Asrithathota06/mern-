CREATE DATABASE IF NOT EXISTS shoppingdb;
USE shoppingdb;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT uq_user_product UNIQUE (user_id, product_id)
);

INSERT INTO products(name, price, image_url)
SELECT 'Nike Running Shoes', 4295.00, 'https://m.media-amazon.com/images/I/61LWV7ZPPZL._AC_SY879_.jpg'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Nike Running Shoes');

INSERT INTO products(name, price, image_url)
SELECT 'Casio Watch GA-700', 10295.00, 'https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/G/GA/GA7/GA-700-1B/assets/GA-700-1B_Seq1.png.transform/main-visual-pc/image.png'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Casio Watch GA-700');

INSERT INTO products(name, price, image_url)
SELECT 'Leather Jacket', 10000.00, 'https://www.sacuir.in/cdn/shop/files/preview_images/ee40722fc3354f19b0f721b7061320d6.thumbnail.0000000000.jpg?v=1722796688&width=990'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Leather Jacket');

INSERT INTO products(name, price, image_url)
SELECT 'Wireless Headphones', 8187.00, 'https://m.media-amazon.com/images/I/61RahTQtAqL._AC_UF1000,1000_QL80_.jpg'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Wireless Headphones');
