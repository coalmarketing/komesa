-- Vytvoření databáze
CREATE DATABASE IF NOT EXISTS komesa;
USE komesa;

-- Vytvoření tabulky user_references
CREATE TABLE IF NOT EXISTS `user_references` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stars` int NOT NULL,
  `text` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `approved` boolean NOT NULL DEFAULT false,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vložení testovacích dat
INSERT INTO `user_references` (stars, text, location, date) VALUES
(5, 'Skvělá zábava pro děti!', 'Praha', '2024-03-24 10:00:00'); 