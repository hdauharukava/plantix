<template>
  <div
    v-if="!isLoading"
    class="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8"
  >
    <div class="w-full max-w-5xl mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h1
            class="font-poppins font-bold text-2xl md:text-3xl text-[#1e1e1e]"
          >
            Katalog roślin
          </h1>
          <p class="text-gray-600 mt-2">
            Znajdź idealną roślinę dla swojego domu
          </p>
        </div>
        <button
          @click="isFilterOpen = !isFilterOpen"
          class="lg:hidden border-1 border-[#90a88c] text-[#90a88c] hover:border-[#799573] hover:text-[#799573] active:border-[#647e5e] active:text-[#647e5e] text-sm rounded-full px-4 py-1 md:py-2 md:px-6 transition-colors font-bold flex items-center justify-center space-x-2 ml-4"
        >
          <span>Filtry</span>
          <svg
            class="w-4 h-4 transition-transform duration-200"
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
    </div>

    <div class="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
      <div
        class="lg:w-1/4 transition-all duration-300 overflow-hidden lg:overflow-visible"
        :class="isFilterOpen ? 'max-h-[800px]' : 'max-h-0 lg:max-h-none'"
      >
        <div class="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-8">
          <h2 class="font-poppins font-bold text-lg mb-6">Filtry</h2>

          <div class="mb-6">
            <h3 class="font-semibold text-sm text-gray-700 mb-3">Kategorie</h3>
            <div class="space-y-2">
              <label
                v-for="category in categories"
                :key="category.id"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="category.id"
                  v-model="selectedCategories"
                  class="custom-checkbox h-4 w-4 rounded border-gray-300 focus:ring-[#90a88c] focus:ring-2 focus:ring-offset-0"
                />
                <span class="text-sm">{{ category.name }}</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-semibold text-sm text-gray-700 mb-3">Cena</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Od"
                  v-model="priceRange.min"
                  class="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#90a88c] focus:border-[#90a88c]"
                />
                <span class="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Do"
                  v-model="priceRange.max"
                  class="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#90a88c] focus:border-[#90a88c]"
                />
              </div>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-semibold text-sm text-gray-700 mb-3">Rozmiar</h3>
            <div class="space-y-2">
              <label
                v-for="size in sizes"
                :key="size.id"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="size.id"
                  v-model="selectedSizes"
                  class="custom-checkbox h-4 w-4 rounded border-gray-300 focus:ring-[#90a88c] focus:ring-2 focus:ring-offset-0"
                />
                <span class="text-sm">{{ size.name }}</span>
              </label>
            </div>
          </div>

          <div>
            <button
              @click="resetFilters"
              class="flex-1 border border-gray-300 hover:border-gray-400 active:border-gray-500 text-gray-300 hover:text-gray-400 active:text-gray-500 text-sm rounded-full px-4 py-1 transition-colors"
            >
              Wyczyść
            </button>
          </div>
        </div>
      </div>

      <div class="lg:w-3/4">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        >
          <p class="text-gray-600 text-sm">
            Znaleziono {{ filteredPlants.length }} produktów
          </p>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">Sortuj według:</span>
            <select
              v-model="sortBy"
              class="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#90a88c] focus:border-[#90a88c]"
            >
              <option value="name">Nazwa A-Z</option>
              <option value="name-desc">Nazwa Z-A</option>
              <option value="price">Cena rosnąco</option>
              <option value="price-desc">Cena malejąco</option>
            </select>
          </div>
        </div>

        <div v-if="filteredPlants.length > 0" class="grid grid-cols-3 gap-4">
          <PlantCard
            v-for="plant in filteredPlants"
            :key="plant.id"
            :id="plant.id"
            :image="plant.image"
            :category="plant.category"
            :title="plant.title"
            :price="plant.price"
            :old-price="plant.oldPrice ?? undefined"
            :discount="plant.discount ?? undefined"
            :size="plant.size"
          />
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">
            Nie znaleziono roślin spełniających kryteria
          </p>
          <button
            @click="resetFilters"
            class="mt-4 bg-[#90a88c] hover:bg-[#799573] text-white rounded-full px-4 py-2 text-sm cursor-pointer"
          >
            Wyczyść filtry
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie katalogu...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PlantCard from "@/components/PlantCard.vue";
import { allPlants, categories, sizes } from "@/composables/usePlants";
import { usePlantFilters } from "@/composables/usePlantFilters";

const isFilterOpen = ref(false);
const isLoading = ref(false);

const plants = ref(allPlants);

const {
  selectedCategories,
  selectedSizes,
  priceRange,
  sortBy,
  filteredPlants,
  hasActiveFilters,
  resetFilters,
} = usePlantFilters(plants);
</script>

<style scoped>
.custom-checkbox {
  accent-color: #90a88c;
}

.custom-checkbox:checked {
  background-color: #90a88c;
  border-color: #90a88c;
}

.custom-checkbox:focus {
  outline: 2px solid #90a88c;
  outline-offset: 2px;
}
</style>
