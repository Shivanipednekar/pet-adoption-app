CREATE DATABASE pet_adoption_1;
USE pet_adoption_1;

CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  species VARCHAR(50),
  breed VARCHAR(100),
  age INT,
  available BOOLEAN DEFAULT true
);

select * from pets;
INSERT INTO pets (name, species, breed, age) VALUES
('Milo', 'Dog', 'Beagle', 3),
('Luna', 'Cat', 'Siamese', 2),
('Oreo', 'Rabbit', 'Dutch', 1);

select * from pets;

INSERT INTO users (name, email, password, user_type) VALUES
('Test User', 'test@example.com', 'password123', 'Looking to Adopt');
