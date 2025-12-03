// composables/usePlants.ts
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

// Явно указываем тип Plant
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
