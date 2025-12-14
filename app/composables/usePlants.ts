import { ref } from "vue";
import type { Plant, Category, Size } from "@/types/plants";

import fikus1 from "@/assets/plants/fikus2.png";
import fikus2 from "@/assets/plants/fikus3.png";
import kaktus1 from "@/assets/plants/kaktus.png";
import kaktus2 from "@/assets/plants/kaktus2.png";
import iglica1 from "@/assets/plants/iglica.png";
import iglica2 from "@/assets/plants/iglica2.png";
import zamiokulkas1 from "@/assets/plants/zamiokulkas.png";
import zamiokulkas2 from "@/assets/plants/zamiokulkas2.png";
import sukulent1 from "@/assets/plants/sukulent.png";
import sukulent2 from "@/assets/plants/sukulent2.png";
import monstera1 from "@/assets/plants/monstera.png";
import monstera2 from "@/assets/plants/monstera2.png";

export const allPlants: Plant[] = [
  {
    id: 1,
    image: fikus1,
    category: "Fikusy",
    title: "Fikus „Maluszek”",
    price: 89.99,
    oldPrice: 119.99,
    discount: "-25%",
    size: "small",
    description:
      "Malutki fikus o delikatnych, błyszczących liściach. Idealny do małych pomieszczeń, biurek i parapetów. Bardzo łatwy w pielęgnacji, wybacza drobne błędy w podlewaniu. Doskonały wybór dla początkujących miłośników roślin.",
  },
  {
    id: 2,
    image: fikus2,
    category: "Fikusy",
    title: "Fikus „Gigantyczny”",
    price: 199.99,
    oldPrice: null,
    discount: null,
    size: "large",
    description:
      "Imponujący okaz fikusa o dużych, skórzastych liściach. Ta roślina stanie się centralnym punktem każdego salonu. Wyróżnia się szybkim wzrostem i wyjątkową wytrzymałością. Idealna do przestronnych wnętrz w stylu nowoczesnym.",
  },
  {
    id: 3,
    image: kaktus1,
    category: "Kaktusy",
    title: "Kaktus „Malusieńki”",
    price: 34.99,
    oldPrice: 49.99,
    discount: "-30%",
    size: "small",
    description:
      "Uroczy mini kaktus o kulistym kształcie i delikatnych cierniach. Perfekcyjny do małych doniczek na parapetach i półkach. Wymaga minimalnej pielęgnacji - doskonały dla zapracowanych osób. Latem może zakwitnąć małymi, żółtymi kwiatami.",
  },
  {
    id: 4,
    image: kaktus2,
    category: "Kaktusy",
    title: "Kaktus „Królewski»",
    price: 79.99,
    oldPrice: null,
    discount: null,
    size: "medium",
    description:
      "Kaktus kolumnowy o szlachetnym wyglądzie i regularnych żeberkach. Jego pionowy pokrój dodaje elegancji każdemu wnętrzu. Bardzo wolno rośnie, co czyni go rośliną długowieczną. Idealny do minimalistycznych aranżacji.",
  },
  {
    id: 5,
    image: iglica1,
    category: "Iglice",
    title: "Iglice „Zielona Piękność»",
    price: 65.5,
    oldPrice: null,
    discount: null,
    size: "medium",
    description:
      "Iglice o miękkich, zielonych igłach tworzących gęstą koronę. Wydziela przyjemny, leśny zapach. Doskonale oczyszcza powietrze i nawilża pomieszczenie. Łatwa w uprawie, toleruje różne warunki świetlne.",
  },
  {
    id: 6,
    image: iglica2,
    category: "Iglice",
    title: "Iglice „Miniatura»",
    price: 45.0,
    oldPrice: 55.0,
    discount: "-18%",
    size: "small",
    description:
      "Miniaturowa odmiana iglicy o zwartym, kulistym pokroju. Idealna do tworzenia kompozycji roślinnych i małych ogrodów w szkle. Wolno rosnąca, zachowuje kształt przez wiele lat. Doskonała do mieszkań i biur.",
  },
  {
    id: 7,
    image: zamiokulkas1,
    category: "Zamiokulkasy",
    title: "Zamiokulkas „Elegancki»",
    price: 89.99,
    oldPrice: null,
    discount: null,
    size: "medium",
    description:
      "Zamiokulkas o błyszczących, ciemnozielonych liściach układających się w regularne pióropusze. Znany jako 'żelazna roślina' ze względu na wyjątkową wytrzymałość. Doskonale radzi sobie w słabym świetle i przy nieregularnym podlewaniu.",
  },
  {
    id: 8,
    image: zamiokulkas2,
    category: "Zamiokulkasy",
    title: "Zamiokulkas „Pnący»",
    price: 120.0,
    oldPrice: 150.0,
    discount: "-20%",
    size: "large",
    description:
      "Duży okaz zamiokulkasa o pnącym pokroju. Długie łodygi z mięsistymi liśćmi doskonale prezentują się w wiszących doniczkach. Bardzo efektywny w oczyszczaniu powietrza. Minimalne wymagania pielęgnacyjne.",
  },
  {
    id: 9,
    image: sukulent1,
    category: "Sukulenty",
    title: "Aloes Wera „Piękny»",
    price: 45.5,
    oldPrice: null,
    discount: null,
    size: "small",
    description:
      "Aloes o grubych, mięsistych liściach wypełnionych leczniczym żelem. Nie tylko zdobi, ale też ma właściwości lecznicze - idealny do domowej apteczki. Łatwy w uprawie, preferuje słoneczne stanowiska. Doskonały do sypialni.",
  },
  {
    id: 10,
    image: sukulent2,
    category: "Sukulenty",
    title: "Sukulent „Kolorowy»",
    price: 35.99,
    oldPrice: 42.99,
    discount: "-16%",
    size: "small",
    description:
      "Kolorowy sukulent o rozetowym pokroju i liściach w odcieniach zieleni, różu i fioletu. Pod wpływem światła liście intensywnie się wybarwiają. Idealny do małych kompozycji i terrariów. Bardzo łatwy w pielęgnacji.",
  },
  {
    id: 11,
    image: monstera1,
    category: "Monstery",
    title: "Monstera „Deliciosa»",
    price: 129.99,
    oldPrice: 159.99,
    discount: "-19%",
    size: "large",
    description:
      "Klasyczna monstera o ogromnych, perforowanych liściach. Ikona stylu jungle, niezwykle modna w nowoczesnych wnętrzach. Szybko rośnie, tworząc imponujące pnącza. Wymaga więcej uwagi, ale efekt jest spektakularny.",
  },
  {
    id: 12,
    image: monstera2,
    category: "Monstery",
    title: "Monstera „Adansonii»",
    price: 95.0,
    oldPrice: null,
    discount: null,
    size: "medium",
    description:
      "Monstera o mniejszych, sercowatych liściach z licznymi okienkami. Doskonała do wiszących doniczek lub pnączy po podporach. Bardzo dekoracyjna, nadaje wnętrzom tropikalny charakter. Łatwiejsza w uprawie niż większe odmiany.",
  },
];

export const categories: Category[] = [
  { id: "Fikusy", name: "Fikusy" },
  { id: "Kaktusy", name: "Kaktusy" },
  { id: "Iglice", name: "Iglice" },
  { id: "Zamiokulkasy", name: "Zamiokulkasy" },
  { id: "Sukulenty", name: "Sukulenty" },
  { id: "Monstery", name: "Monstery" },
];

export const sizes: Size[] = [
  { id: "small", name: "Mały" },
  { id: "medium", name: "Średni" },
  { id: "large", name: "Duży" },
];

export const usePlants = () => {
  return {
    allPlants: ref<Plant[]>([...allPlants]),
    categories: ref<Category[]>([...categories]),
    sizes: ref<Size[]>([...sizes]),
  };
};
