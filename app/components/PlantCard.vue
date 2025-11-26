<template>
  <div
    class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group relative"
  >
    <div class="relative">
      <div class="w-full aspect-[3/4] overflow-hidden">
        <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div
        v-if="discount"
        class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
      >
        {{ discount }}
      </div>

      <button
        @click.stop="toggleFavorite"
        class="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
      >
        <svg
          class="w-5 h-5"
          :class="isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      
      <div class="absolute bottom-4 left-4 right-4 hidden md:block">
        <button
          class="w-full bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white text-sm rounded-full px-4 py-2 transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 font-bold shadow-lg"
        >
          Do koszyka
        </button>
      </div>
    </div>

    <div class="p-4">
      <p class="text-xs text-gray-500 mb-1">{{ category }}</p>
      <h3 class="font-semibold text-sm mb-2 line-clamp-2">{{ title }}</h3>

      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center space-x-2 min-w-0 flex-1">
          <span class="font-bold text-base text-[#1e1e1e] whitespace-nowrap">{{ price }} zł</span>
          <span
            v-if="oldPrice"
            class="text-sm text-gray-500 line-through whitespace-nowrap"
          >
            {{ oldPrice }} zł
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    default: null,
  },
  discount: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: "medium",
  },
  id: {
    type: Number,
    required: true,
  }
});

const isFavorite = ref(false);

onMounted(() => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  isFavorite.value = favorites.includes(props.id);
});

const toggleFavorite = () => {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  if (isFavorite.value) {
    favorites = favorites.filter(favId => favId !== props.id);
  } else {
    favorites.push(props.id);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  isFavorite.value = !isFavorite.value;
  
  window.dispatchEvent(new CustomEvent('favoritesUpdated'));
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
  box-orient: vertical;
}
</style>
