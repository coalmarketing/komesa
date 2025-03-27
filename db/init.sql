-- Vytvoření databáze
CREATE DATABASE IF NOT EXISTS komesa;
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

-- Vložení testovacích dat
INSERT INTO `references` (stars, text, location, date) VALUES
(5, 'Skvělá služba! Skákací hrad byl perfektní a děti byly nadšené.', 'Praha', '2024-03-15'),
(4, 'Velmi profesionální přístup a kvalitní vybavení.', 'Brno', '2024-03-10'),
(5, 'Doporučuji všem, kdo hledají zábavu pro děti.', 'Ostrava', '2024-03-05'); 