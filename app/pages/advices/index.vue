<template>
  <div
    v-if="!isLoading"
    class="flex flex-col items-center px-8 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8"
  >
    <div class="w-full max-w-5xl mb-6 md:mb-8">
      <div>
        <h1
          class="font-poppins font-bold text-xl md:text-2xl lg:text-3xl text-[#1e1e1e]"
        >
          Porady dotyczące pielęgnacji
        </h1>
        <p class="text-gray-600 text-sm md:text-base mt-1 md:mt-2">
          Dowiedz się, jak dbać o swoje rośliny domowe. Przewodник dla
          początkujących i zaawansowanych.
        </p>
      </div>
    </div>

    <div class="w-full max-w-5xl lg:hidden mb-4">
      <button
        @click="isFilterOpen = !isFilterOpen"
        class="w-full flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-200"
      >
        <div class="flex items-center space-x-3">
          <svg
            class="w-5 h-5 text-[#90a88c]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <span class="font-medium text-gray-900">Filtry i kategorie</span>
        </div>
        <svg
          class="w-5 h-5 text-gray-500 transition-transform duration-200"
          :class="{ 'rotate-180': isFilterOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>

    <div class="w-full max-w-5xl">
      <div class="flex flex-col lg:flex-row gap-6 md:gap-8 mb-8 md:mb-12">
        <div
          class="lg:w-1/4 transition-all duration-300 overflow-hidden lg:overflow-visible"
          :class="
            isFilterOpen
              ? 'max-h-[800px] mb-6'
              : 'max-h-0 lg:max-h-none lg:mb-0'
          "
        >
          <div
            class="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:sticky lg:top-8"
          >
            <div class="flex items-center justify-between mb-4 md:mb-6">
              <h2 class="font-poppins font-bold text-lg">Kategorie porad</h2>
              <button
                v-if="selectedCategory"
                @click="clearFilter"
                class="text-sm text-[#90a88c] hover:text-[#799573]"
              >
                Wyczyść
              </button>
            </div>

            <div class="space-y-1 md:space-y-2">
              <button
                @click="selectCategory('')"
                class="w-full flex items-center p-2 md:p-3 rounded-lg transition-all duration-200 text-left"
                :class="{
                  'bg-[#90a88c]/10 text-[#90a88c] font-semibold':
                    !selectedCategory,
                  'hover:bg-gray-50 text-gray-700': selectedCategory,
                }"
              >
                <svg
                  class="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span class="text-sm md:text-base">Wszystkie kategorie</span>
                <span
                  class="ml-auto text-xs px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-100 rounded-full"
                >
                  {{ allAdvice.length }}
                </span>
              </button>

              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category.id)"
                class="w-full flex items-center justify-between p-2 md:p-3 rounded-lg transition-all duration-200 text-left"
                :class="{
                  'bg-[#90a88c]/10 text-[#90a88c] font-semibold':
                    selectedCategory === category.id,
                  'hover:bg-gray-50 text-gray-700':
                    selectedCategory !== category.id,
                }"
              >
                <div class="flex items-center space-x-2 md:space-x-3">
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L3 9v11h6v-7h6v7h6V9l-9-7z" />
                  </svg>
                  <span class="text-sm md:text-base">{{ category.name }}</span>
                </div>
                <span
                  class="text-xs px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-100 rounded-full"
                >
                  {{ getAdviceCount(category.id) }}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="lg:w-3/4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 md:gap-4"
          >
            <h2
              class="font-poppins font-bold text-lg md:text-xl text-[#1e1e1e]"
            >
              {{
                selectedCategory
                  ? `Porady dla: ${getCategoryName(selectedCategory)}`
                  : "Wszystkie porady"
              }}
              <span
                v-if="filteredAdvice.length > 0"
                class="text-gray-600 font-normal text-xs md:text-sm ml-1 md:ml-2"
              >
                ({{ filteredAdvice.length }})
              </span>
            </h2>

            <div class="flex items-center space-x-2 md:space-x-3">
              <span class="text-xs md:text-sm text-gray-600">Sortuj:</span>
              <select
                v-model="sortBy"
                class="border border-gray-300 rounded px-2.5 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#90a88c] focus:border-[#90a88c]"
              >
                <option value="easy-first">Najpierw łatwe</option>
                <option value="hard-first">Najpierw trudne</option>
                <option value="alphabetical">Alfabetycznie A-Z</option>
                <option value="alphabetical-desc">Alfabetycznie Z-A</option>
              </select>
            </div>
          </div>

          <div
            v-if="filteredAdvice.length > 0"
            class="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
          >
            <div
              v-for="advice in filteredAdvice"
              :key="advice.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
            >
              <div class="h-36 sm:h-40 md:h-48 overflow-hidden flex-shrink-0">
                <img
                  :src="advice.image"
                  :alt="advice.title"
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div class="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-2 md:mb-3">
                  <h3
                    class="font-semibold text-gray-900 text-xs sm:text-sm md:text-base line-clamp-1 pr-2"
                  >
                    {{ advice.title }}
                  </h3>
                  <span
                    class="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap flex-shrink-0"
                    :class="getDifficultyClass(advice.difficulty)"
                  >
                    {{ advice.difficulty }}
                  </span>
                </div>

                <div class="mb-2 md:mb-4">
                  <span
                    class="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded"
                  >
                    {{ advice.plantCategory }}
                  </span>
                </div>

                <div class="space-y-1.5 sm:space-y-2 mb-3 md:mb-4">
                  <div class="flex items-start text-gray-600">
                    <svg
                      class="w-3 h-3 sm:w-4 sm:h-4 text-[#90a88c] mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6zm0 2h12l1.5 2.5L18 8H6l-1.5-2.5L6 4zm0 4v10h12V8H6z"
                      />
                    </svg>
                    <span class="text-xs sm:text-sm line-clamp-2">{{
                      advice.light
                    }}</span>
                  </div>
                  <div class="flex items-start text-gray-600">
                    <svg
                      class="w-3 h-3 sm:w-4 sm:h-4 text-[#90a88c] mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M16 6c0-2.21-1.79-4-4-4S8 3.79 8 6c0 1.86 1.28 3.41 3 3.86V10H6v10h12V10h-5v-.14c1.72-.45 3-2 3-3.86zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                      />
                    </svg>
                    <span class="text-xs sm:text-sm line-clamp-2">{{
                      advice.watering
                    }}</span>
                  </div>
                </div>

                <div class="mb-3 md:mb-4 flex-grow">
                  <p
                    class="text-[10px] sm:text-xs font-medium text-gray-700 mb-1"
                  >
                    Kluczowe wskazówki:
                  </p>
                  <ul
                    class="text-[10px] sm:text-xs text-gray-600 space-y-0.5 sm:space-y-1"
                  >
                    <li
                      v-for="(tip, index) in advice.tips.slice(0, 2)"
                      :key="index"
                      class="flex items-start"
                    >
                      <svg
                        class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#90a88c] mr-1 sm:mr-1.5 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="line-clamp-2">{{ tip }}</span>
                    </li>
                  </ul>
                </div>

                <div class="mt-auto pt-4">
                  <NuxtLink
                    :to="`/advices/${advice.id}`"
                    class="block w-full text-center border border-[#90a88c] active:bg-[#647e5e] text-[#90a88c] hover:bg-[#90a88c] hover:text-white rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm transition-colors duration-200"
                  >
                    Czytaj więcej
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="text-center py-8 md:py-12 bg-white rounded-lg border border-gray-200"
          >
            <div class="flex justify-center mb-3 md:mb-4">
              <svg
                class="w-12 h-12 md:w-16 md:h-16 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L3 9v11h6v-7h6v7h6V9l-9-7z" />
              </svg>
            </div>
            <p class="text-gray-500 text-base md:text-lg mb-2">
              Nie znaleziono porad spełniających kryteria
            </p>
            <button
              @click="clearFilter"
              class="mt-3 md:mt-4 bg-[#90a88c] hover:bg-[#799573] text-white rounded-full px-4 py-2 text-sm cursor-pointer"
            >
              Wyczyść wszystkie filtry
            </button>
          </div>
        </div>
      </div>

      <div id="faq" class="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
        <div class="max-w-5xl mx-auto">
          <h2
            class="font-poppins font-bold text-lg md:text-xl text-[#1e1e1e] mb-4 md:mb-6"
          >
            Często zadawane pytania (FAQ)
          </h2>

          <div class="space-y-3 md:space-y-4">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:border-gray-300 transition-colors"
            >
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-[#90a88c] text-white rounded-full flex items-center justify-center mr-3 md:mr-4"
                >
                  <span class="font-semibold text-xs md:text-sm">?</span>
                </div>
                <div>
                  <h3
                    class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2"
                  >
                    {{ faq.question }}
                  </h3>
                  <p class="text-gray-600 text-xs md:text-sm">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-20"></div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie porad...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { CareAdvice } from "@/types/advice";

import fikus1 from "@/assets/plants/fikus2.png";
import kaktus1 from "@/assets/plants/kaktus.png";
import iglica1 from "@/assets/plants/iglica.png";
import zamiokulkas1 from "@/assets/plants/zamiokulkas.png";
import sukulent1 from "@/assets/plants/sukulent.png";
import monstera1 from "@/assets/plants/monstera.png";

const isLoading = ref(false);

const categories = ref([
  { id: "Fikusy", name: "Fikusy" },
  { id: "Kaktusy", name: "Kaktusy" },
  { id: "Iglice", name: "Iglice" },
  { id: "Zamiokulkasy", name: "Zamiokulkasy" },
  { id: "Sukulenty", name: "Sukulenty" },
  { id: "Monstery", name: "Monstery" },
]);

const selectedCategory = ref<string>("");
const selectedDifficulty = ref<string>("all");
const sortBy = ref<
  "easy-first" | "hard-first" | "alphabetical" | "alphabetical-desc"
>("easy-first");
const isFilterOpen = ref(false);

const allAdvice = ref<CareAdvice[]>([
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
    tips: [
      "Unikaj przeciągów",
      "Przesadzaj co 2-3 lata",
      "Regularnie przecieraj liście",
    ],
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
    tips: [
      "Zimą zapewnij okres spoczynku",
      "Unikaj przelania",
      "Sadź w doniczkach z otworami",
    ],
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
    tips: [
      "Lubi zraszanie liści",
      "Unikaj stojącej wody",
      "Regularnie obracaj dla równomiernego wzrostu",
    ],
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
    tips: [
      "Bardzo wytrzymała roślina",
      "Idealna dla początkujących",
      "Trująca dla zwierząt",
    ],
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
    tips: [
      "Lubi wysoką wilgotność",
      "Potrzebuje podpory do pnączy",
      "Regularnie czyść liście",
    ],
    image: monstera1,
  },
]);

