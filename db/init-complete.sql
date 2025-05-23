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

-- Vložení dat
INSERT INTO `references` (id, stars, text, location, date) VALUES
(1, 5, 'O firmě Komesa jsme se dozvěděli z internetu. Měli jsme skákací hrad "Víla" zapůjčený již podruhé a k maximální spokojenosti. Byla radost pozorovat skotačící děti, jak si ho užívají. Jak jsme se s paní majitelkou dohodli, tak to také bylo a vše "klaplo" k oboustranné spokojenosti. Firmu můžeme jenom doporučit.', 'Pouť Kunvald', '15.5.2023'),
(2, 5, 'Vyhledali jsme Vás pomocí Google.com - potřebovali jsme atrakci pro děti na školní akci. Se službami firmy Komesa jsme byli velice spokojeni. Jednání s majitelkou bylo velmi příjemné a vstřícné. Jako škola jsme dostali drobnou slevu. Hrad (velký) byl pro děti velmi atraktivní a veškeré příslušenství bylo v pořádku. Rozhodně firmu doporučujeme.', 'Jarmark v Opočně', '22.6.2023'),
(3, 5, 'Bezvadná spolupráce i dobrá komunikace. Pronajímatel i obsluha jsou velice ochotní lidé, takže se časovému harmonogramu i vzniklým potížím (které se na akcích většího rozsahu vyskytují běžně) přizpůsobují, jak je to jen možné. Řekl bych, že přizpůsobení se a snaha vyhovět zákazníkovi, je pro ně prioritou číslo jedna.', 'Oslavy obce', '10.7.2023'),
(4, 4, 'Dozvěděli jsme se o vaší firmě od přátel, kteří již využili vašich služeb. Skákací hrad ''Tunel'' jsme si pronajali na dětský den. Děti byly nadšené a atrakce měla velký úspěch. Ocenili jsme především profesionální přístup a dochvilnost při doručení. Jediným drobným nedostatkem bylo, že fukar byl poněkud hlučnější než jsme očekávali.', 'Dětský den MŠ Sluníčko', '1.6.2023'),
(5, 5, 'Hrad ''Skok'' jsme si objednali na narozeninovou oslavu našeho syna. Vše proběhlo naprosto bezproblémově, od objednání až po vyzvednutí. Děti byly z hradu naprosto nadšené a my jako rodiče jsme ocenili bezpečnost a kvalitu atrakce. Určitě využijeme vaše služby i příště!', 'Soukromá oslava, Hradec Králové', '8.8.2023'),
(6, 5, 'Firma Komesa nám zajistila skákací hrad ''Věže'' na obecní slavnosti. Spolupráce byla na vysoké úrovni, veškerá komunikace probíhala rychle a bez problémů. Hrad byl čistý, v perfektním stavu a děti si ho náramně užily. Určitě doporučujeme a v budoucnu opět využijeme.', 'Obecní slavnosti Černilov', '20.9.2023'),
(7, 4, 'Pronajali jsme si hrad ''Pirát'' na firemní akci s dětmi. S celkovou službou jsme byli spokojeni, hrad byl doručen včas a v dobrém stavu. Personál byl milý a ochotný. Jediné, co bychom vytkli, bylo, že předem domluvený čas vyzvednutí byl posunut, což nám trochu zkomplikovalo organizaci.', 'Firemní den otevřených dveří', '5.10.2023'),
(8, 5, 'Se službami firmy Komesa jsme byli maximálně spokojeni. Skákací hrad ''Vlnka'' byl hlavní atrakcí na našem dni dětí a měl obrovský úspěch. Oceňujeme profesionální přístup, perfektní stav atrakce a velice vstřícné jednání. Určitě budeme spolupracovat i v budoucnu.', 'ZŠ Třebechovice pod Orebem', '28.5.2023'),
(9, 5, 'Vaše firma nám byla doporučena od kolegů z jiné školky. Pro naši akci jsme si vypůjčili malý skákací hrad, který naprosto splnil naše očekávání. Děti byly nadšené, rodiče spokojení a my také. Velmi si ceníme vašeho profesionálního přístupu a flexibility při domlouvání termínu.', 'MŠ Pohádka, Pardubice', '12.6.2023'),
(10, 5, 'Již poněkolikáté jsme využili služeb firmy Komesa a vždy jsme byli maximálně spokojeni. Tentokrát jsme měli zapůjčený hrad ''Dvě skluzavky'', který byl naprostým hitem mezi dětmi. Vážíme si spolehlivosti, kvality a vstřícného jednání, které je u této firmy standardem.', 'Sportovní den, Jaroměř', '15.7.2023'); 