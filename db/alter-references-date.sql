-- Změna typu sloupce date na DATETIME
ALTER TABLE `references` MODIFY COLUMN `date` DATETIME NOT NULL;

-- Přidání sloupce name, pokud ještě neexistuje
ALTER TABLE `references` ADD COLUMN IF NOT EXISTS `name` VARCHAR(255) NOT NULL AFTER `id`; 