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
INSERT INTO `references` (`stars`, `text`, `location`, `date`) VALUES
(5, 'O firmě Komesa jsme se dozvěděli z internetu. Měli jsme skákací hrad \"Víla\" zapůjčený již podruhé a k maximální spokojenosti. Byla radost pozorovat skotačící děti, jak si ho užívají. Jak jsme se s paní majitelkou dohodli, tak to také bylo a vše \"klaplo\" k oboustranné spokojenosti. Firmu můžeme jenom doporučit.', 'Pouť Kunvald', '15.5.2023'),
(5, 'Vyhledali jsme Vás pomocí Google.com - potřebovali jsme atrakci pro děti na školní akci. Se službami firmy Komesa jsme byli velice spokojeni. Jednání s majitelkou bylo velmi příjemné a vstřícné. Jako škola jsme dostali drobnou slevu. Hrad (velký) byl pro děti velmi atraktivní a veškeré příslušenství bylo v pořádku. Rozhodně firmu doporučujeme.', 'Jarmark v Opočně', '22.6.2023'),
(5, 'Bezvadná spolupráce i dobrá komunikace. Pronajímatel i obsluha jsou velice ochotní lidé, takže se časovému harmonogramu i vzniklým potížím přizpůsobují, jak je to jen možné. Řekl bych, že přizpůsobení se a snaha vyhovět zákazníkovi, je pro ně prioritou číslo jedna.', 'Oslavy obce', '10.7.2023'); 