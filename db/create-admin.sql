-- Vytvoření tabulky administrátorů
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Vložení výchozího administrátora (heslo: admin123)
INSERT INTO `admins` (`username`, `password`) VALUES
('admin', '$2b$10$WJYsmdsoSBYQmCtVCLp91eLTfpUhGbASLB9AwCYVZDXIrpl6KnXuG'); 