// FAQ
interface FAQ {
  question: string;
  answer: string;
}

const faqs = ref<FAQ[]>([
  {
    question: "Jak często podlewać rośliny?",
    answer:
      "Częstotliwość podlewania zależy od gatunku rośliny, pory roku i warunków w pomieszczeniu. Zawsze sprawdzaj wilgotność gleby przed podlaniem.",
  },
  {
    question: "Co zrobić, gdy liście żółkną?",
    answer:
      "Żółknięcie liści może oznaczać przelanie, niedобór składników odżywczych lub zbyt mało światła. Dostosuj pielęgnację do potrzeb rośliny.",
  },
  {
    question: "Kiedy przesadzać rośliny?",
    answer:
      "Rośliny przesadzamy wiosną, gdy korzenie przerastają doniczkę. Zazwyczaj co 1-3 lat w zależności od tempa wzrostu.",
  },
  {
    question: "Jakie rośliny są najlepsze dla początkujących?",
    answer:
      "Dla początkujących polecamy zamiokulkasy, sansewierie, sukulenty i некоторые gatunki fikusów - są wytrzymałe i wybaczają błędy w pielęgnacji.",
  },
  {
    question: "Czy wszystkie rośliny potrzebują dużo światła?",
    answer:
      "Nie, zapotrzebowanie na światło różni się w zależności od gatunku. Niektóre rośliny (jak zamiokulkas) dobrze radzą sobie w półcieniu.",
  },
]);

