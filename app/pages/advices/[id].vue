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
          <p class="text-gray-600 text-sm md:text-base">
            Kompletny przewodnik pielęgnacyjny
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div class="lg:col-span-1">
            <div
              class="hidden lg:block rounded-2xl overflow-hidden shadow-lg mb-6"
            >
              <img
                :src="advice.image"
                :alt="advice.title"
                class="w-full h-64 object-cover"
              />
            </div>

            <div class="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-4 md:mb-6">
              <h3
                class="font-semibold text-base md:text-lg text-gray-900 mb-3 md:mb-4"
              >
                Podstawowe wymagania
              </h3>

              <div class="space-y-3 md:space-y-4">
                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-lg flex items-center justify-center mr-2 md:mr-3"
                  >
                    <img
                      src="@/assets/icons/Sun.svg"
                      alt="Światło"
                      class="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p class="text-xs md:text-sm text-gray-500 mb-1">Światło</p>
                    <p class="font-medium text-gray-900 text-sm md:text-base">
                      {{ advice.light }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-2 md:mr-3"
                  >
                    <img
                      src="@/assets/icons/Water.svg"
                      alt="Podlewanie"
                      class="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p class="text-xs md:text-sm text-gray-500 mb-1">
                      Podlewanie
                    </p>
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
                      alt="Temperatura"
                      class="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p class="text-xs md:text-sm text-gray-500 mb-1">
                      Temperatura
                    </p>
                    <p class="font-medium text-gray-900 text-sm md:text-base">
                      {{ advice.temperature }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div
              class="bg-white rounded-xl shadow-sm overflow-hidden mb-4 md:mb-8"
            >
              <div class="p-4 md:p-6 border-b border-gray-200">
                <h2
                  class="font-poppins font-semibold text-lg md:text-xl text-[#1e1e1e]"
                >
                  Szczegółowy przewodnik pielęgnacyjny
                </h2>
              </div>

              <div class="divide-y divide-gray-100">
                <div class="p-4 md:p-6">
                  <h3
                    class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2"
                  >
                    Gleba
                  </h3>
                  <p class="text-gray-600 text-sm md:text-base">
                    {{ advice.soil }}
                  </p>
                </div>

                <div class="p-4 md:p-6">
                  <h3
                    class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2"
                  >
                    Wilgotność
                  </h3>
                  <p class="text-gray-600 text-sm md:text-base">
                    {{ advice.humidity }}
                  </p>
                </div>

                <div class="p-4 md:p-6">
                  <h3
                    class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2"
                  >
                    Nawożenie
                  </h3>
                  <p class="text-gray-600 text-sm md:text-base">
                    {{ advice.fertilization }}
                  </p>
                </div>

                <div class="p-4 md:p-6">
                  <h3
                    class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2"
                  >
                    Przycinanie
                  </h3>
                  <p class="text-gray-600 text-sm md:text-base">
                    {{ advice.pruning }}
                  </p>
                </div>

                <div class="p-4 md:p-6">
                  <h3
                    class="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2"
                  >
                    Szkodniki
                  </h3>
                  <p class="text-gray-600 text-sm md:text-base">
                    {{ advice.pests }}
                  </p>
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
                  <span class="text-gray-700 text-sm md:text-base">{{
                    tip
                  }}</span>
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
import { ref } from "vue"
import { useAdviceData } from "@/composables/useAdviceData"
import type { CareAdvice } from "@/composables/useAdviceData"

const route = useRoute()
const { getAdviceById } = useAdviceData()

const advice = ref<CareAdvice | null>(null)

const id = parseInt(route.params.id as string)
advice.value = getAdviceById(id)

if (!advice.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Porada nie znaleziona",
  })
}

const getDifficultyClass = (difficulty: string) => {
  const classes: Record<string, string> = {
    łatwa: "bg-green-100 text-green-800",
    średnia: "bg-yellow-100 text-yellow-800",
    trudna: "bg-red-100 text-red-800",
  }
  return classes[difficulty] || "bg-gray-100 text-gray-800"
}
</script>