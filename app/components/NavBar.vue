<template>
  <div
    class="flex items-center justify-between p-6 mx-auto max-w-7xl w-full mb-4"
  >
    <div>
      <img src="@/assets/icons/Logo.svg" alt="logo" class="cursor-pointer" />
    </div>

    <div class="hidden lg:flex items-center space-x-4">
      <button
        class="bg-primary hover:bg-primary text-white rounded-full px-5 py-1 text-sm cursor-pointer whitespace-nowrap"
      >
        Katalog
      </button>
      <button
        class="bg-primary hover:bg-primary text-white rounded-full px-5 py-1 text-sm cursor-pointer whitespace-nowrap"
      >
        Porady dotyczące pielęgnacji
      </button>
      <button
        class="bg-primary hover:bg-primary text-white rounded-full px-5 py-1 text-sm cursor-pointer whitespace-nowrap"
      >
        Płatność i dostawa
      </button>
      <button
        class="bg-primary hover:bg-primary text-white rounded-full px-5 py-1 text-sm cursor-pointer whitespace-nowrap"
      >
        Kontakt
      </button>
    </div>

    <div class="flex items-center space-x-6">
      <div class="hidden md:flex items-center space-x-4">
        <img
          src="@/assets/icons/SearchIcon.svg"
          alt="Search"
          class="w-7 h-7 cursor-pointer"
        />
        <img
          src="@/assets/icons/HeartIcon.svg"
          alt="Heart"
          class="w-7 h-7 cursor-pointer"
        />
        <img
          src="@/assets/icons/UserIcon.svg"
          alt="User"
          class="w-7 h-7 cursor-pointer"
          @click="toggleUserModal"
        />
        <img
          src="@/assets/icons/CartIcon.svg"
          alt="Cart"
          class="w-7 h-7 cursor-pointer"
        />
      </div>

      <button
        @click="toggleMenuModal"
        class="lg:hidden flex flex-col justify-between w-6 h-5 cursor-pointer"
      >
        <span class="block h-0.5 w-full bg-primary rounded"></span>
        <span class="block h-0.5 w-full bg-primary rounded"></span>
        <span class="block h-0.5 w-full bg-primary rounded"></span>
      </button>
    </div>

    <div 
      v-if="isMenuOpen || isUserOpen" 
      class="fixed inset-0 z-10" 
      @click="closeAllModals"
    ></div>

    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 lg:hidden w-48 z-20"
      >
        <button
          class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer"
        >
          Katalog
        </button>
        <button
          class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer"
        >
          Porady
        </button>
        <button
          class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer"
        >
          Płatność i dostawa
        </button>
        <button
          class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer"
        >
          Kontakt
        </button>

        <div
          class="flex items-center justify-around mt-4 pt-4 border-t border-gray-200 md:hidden"
        >
          <img
            src="@/assets/icons/SearchIcon.svg"
            alt="Search"
            class="w-6 h-6 cursor-pointer"
          />
          <img
            src="@/assets/icons/HeartIcon.svg"
            alt="Heart"
            class="w-6 h-6 cursor-pointer"
          />
          <img
            src="@/assets/icons/UserIcon.svg"
            alt="User"
            class="w-6 h-6 cursor-pointer"
            @click.stop="openUserModal"
          />
          <img
            src="@/assets/icons/CartIcon.svg"
            alt="Cart"
            class="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isUserOpen"
        class="absolute top-16 right-20 md:right-32 bg-white shadow-lg rounded-lg p-4 w-48 z-20"
      >
        <button
          class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer text-sm"
        >
          Zaloguj się
        </button>
        <button
          class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer text-sm"
        >
          Zarejestruj się
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
const isUserOpen = ref(false);

const toggleUserModal = () => {
  isUserOpen.value = !isUserOpen.value;
  // Закрываем меню если открыто
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

const toggleMenuModal = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Закрываем пользовательское окно если открыто
  if (isUserOpen.value) {
    isUserOpen.value = false;
  }
};

const openUserModal = () => {
  isUserOpen.value = true;
  isMenuOpen.value = false;
};

const closeAllModals = () => {
  isMenuOpen.value = false;
  isUserOpen.value = false;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>