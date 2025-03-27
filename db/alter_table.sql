-- Přidání sloupce approved s výchozí hodnotou false
ALTER TABLE `references`
ADD COLUMN approved BOOLEAN DEFAULT false;

-- Nastavení approved na false pro všechny existující záznamy
UPDATE `references`
SET approved = false
WHERE approved IS NULL; 