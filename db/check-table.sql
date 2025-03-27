-- Kontrola struktury tabulky
SHOW CREATE TABLE `references`;

-- Kontrola dat v tabulce
SELECT id, location, approved FROM `references` LIMIT 5; 