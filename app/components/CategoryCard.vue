<template>
  <div
    class="bg-white w-full h-full transition-all duration-300 hover:shadow-lg hover:scale-105"
  >
    <div class="aspect-[4/5] overflow-hidden mb-4">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
    </div>
    <div class="px-2 mb-3">
      <h3 class="font-poppins font-bold text-lg text-gray-900 mb-2">
        {{ title }}
      </h3>
      <p class="font-poppins text-sm text-gray-600">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