const filteredAdvice = computed(() => {
  let advice = [...allAdvice.value];

  if (selectedCategory.value) {
    advice = advice.filter(
      (a: CareAdvice) => a.plantCategory === selectedCategory.value,
    );
  }

  if (selectedDifficulty.value !== "all") {
    advice = advice.filter(
      (a: CareAdvice) => a.difficulty === selectedDifficulty.value,
    );
  }

  if (sortBy.value === "easy-first") {
    const order: Record<string, number> = { łatwa: 1, średnia: 2, trudna: 3 };
    advice.sort((a: CareAdvice, b: CareAdvice) => {
      return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
    });
  } else if (sortBy.value === "hard-first") {
    const order: Record<string, number> = { łatwa: 3, średnia: 2, trudna: 1 };
    advice.sort((a: CareAdvice, b: CareAdvice) => {
      return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
    });
  } else if (sortBy.value === "alphabetical") {
    advice.sort((a: CareAdvice, b: CareAdvice) =>
      a.title.localeCompare(b.title),
    );
  } else if (sortBy.value === "alphabetical-desc") {
    advice.sort((a: CareAdvice, b: CareAdvice) =>
      b.title.localeCompare(a.title),
    );
  }

  return advice;
});

const selectCategory = (categoryId: string) => {
  selectedCategory.value =
    selectedCategory.value === categoryId ? "" : categoryId;
};

const clearFilter = () => {
  selectedCategory.value = "";
  selectedDifficulty.value = "all";
};

const getAdviceCount = (categoryId: string) => {
  return allAdvice.value.filter(
    (a: CareAdvice) => a.plantCategory === categoryId,
  ).length;
};

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : categoryId;
};

const getDifficultyClass = (difficulty: string) => {
  const classes: Record<string, string> = {
    łatwa: "bg-green-100 text-green-800",
    średnia: "bg-yellow-100 text-yellow-800",
    trudna: "bg-red-100 text-red-800",
  };
  return classes[difficulty] || "bg-gray-100 text-gray-800";
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
