<template>
  <div v-if="advice" class="min-h-screen bg-gray-50">
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center space-x-2 text-sm">
          <NuxtLink to="/advices" class="text-gray-600 hover:text-[#90a88c]">
            Porady pielęgnacyjne
          </NuxtLink>
          <span class="text-gray-400">/</span>
          <span class="text-gray-900 font-medium">{{ advice.title }}</span>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-4 py-4 md:py-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-6 md:mb-8">
          <div class="flex items-center space-x-3 mb-3 md:mb-4">
            <span
              class="text-xs px-3 py-1 rounded-full"
              :class="getDifficultyClass(advice.difficulty)"
            >
              {{ advice.difficulty }}
            </span>
            <span class="text-sm text-gray-600">{{
              advice.plantCategory
            }}</span>
          </div>
          <h1
            class="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl text-[#1e1e1e] mb-3 md:mb-4"
          >
            {{ advice.title }}
          </h1>
          <p class="text-gray-600 text-sm md:text-base">Kompletny przewodnik pielęgnacyjny</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div class="lg:col-span-1">

            <div class="hidden lg:block rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                :src="advice.image"
                :alt="advice.title"
                class="w-full h-64 object-cover"
              />
            </div>

            <div class="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-4 md:mb-6">
              <h3 class="font-semibold text-base md:text-lg text-gray-900 mb-3 md:mb-4">
                Podstawowe wymagania
              </h3>

              <div class="space-y-3 md:space-y-4">
                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-lg flex items-center justify-center mr-2 md:mr-3"
                  >
                    <img
                      src="@/assets/icons/Sun.svg"
                      alt="Instagram"
                      class="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p class="text-xs md:text-sm text-gray-500 mb-1">Światło</p>
                    <p class="font-medium text-gray-900 text-sm md:text-base">{{ advice.light }}</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-2 md:mr-3"
                  >
                    <img
                      src="@/assets/icons/Water.svg"
                      alt="Instagram"
                      class="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p class="text-xs md:text-sm text-gray-500 mb-1">Podlewanie</p>
                    <p class="font-medium text-gray-900 text-sm md:text-base">
                      {{ advice.watering }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-yellow-50 rounded-lg flex items-center justify-center mr-2 md:mr-3"
                  >
                    <img
                      src="@/assets/icons/Temperature.svg"
                      alt="Instagram"
                      class="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p class="text-xs md:text-sm text-gray-500 mb-1">Temperatura</p>
                    <p class="font-medium text-gray-900 text-sm md:text-base">
                      {{ advice.temperature }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-4 md:mb-8">
              <div class="p-4 md:p-6 border-b border-gray-200">
                <h2 class="font-poppins font-semibold text-lg md:text-xl text-[#1e1e1e]">
                  Szczegółowy przewodnik pielęgnacyjny
                </h2>
              </div>

              <div class="divide-y divide-gray-100">
                <div class="p-4 md:p-6">
                  <h3 class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">Gleba</h3>
                  <p class="text-gray-600 text-sm md:text-base">{{ advice.soil }}</p>
                </div>

                <div class="p-4 md:p-6">
                  <h3 class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">Wilgotność</h3>
                  <p class="text-gray-600 text-sm md:text-base">{{ advice.humidity }}</p>
                </div>

                <div class="p-4 md:p-6">
                  <h3 class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">Nawożenie</h3>
                  <p class="text-gray-600 text-sm md:text-base">{{ advice.fertilization }}</p>
                </div>

                <div class="p-4 md:p-6">
                  <h3 class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">Przycinanie</h3>
                  <p class="text-gray-600 text-sm md:text-base">{{ advice.pruning }}</p>
                </div>

                <div class="p-4 md:p-6">
                  <h3 class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">Szkodniki</h3>
                  <p class="text-gray-600 text-sm md:text-base">{{ advice.pests }}</p>
                </div>
              </div>
            </div>

            <div
              class="border border-[#90a88c] border-2 rounded-xl p-4 md:p-6 mb-4 md:mb-8"
            >
              <h3
                class="font-poppins font-semibold text-lg md:text-xl text-[#1e1e1e] mb-3 md:mb-4"
              >
                Praktyczne wskazówki
              </h3>

              <ul class="space-y-2 md:space-y-3">
                <li
                  v-for="(tip, index) in advice.tips"
                  :key="index"
                  class="flex items-start"
                >
                  <div
                    class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-[#90a88c] text-white rounded-full flex items-center justify-center mr-2 md:mr-3 mt-0.5"
                  >
                    <svg
                      class="w-2.5 h-2.5 md:w-3 md:h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span class="text-gray-700 text-sm md:text-base">{{ tip }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie porady...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CareAdvice } from "@/types/advice";

import fikus1 from "@/assets/plants/fikus2.png";
import kaktus1 from "@/assets/plants/kaktus.png";
import iglica1 from "@/assets/plants/iglica.png";
import zamiokulkas1 from "@/assets/plants/zamiokulkas.png";
import sukulent1 from "@/assets/plants/sukulent.png";
import monstera1 from "@/assets/plants/monstera.png";

const route = useRoute();

const adviceData: CareAdvice[] = [
  {
    id: 1,
    plantCategory: "Fikusy",
    title: "Jak dbać o Fikusa?",
    slug: "jak-dbac-o-fikusa",
    difficulty: "średnia",
    light: "Rozproszone światło, unikać bezpośredniego słońca",
    watering: "Umiarkowane podlewanie, gdy wierzchnia warstwa gleby przeschnie",
    soil: "Przepuszczalna ziemia do roślin doniczkowych",
    temperature: "18-24°C",
    humidity: "Średnia, 40-50%",
    fertilization: "Co 2 tygodnie wiosną i latem",
    pruning: "Przycinanie wiosną dla kształtu",
    pests: "Przędziorki, mszyce",
    tips: ["Unikaj przeciągów", "Przesadzaj co 2-3 lata", "Regularnie przecieraj liście"],
    image: fikus1,
  },
  {
    id: 2,
    plantCategory: "Kaktusy",
    title: "Pielęgnacja Kaktusów",
    slug: "pielegnacja-kaktusow",
    difficulty: "łatwa",
    light: "Pełne słońce, minimum 6 godzin dziennie",
    watering: "Rzadkie podlewanie, zimą minimalnie",
    soil: "Specjalistyczne podłoże dla kaktusów",
    temperature: "20-30°C latem, 10-15°C zimą",
    humidity: "Niska",
    fertilization: "Raz w miesiącu w sezonie wegetacyjnym",
    pruning: "Rzadko potrzebne",
    pests: "Wełnowce, tarczniki",
    tips: ["Zimą zapewnij okres spoczynku", "Unikaj przelania", "Sadź w doniczkach z otworami"],
    image: kaktus1,
  },
  {
    id: 3,
    plantCategory: "Iglice",
    title: "Uprawa Iglice w domu",
    slug: "uprawa-iglice-w-domu",
    difficulty: "łatwa",
    light: "Jasne, rozproszone światło",
    watering: "Regularne, utrzymuj wilgotność gleby",
    soil: "Ziemia uniwersalna z dodatkiem piasku",
    temperature: "15-22°C",
    humidity: "Średnia do wysokiej",
    fertilization: "Co 3-4 tygodnie w sezonie",
    pruning: "Wiosenne przycinanie",
    pests: "Przędziorki, wciornastki",
    tips: ["Lubi zraszanie liści", "Unikaj stojącej wody", "Regularnie obracaj dla równomiernego wzrostu"],
    image: iglica1,
  },
  {
    id: 4,
    plantCategory: "Zamiokulkasy",
    title: "Zamiokulkas - żelazna roślina",
    slug: "zamiokulkas-zelazna-roslina",
    difficulty: "łatwa",
    light: "Od cienia do półcienia",
    watering: "Rzadkie, toleruje suszę",
    soil: "Przepuszczalna, lekka mieszanka",
    temperature: "18-26°C",
    humidity: "Niska do średniej",
    fertilization: "Raz na 2 miesiące",
    pruning: "Usuwanie żółtych liści",
    pests: "Rzadko atakowany",
    tips: ["Bardzo wytrzymała roślina", "Idealna dla początkujących", "Trująca dla zwierząt"],
    image: zamiokulkas1,
  },
  {
    id: 5,
    plantCategory: "Sukulenty",
    title: "Sukulenty dla początkujących",
    slug: "sukulenty-dla-poczatkujacych",
    difficulty: "łatwa",
    light: "Jasne, bezpośrednie słońce",
    watering: "Skąpe, dopiero gdy gleba wyschnie",
    soil: "Mieszanka dla sukulentów",
    temperature: "15-25°C",
    humidity: "Niska",
    fertilization: "Raz w sezonie",
    pruning: "Usuwanie uszkodzonych części",
    pests: "Wełnowce, mszyce",
    tips: ["Nie przelewaj!", "Zapewnij drenaż", "Zimą zmniejsz podlewanie"],
    image: sukulent1,
  },
  {
    id: 6,
    plantCategory: "Monstery",
    title: "Monstera - poradnik pielęgnacji",
    slug: "monstera-poradnik-pielegnacji",
    difficulty: "średnia",
    light: "Rozproszone światło",
    watering: "Gdy wierzchnia warstwa gleby przeschnie",
    soil: "Ziemia żyzna, przepuszczalna",
    temperature: "18-27°C",
    humidity: "Wysoka, >60%",
    fertilization: "Co 2 tygodnie w sezonie",
    pruning: "Przycinanie pnączy",
    pests: "Przędziorki, tarczniki",
    tips: ["Lubi wysoką wilgotność", "Potrzebuje podpory do pnączy", "Regularnie czyść liście"],
    image: monstera1,
  },
];

const advice = ref<CareAdvice | null>(null);

const slug = route.params.slug as string;
advice.value = adviceData.find(a => a.slug === slug) || null;

if (!advice.value) {
  throw createError({ 
    statusCode: 404, 
    statusMessage: 'Porada nie znaleziona' 
  });
}

const getDifficultyClass = (difficulty: string) => {
  const classes: Record<string, string> = {
    łatwa: "bg-green-100 text-green-800",
    średnia: "bg-yellow-100 text-yellow-800",
    trudna: "bg-red-100 text-red-800",
  };
  return classes[difficulty] || "bg-gray-100 text-gray-800";
};
</script>