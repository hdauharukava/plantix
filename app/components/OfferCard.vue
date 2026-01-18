<template>
  <div
    class="bg-white w-full h-full relative transition-all duration-300 hover:shadow-lg hover:scale-105"
  >
    <div
      v-if="discount"
      class="absolute top-3 left-3 bg-[#ff0000] opacity-80 text-white px-2 py-1 rounded text-xs font-bold z-10"
    >
      {{ discount }}
    </div>

    <div class="aspect-[4/5] overflow-hidden mb-4 relative">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
    </div>

    <div class="px-2">
      <p class="text-gray-500 text-sm mb-1">{{ category }}</p>
      <h3 class="font-poppins font-bold text-lg text-gray-900 mb-2">
        {{ title }}
      </h3>

      <div class="flex items-center gap-2 mb-3">
        <span
          class=""
          :class="oldPrice ? 'text-[#ff0000] opacity-80' : 'text-gray-900'"
        >
          {{ formattedPrice }}
        </span>
        <span v-if="oldPrice" class="text-gray-400 line-through text-sm">
          {{ formattedOldPrice }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

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
});

const formattedPrice = computed(() => `${props.price.toFixed(2)} zł`);
const formattedOldPrice = computed(() =>
  props.oldPrice ? `${props.oldPrice.toFixed(2)} zł` : "",
);
</script>
