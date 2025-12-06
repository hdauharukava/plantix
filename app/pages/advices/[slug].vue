<template>
  <div v-if="advice" class="min-h-screen bg-gray-50">
    <!-- Навигация -->
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

    <!-- Контент -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Заголовок -->
        <div class="mb-8">
          <div class="flex items-center space-x-3 mb-4">
            <span
              class="text-xs px-3 py-1 rounded-full"
              :class="getDifficultyClass(advice.difficulty)"
            >
              {{ advice.difficulty }}
            </span>
            <span class="text-sm text-gray-600">{{ advice.plantCategory }}</span>
          </div>
          <h1 class="font-poppins font-bold text-3xl md:text-4xl text-[#1e1e1e] mb-4">
            {{ advice.title }}
          </h1>
          <p class="text-gray-600">Kompletny przewodnik pielęgnacyjny</p>
        </div>

        <!-- Основной контент в две колонки -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Левая колонка: Изображение и основные требования -->
          <div class="lg:col-span-1">
            <!-- Изображение -->
            <div class="rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                :src="advice.image"
                :alt="advice.title"
                class="w-full h-64 object-cover"
              />
            </div>

            <!-- Карточка с основными требованиями -->
            <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 class="font-semibold text-lg text-gray-900 mb-4">Podstawowe wymagania</h3>
              
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-[#90a88c]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6zm0 2h12l1.5 2.5L18 8H6l-1.5-2.5L6 4zm0 4v10h12V8H6z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Światło</p>
                    <p class="font-medium text-gray-900">{{ advice.light }}</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-[#90a88c]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 6c0-2.21-1.79-4-4-4S8 3.79 8 6c0 1.86 1.28 3.41 3 3.86V10H6v10h12V10h-5v-.14c1.72-.45 3-2 3-3.86zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Podlewanie</p>
                    <p class="font-medium text-gray-900">{{ advice.watering }}</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-[#90a88c]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 mb-1">Temperatura</p>
                    <p class="font-medium text-gray-900">{{ advice.temperature }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая колонка: Детальная информация -->
          <div class="lg:col-span-2">
            <!-- Таблица ухода -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div class="p-6 border-b border-gray-200">
                <h2 class="font-poppins font-semibold text-xl text-[#1e1e1e]">Szczegółowy przewodnik pielęgnacyjny</h2>
              </div>
              
              <div class="divide-y divide-gray-100">
                <div class="p-6">
                  <h3 class="font-semibold text-gray-900 mb-2">Gleba</h3>
                  <p class="text-gray-600">{{ advice.soil }}</p>
                </div>
                
                <div class="p-6">
                  <h3 class="font-semibold text-gray-900 mb-2">Wilgotność</h3>
                  <p class="text-gray-600">{{ advice.humidity }}</p>
                </div>
                
                <div class="p-6">
                  <h3 class="font-semibold text-gray-900 mb-2">Nawożenie</h3>
                  <p class="text-gray-600">{{ advice.fertilization }}</p>
                </div>
                
                <div class="p-6">
                  <h3 class="font-semibold text-gray-900 mb-2">Przycinanie</h3>
                  <p class="text-gray-600">{{ advice.pruning }}</p>
                </div>
                
                <div class="p-6">
                  <h3 class="font-semibold text-gray-900 mb-2">Szkodniki</h3>
                  <p class="text-gray-600">{{ advice.pests }}</p>
                </div>
              </div>
            </div>

            <!-- Полезные советы -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
              <h3 class="font-poppins font-semibold text-xl text-[#1e1e1e] mb-4">Praktyczne wskazówki</h3>
              
              <ul class="space-y-3">
                <li
                  v-for="(tip, index) in advice.tips"
                  :key="index"
                  class="flex items-start"
                >
                  <div class="flex-shrink-0 w-6 h-6 bg-[#90a88c] text-white rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-gray-700">{{ tip }}</span>
                </li>
              </ul>
            </div>

            <!-- Кнопки действий -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink
                to="/porady-dotyczace-pielegnacji"
                class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Wróć do porad
              </NuxtLink>
              
              <NuxtLink
                :to="`/catalog?category=${advice.plantCategory}`"
                class="inline-flex items-center justify-center px-6 py-3 bg-[#90a88c] hover:bg-[#799573] text-white rounded-lg transition-colors duration-200"
              >
                Zobacz rośliny z tej kategorii
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Загрузка -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"></div>
      <p class="text-gray-600">Ładowanie porady...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CareAdvice } from '@/types/advice'

const route = useRoute()
const advice = ref<CareAdvice | null>(null)

// Импортируем изображения
import fikus1 from '@/assets/plants/fikus2.png'

onMounted(() => {
  // Заглушка данных
  const adviceData: CareAdvice[] = [
    {
      id: 1,
      plantCategory: 'Fikusy',
      title: 'Jak dbać o Fikusa?',
      slug: 'jak-dbac-o-fikusa',
      difficulty: 'średnia',
      light: 'Rozproszone światło, unikać bezpośredniego słońca',
      watering: 'Umiarkowane podlewanie, gdy wierzchnia warstwa gleby przeschnie',
      soil: 'Przepuszczalna ziemia do roślin doniczkowych',
      temperature: '18-24°C',
      humidity: 'Średnia, 40-50%',
      fertilization: 'Co 2 tygodnie wiosną i latem',
      pruning: 'Przycinanie wiosną dla kształtu',
      pests: 'Przędziorki, mszyce',
      tips: [
        'Unikaj przeciągów',
        'Przesadzaj co 2-3 lata',
        'Regularnie przecieraj liście'
      ],
      image: fikus1
    }
  ]
  
  advice.value = adviceData.find(a => a.slug === route.params.slug) || null
})

const getDifficultyClass = (difficulty: string) => {
  const classes: Record<string, string> = {
    'łatwa': 'bg-green-100 text-green-800',
    'średnia': 'bg-yellow-100 text-yellow-800',
    'trudna': 'bg-red-100 text-red-800'
  }
  return classes[difficulty] || 'bg-gray-100 text-gray-800'
}
</script>