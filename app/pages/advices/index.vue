<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero секция -->
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 py-12 md:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-[#1e1e1e] mb-4">
            Porady dotyczące pielęgnacji
          </h1>
          <p class="text-gray-600 text-lg md:text-xl mb-8">
            Dowiedz się, jak dbać o swoje rośliny domowe. Przewodnik dla początkujących i zaawansowanych.
          </p>
        </div>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Категории растений -->
      <div class="mb-10">
        <h2 class="font-poppins font-semibold text-2xl text-[#1e1e1e] mb-6">
          Wybierz kategorię rośliny
        </h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            class="bg-white rounded-lg p-4 shadow-sm border-2 transition-all duration-200 hover:shadow-md text-center"
            :class="{
              'border-[#90a88c]': selectedCategory === category.id,
              'border-transparent': selectedCategory !== category.id,
              'hover:border-green-100': selectedCategory !== category.id
            }"
          >
            <div class="text-[#90a88c] mb-2">
              <svg class="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 9v11h6v-7h6v7h6V9l-9-7z"/>
              </svg>
            </div>
            <span class="font-medium text-gray-900">{{ category.name }}</span>
            <span class="block text-sm text-gray-500 mt-1">
              {{ getAdviceCount(category.id) }} porad
            </span>
          </button>
        </div>
      </div>

      <!-- Все советы или отфильтрованные -->
      <div>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 class="font-poppins font-semibold text-2xl text-[#1e1e1e]">
            {{ selectedCategory ? `Porady dla ${getCategoryName(selectedCategory)}` : 'Wszystkie porady' }}
          </h2>
          
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-600">Sortuj:</span>
            <select
              v-model="sortBy"
              class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] bg-white"
            >
              <option value="name">Nazwa</option>
              <option value="difficulty">Trudność</option>
            </select>
          </div>
        </div>

        <!-- Сетка советов -->
        <div v-if="filteredAdvice.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="advice in filteredAdvice"
            :key="advice.id"
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <!-- Изображение -->
            <div class="h-48 overflow-hidden">
              <img
                :src="advice.image"
                :alt="advice.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <!-- Контент -->
            <div class="p-6">
              <!-- Заголовок и сложность -->
              <div class="flex justify-between items-start mb-4">
                <h3 class="font-semibold text-lg text-gray-900">{{ advice.title }}</h3>
                <span
                  class="text-xs px-3 py-1 rounded-full"
                  :class="getDifficultyClass(advice.difficulty)"
                >
                  {{ advice.difficulty }}
                </span>
              </div>

              <!-- Краткая информация -->
              <div class="space-y-3 mb-6">
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2 text-[#90a88c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6zm0 2h12l1.5 2.5L18 8H6l-1.5-2.5L6 4zm0 4v10h12V8H6z"/>
                  </svg>
                  <span>{{ advice.light }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2 text-[#90a88c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6c0-2.21-1.79-4-4-4S8 3.79 8 6c0 1.86 1.28 3.41 3 3.86V10H6v10h12V10h-5v-.14c1.72-.45 3-2 3-3.86zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                  <span>{{ advice.watering }}</span>
                </div>
              </div>

              <!-- Ссылка на детали -->
              <NuxtLink
  :to="`/advices/${advice.slug}`"
  class="block w-full text-center bg-[#90a88c] hover:bg-[#799573] text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
>
  Czytaj więcej
</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Нет советов -->
        <div v-else class="text-center py-12">
          <div class="flex justify-center mb-4">
            <svg class="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L3 9v11h6v-7h6v7h6V9l-9-7z"/>
            </svg>
          </div>
          <p class="text-gray-500 text-lg mb-2">Brak porad dla wybranej kategorii</p>
          <button
            @click="clearFilter"
            class="text-[#90a88c] hover:text-[#799573] font-medium underline"
          >
            Pokaż wszystkie porady
          </button>
        </div>
      </div>

      <!-- FAQ секция -->
      <div class="mt-16 pt-8 border-t border-gray-200">
        <h2 class="font-poppins font-semibold text-2xl text-[#1e1e1e] mb-8 text-center">
          Często zadawane pytania
        </h2>
        
        <div class="max-w-3xl mx-auto space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-[#90a88c] text-white rounded-full flex items-center justify-center mr-4">
                <span class="font-semibold">Q</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">{{ faq.question }}</h3>
                <p class="text-gray-600">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CareAdvice } from '@/types/advice'

// Импортируем изображения
import fikus1 from '@/assets/plants/fikus2.png'
import kaktus1 from '@/assets/plants/kaktus.png'
import iglica1 from '@/assets/plants/iglica.png'
import zamiokulkas1 from '@/assets/plants/zamiokulkas.png'
import sukulent1 from '@/assets/plants/sukulent.png'
import monstera1 from '@/assets/plants/monstera.png'

// Временные категории пока не настроен composable
const categories = ref([
  { id: 'Fikusy', name: 'Fikusy' },
  { id: 'Kaktusy', name: 'Kaktusy' },
  { id: 'Iglice', name: 'Iglice' },
  { id: 'Zamiokulkasy', name: 'Zamiokulkasy' },
  { id: 'Sukulenty', name: 'Sukulenty' },
  { id: 'Monstery', name: 'Monstery' },
])

// Состояния
const selectedCategory = ref<string>('')
const sortBy = ref<'name' | 'difficulty'>('name')

// Данные советов по уходу
const allAdvice = ref<CareAdvice[]>([
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
  },
  {
    id: 2,
    plantCategory: 'Kaktusy',
    title: 'Pielęgnacja Kaktusów',
    slug: 'pielegnacja-kaktusow',
    difficulty: 'łatwa',
    light: 'Pełne słońce, minimum 6 godzin dziennie',
    watering: 'Rzadkie podlewanie, zimą minimalnie',
    soil: 'Specjalistyczne podłoże dla kaktusów',
    temperature: '20-30°C latem, 10-15°C zimą',
    humidity: 'Niska',
    fertilization: 'Raz w miesiącu w sezonie wegetacyjnym',
    pruning: 'Rzadko potrzebne',
    pests: 'Wełnowce, tarczniki',
    tips: [
      'Zimą zapewnij okres spoczynku',
      'Unikaj przelania',
      'Sadź w doniczkach z otworami'
    ],
    image: kaktus1
  },
  {
    id: 3,
    plantCategory: 'Iglice',
    title: 'Uprawa Iglice w domu',
    slug: 'uprawa-iglice-w-domu',
    difficulty: 'łatwa',
    light: 'Jasne, rozproszone światło',
    watering: 'Regularne, utrzymuj wilgotność gleby',
    soil: 'Ziemia uniwersalna z dodatkiem piasku',
    temperature: '15-22°C',
    humidity: 'Średnia do wysokiej',
    fertilization: 'Co 3-4 tygodnie w sezonie',
    pruning: 'Wiosenne przycinanie',
    pests: 'Przędziorki, wciornastki',
    tips: [
      'Lubi zraszanie liści',
      'Unikaj stojącej wody',
      'Regularnie obracaj dla równomiernego wzrostu'
    ],
    image: iglica1
  },
  {
    id: 4,
    plantCategory: 'Zamiokulkasy',
    title: 'Zamiokulkas - żelazna roślina',
    slug: 'zamiokulkas-zelazna-roslina',
    difficulty: 'łatwa',
    light: 'Od cienia do półcienia',
    watering: 'Rzadkie, toleruje suszę',
    soil: 'Przepuszczalna, lekka mieszanka',
    temperature: '18-26°C',
    humidity: 'Niska do średniej',
    fertilization: 'Raz na 2 miesiące',
    pruning: 'Usuwanie żółtych liści',
    pests: 'Rzadko atakowany',
    tips: [
      'Bardzo wytrzymała roślina',
      'Idealna dla początkujących',
      'Trująca dla zwierząt'
    ],
    image: zamiokulkas1
  },
  {
    id: 5,
    plantCategory: 'Sukulenty',
    title: 'Sukulenty dla początkujących',
    slug: 'sukulenty-dla-poczatkujacych',
    difficulty: 'łatwa',
    light: 'Jasne, bezpośrednie słońce',
    watering: 'Skąpe, dopiero gdy gleba wyschnie',
    soil: 'Mieszanka dla sukulentów',
    temperature: '15-25°C',
    humidity: 'Niska',
    fertilization: 'Raz w sezonie',
    pruning: 'Usuwanie uszkodzonych części',
    pests: 'Wełnowce, mszyce',
    tips: [
      'Nie przelewaj!',
      'Zapewnij drenaż',
      'Zimą zmniejsz podlewanie'
    ],
    image: sukulent1
  },
  {
    id: 6,
    plantCategory: 'Monstery',
    title: 'Monstera - poradnik pielęgnacji',
    slug: 'monstera-poradnik-pielegnacji',
    difficulty: 'średnia',
    light: 'Rozproszone światło',
    watering: 'Gdy wierzchnia warstwa gleby przeschnie',
    soil: 'Ziemia żyzna, przepuszczalna',
    temperature: '18-27°C',
    humidity: 'Wysoka, >60%',
    fertilization: 'Co 2 tygodnie w sezonie',
    pruning: 'Приcinanie pnączy',
    pests: 'Przędziorki, tarczniki',
    tips: [
      'Lubi wysoką wilgotność',
      'Potrzebuje podpory do pnączy',
      'Regularnie czyść liście'
    ],
    image: monstera1
  }
])

// FAQ
interface FAQ {
  question: string;
  answer: string;
}

const faqs = ref<FAQ[]>([
  {
    question: 'Jak często podlewać rośliny?',
    answer: 'Częstotliwość podlewania zależy od gatunku rośliny, pory roku i warunków w pomieszczeniu. Zawsze sprawdzaj wilgotność gleby przed podlaniem.'
  },
  {
    question: 'Co zrobić, gdy liście żółkną?',
    answer: 'Żółknięcie liści może oznaczać przelanie, niedobór składników odżywczych lub zbyt mało światła. Dostosuj pielęgnację do potrzeb rośliny.'
  },
  {
    question: 'Kiedy przesadzać rośliny?',
    answer: 'Rośliny przesadzamy wiosną, gdy korzenie przerastają doniczkę. Zazwyczaj co 1-3 lat w zależności от tempa wzrostu.'
  }
])

// Фильтрация советов
const filteredAdvice = computed(() => {
  let advice = [...allAdvice.value]
  
  if (selectedCategory.value) {
    advice = advice.filter((a: CareAdvice) => a.plantCategory === selectedCategory.value)
  }
  
  if (sortBy.value === 'name') {
    advice.sort((a: CareAdvice, b: CareAdvice) => a.title.localeCompare(b.title))
  } else if (sortBy.value === 'difficulty') {
    const order: Record<string, number> = { 'łatwa': 1, 'średnia': 2, 'trudna': 3 }
    advice.sort((a: CareAdvice, b: CareAdvice) => {
      return (order[a.difficulty] || 0) - (order[b.difficulty] || 0)
    })
  }
  
  return advice
})

// Методы
const selectCategory = (categoryId: string) => {
  selectedCategory.value = selectedCategory.value === categoryId ? '' : categoryId
}

const clearFilter = () => {
  selectedCategory.value = ''
}

const getAdviceCount = (categoryId: string) => {
  return allAdvice.value.filter((a: CareAdvice) => a.plantCategory === categoryId).length
}

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : categoryId
}

const getDifficultyClass = (difficulty: string) => {
  const classes: Record<string, string> = {
    'łatwa': 'bg-green-100 text-green-800',
    'średnia': 'bg-yellow-100 text-yellow-800',
    'trudna': 'bg-red-100 text-red-800'
  }
  return classes[difficulty] || 'bg-gray-100 text-gray-800'
}
</script>
<style scoped>
.container {
  max-width: 1200px;
}
</style>