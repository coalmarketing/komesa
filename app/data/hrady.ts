// Import obrázků
import vlnkaImg from "../../public/new-photo/06_vlnka/IMG_8476.webp";
import vezeImg from "../../public/new-photo/07_veze/IMG_1004.webp";
import skokImg from "../../public/new-photo/05_skok/IMG_9020.webp";
import piratImg from "../../public/new-photo/04_pirat/IMG_1569.webp";
import skluzavkyImg from "../../public/new-photo/03_dve-skluzavky/IMG_2373.webp";
import tunelImg from "../../public/new-photo/02_tunel/IMG_4394.webp";
import minihradImg from "../../public/new-photo/01_minihrad/01-01.webp";

// Obrázky se načítají dynamicky v komponentě HradDetail pomocí API endpointu

export interface Hrad {
  id: number;
  název: string;
  popis: string;
  rozměry: string[];
  základníCena: string;
  sjednanáCena?: string;  
  doprava: string;
  obsluha: string;
  obrázek: any; // Zachováváme pro zpětnou kompatibilitu
  // obrázky se načítají dynamicky v komponentě pomocí API
}

export const hrady: Hrad[] = [
  {
    id: 1,
    název: "Velký skákací hrad \"Vlnka\"",
    popis: "Pronájem skákacího hradu je ideální volbou pro sbory dobrovolných hasičů, základní a mateřské školy, mateřská centra, dětské domovy, domy dětí a mládeže i pro občanská sdružení a organizace zaměřené na práci s dětmi.",
    rozměry: ["8 m", "4 m", "4 m"],
    základníCena: "5 900 Kč/den",
    doprava: "18 Kč/km",
    obsluha: "Nemáte-li vlastní obsluhu ke skákacímu hradu, jsme schopni Vám ji zajistit. Cena za vyškoleného pracovníka je 1900,-Kč/hod na osobu.",
    obrázek: vlnkaImg,
  },
  {
    id: 2,
    název: "Střední skákací hrad \"Věže\"",
    popis: "V ceně pronájmu je zahrnuta kompletní nafukovací atrakce, která zahrnuje skákací hrad se skluzavkou, výkonný fukar k jeho nafouknutí, prodlužovací kabel o délce 50 metrů, kolíky pro bezpečné ukotvení, ochrannou plachtu pod hrad a koberec před vstup.",
    rozměry: ["5 m", "4 m", "4 m"],
    základníCena: "4 900 Kč/den",
    doprava: "18 Kč/km",
    obsluha: "Nemáte-li vlastní obsluhu ke skákacímu hradu, jsme schopni Vám ji zajistit. Cena za vyškoleného pracovníka je 1900,-Kč/hod na osobu.",
    obrázek: vezeImg,
  },
  {
    id: 3,
    název: "Střední skákací hrad \"Skok\"",
    popis: "Cena nezahrnuje obsluhu ani dopravu, které lze zajistit za příplatek dle aktuálního ceníku. Podrobnosti o těchto službách naleznete níže.",
    rozměry: ["4 m", "3.7 m", "3.6 m"],
    základníCena: "3 900 Kč/den",
    doprava: "18 Kč/km",
    obsluha: "Nemáte-li vlastní obsluhu ke skákacímu hradu, jsme schopni Vám ji zajistit. Cena za vyškoleného pracovníka je 1900,-Kč/hod na osobu.",
    obrázek: skokImg,
  },
  {
    id: 4,
    název: "Malý skákací hrad \"Pirát\"",
    popis: "Pronájem skákacího hradu je ideální volbou pro sbory dobrovolných hasičů, základní a mateřské školy, mateřská centra, dětské domovy, domy dětí a mládeže i pro občanská sdružení a organizace zaměřené na práci s dětmi.",
    rozměry: ["3.7 m", "2.2 m", "2.2 m"],
    základníCena: "2 100 Kč/den",
    doprava: "18 Kč/km",
    obsluha: "Nemáte-li vlastní obsluhu ke skákacímu hradu, jsme schopni Vám ji zajistit. Cena za vyškoleného pracovníka je 1900,-Kč/hod na osobu.",
    obrázek: piratImg,
  },
  {
    id: 5,
    název: "Malý skákací hrad \"Dvě skluzavky\"",
    popis: "V ceně pronájmu je zahrnuta kompletní nafukovací atrakce, která zahrnuje skákací hrad se skluzavkou, výkonný fukar k jeho nafouknutí, prodlužovací kabel o délce 50 metrů, kolíky pro bezpečné ukotvení, ochrannou plachtu pod hrad a koberec před vstup.",
    rozměry: ["4.3 m", "1.7 m", "2.2 m"],
    základníCena: "2 500 Kč/den",
    doprava: "18 Kč/km",
    obsluha: "Nemáte-li vlastní obsluhu ke skákacímu hradu, jsme schopni Vám ji zajistit. Cena za vyškoleného pracovníka je 1900,-Kč/hod na osobu.",
    obrázek: skluzavkyImg,
  },
  {
    id: 6,
    název: "Malý skákací hrad \"Tunel\"",
    popis: "Cena nezahrnuje obsluhu ani dopravu, které lze zajistit za příplatek dle aktuálního ceníku. Podrobnosti o těchto službách naleznete níže.",
    rozměry: ["3.9 m", "2 m", "2.2 m"],
    základníCena: "2 100 Kč/den",
    doprava: "18 Kč/km",
    obsluha: "Nemáte-li vlastní obsluhu ke skákacímu hradu, jsme schopni Vám ji zajistit. Cena za vyškoleného pracovníka je 1900,-Kč/hod na osobu.",
    obrázek: tunelImg,
  },
  {
    id: 7,
    název: "Mini skákací hrad",
    popis: "Pronájem skákacího hradu je ideální volbou pro sbory dobrovolných hasičů, základní a mateřské školy, mateřská centra, dětské domovy, domy dětí a mládeže i pro občanská sdružení a organizace zaměřené na práci s dětmi.",
    rozměry: ["2.25 m", "2.25 m", "1.75 m"],
    základníCena: "1 200 Kč/den",
    doprava: "18 Kč/km",
    obsluha: "Nemáte-li vlastní obsluhu ke skákacímu hradu, jsme schopni Vám ji zajistit. Cena za vyškoleného pracovníka je 1900,-Kč/hod na osobu.",
    obrázek: minihradImg,
  },
]; 