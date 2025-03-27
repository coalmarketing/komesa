-- Vytvoření databáze
CREATE DATABASE IF NOT EXISTS komesa;

-- Použití databáze
USE komesa;

-- Vytvoření tabulky references
CREATE TABLE IF NOT EXISTS `references` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stars` int NOT NULL,
  `text` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 