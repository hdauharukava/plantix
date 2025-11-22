<template>
  <footer class="h-120 md:h-64 bg-[#90a88c] relative">
    <div class="max-w-7xl mx-auto w-full h-full relative">
      <div class="hidden md:block">
        <div class="absolute right-6 top-9 flex items-center space-x-4">
          <img
            src="@/assets/icons/Instagram.svg"
            alt="Instagram"
            class="w-8 h-8 cursor-pointer"
          />
          <img
            src="@/assets/icons/Facebook.svg"
            alt="Facebook"
            class="w-8 h-8 cursor-pointer"
          />
        </div>

        <div class="absolute right-6 bottom-12 flex items-center space-x-4">
          <input
            type="email"
            placeholder="Wpisz swój e-mail"
            class="w-60 h-10 border border-white font-bold text-sm text-white bg-transparent px-4 placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            v-model="email"
            @keyup.enter="subscribe"
          />
          <button
            class="w-30 h-10 bg-white font-bold text-sm text-[#90A88C] hover:bg-gray-100 active:bg-gray-200 transition-colors"
            @click="subscribe"
          >
            subskrybuj
          </button>
        </div>

        <div class="flex items-center space-x-4 absolute left-6 top-9">
          <NuxtLink to="/catalog" class="text-white text-sm cursor-pointer hover:underline">
            Katalog
          </NuxtLink>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Porady dotyczące pielęgnacji
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Płatność i dostawa
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Kontakt
          </button>
        </div>
        <div class="absolute left-6 bottom-12">
          <p class="text-white text-sm">
            ©2025 sklep z kwiatami i roślinami PLANTIX
          </p>
        </div>
        <div class="absolute left-6 bottom-18">
          <NuxtLink to="/">
        <img src="@/assets/icons/LogoWhite.svg" alt="logo" class="cursor-pointer h-8" />
      </NuxtLink>
        </div>
      </div>

      <div
        class="md:hidden flex flex-col items-center justify-center h-full space-y-8"
      >
        <div class="flex flex-col items-center space-y-3">
          <button class="text-white text-sm cursor-pointer hover:underline">
            Katalog
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Porady dotyczące pielęgnacji
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Płatność i dostawa
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Kontakt
          </button>
        </div>

        <div class="flex items-center space-x-3">
          <img
            src="@/assets/icons/Instagram.svg"
            alt="Instagram"
            class="w-8 h-8 cursor-pointer"
          />
          <img
            src="@/assets/icons/Facebook.svg"
            alt="Facebook"
            class="w-8 h-8 cursor-pointer"
          />
        </div>

        <div class="flex flex-col items-center space-y-3">
          <input
            type="email"
            placeholder="Wpisz swój e-mail"
            class="w-80 h-10 border border-white font-bold text-sm text-white bg-transparent px-4 placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-center"
            v-model="email"
            @keyup.enter="subscribe"
          />
          <button
            class="w-32 h-10 bg-white font-bold text-sm text-[#90A88C] hover:bg-gray-100 active:bg-gray-200 transition-colors"
            @click="subscribe"
          >
            subskrybuj
          </button>
        </div>

        <div class="flex flex-col items-center space-y-3">
          <NuxtLink to="/">
        <img src="@/assets/icons/LogoWhite.svg" alt="logo" class="cursor-pointer h-8" />
      </NuxtLink>
          <p class="text-white text-sm text-center">
            ©2025 sklep z kwiatami i roślinami PLANTIX
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref('');

const subscribe = () => {
  if (email.value.trim()) {
    console.log('Subscribing email:', email.value);
    
    email.value = '';
    
    alert('Dziękujemy za subskrypcję!');
  } else {
    alert('Proszę wpisać adres e-mail');
  }
};
</script>