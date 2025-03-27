-- Změna typu sloupce date na DATETIME, pokud ještě není
ALTER TABLE `references` MODIFY COLUMN `date` DATETIME NOT NULL;

-- Přidání sloupce email
ALTER TABLE `references` ADD COLUMN IF NOT EXISTS `email` VARCHAR(255) NOT NULL; 