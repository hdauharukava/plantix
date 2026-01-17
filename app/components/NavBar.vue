<template>
  <div
    class="flex items-center justify-between p-6 mx-auto max-w-7xl w-full mb-4"
  >
    <div>
      <NuxtLink to="/">
        <img src="@/assets/icons/Logo.svg" alt="logo" class="cursor-pointer" />
      </NuxtLink>
    </div>

    <div class="hidden lg:flex items-center space-x-4">
      <NuxtLink
        to="/catalog"
        class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full px-5 py-1 text-sm cursor-pointer whitespace-nowrap"
      >
        Katalog
      </NuxtLink>
      <NuxtLink
        to="/advices"
        class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full px-5 py-1 text-sm cursor-pointer whitespace-nowrap"
      >
        Porady dotyczące pielęgnacji
      </NuxtLink>
      <NuxtLink
        to="/delivery"
        class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full px-5 py-1 text-sm cursor-pointer whitespace-nowrap"
      >
        Płatność i dostawa
      </NuxtLink>
      <NuxtLink
        to="/contact"
        class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full px-5 py-1 text-sm cursor-pointer whitespace-nowrap"
      >
        Kontakt
      </NuxtLink>
    </div>

    <div class="flex items-center space-x-6">
      <div class="hidden md:flex items-center space-x-4">
        <div class="relative" v-if="isSearchOpen">
          <input
            type="text"
            placeholder="Wyszukaj..."
            class="border border-[#90a88c] rounded-full px-4 py-1 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#90a88c] focus:border-transparent transition-all duration-200 w-48"
            v-model="searchQuery"
            ref="searchInput"
            @keyup.enter="performSearch"
          />
          <button
            @click="performSearch"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img
              src="@/assets/icons/SearchIcon.svg"
              alt="Search"
              class="w-5 h-5"
            />
          </button>
        </div>

        <button v-else @click="openSearch" class="cursor-pointer">
          <img
            src="@/assets/icons/SearchIcon.svg"
            alt="Search"
            class="w-7 h-7"
          />
        </button>

        <NuxtLink to="/favorites" class="hidden md:block">
          <img
            src="@/assets/icons/HeartIcon.svg"
            alt="Favorite"
            class="w-7 h-7 cursor-pointer"
          />
        </NuxtLink>
        <img
          src="@/assets/icons/UserIcon.svg"
          alt="User"
          class="w-7 h-7 cursor-pointer"
          @click="toggleUserModal"
        />
        <NuxtLink to="/cart" class="relative">
          <img
            src="@/assets/icons/CartIcon.svg"
            alt="Cart"
            class="w-7 h-7 cursor-pointer"
          />
          <div
            v-if="totalItems > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
          >
            {{ totalItems }}
          </div>
        </NuxtLink>
      </div>

      <button
        @click="toggleMenuModal"
        class="lg:hidden flex flex-col justify-between w-6 h-5 cursor-pointer"
      >
        <span
          class="block h-0.5 w-full bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] rounded"
        ></span>
        <span
          class="block h-0.5 w-full bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] rounded"
        ></span>
        <span
          class="block h-0.5 w-full bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] rounded"
        ></span>
      </button>
    </div>

    <div
      v-if="isMenuOpen || isUserOpen || isSearchOpen"
      class="fixed inset-0 z-10"
      @click="closeAllModals"
    ></div>

    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 lg:hidden w-48 z-20"
      >
        <div class="flex flex-col space-y-3">
          <NuxtLink
            to="/catalog"
            class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer block no-underline text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            Katalog
          </NuxtLink>
          <NuxtLink
            to="/advices"
            class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer"
          >
            Porady
          </NuxtLink>
          <NuxtLink
            to="/delivery"
            class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer"
          >
            Płatność i dostawa
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer"
          >
            Kontakt
          </NuxtLink>
        </div>

        <div
          class="flex items-center justify-around mt-4 pt-4 border-t border-gray-200 md:hidden"
        >
          <div
            class="relative w-full flex justify-center"
            v-if="isSearchOpenMobile"
          >
            <input
              type="text"
              placeholder="Wyszukaj..."
              class="border border-[#90a88c] rounded-full px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#90a88c] focus:border-transparent transition-all duration-200 w-full max-w-40"
              v-model="searchQuery"
              ref="searchInputMobile"
              @keyup.enter="performSearch"
            />
            <button
              @click="performSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <img
                src="@/assets/icons/SearchIcon.svg"
                alt="Search"
                class="w-4 h-4"
              />
            </button>
          </div>

          <div v-else class="flex items-center justify-around w-full">
            <button @click="openSearchMobile" class="cursor-pointer">
              <img
                src="@/assets/icons/SearchIcon.svg"
                alt="Search"
                class="w-6 h-6"
              />
            </button>
            <NuxtLink to="/favorites" class="relative">
              <img
                src="@/assets/icons/HeartIcon.svg"
                alt="Heart"
                class="w-6 h-6 cursor-pointer"
              />
            </NuxtLink>
            <img
              src="@/assets/icons/UserIcon.svg"
              alt="User"
              class="w-6 h-6 cursor-pointer"
              @click.stop="openUserModal"
            />
            <NuxtLink to="/cart" class="relative">
              <img
                src="@/assets/icons/CartIcon.svg"
                alt="Cart"
                class="w-6 h-6 cursor-pointer"
              />

              <div
                v-if="totalItems > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold"
              >
                {{ totalItems }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isUserOpen"
        class="absolute bg-white shadow-lg rounded-lg p-4 w-48 z-30"
        :class="getUserModalPosition()"
      >
        <NuxtLink
          to="/login"
          class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer text-sm block"
          @click="closeAllModals"
        >
          Zaloguj się
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="w-full text-left py-2 px-3 whitespace-nowrap rounded-md hover:bg-[#90A88C]/30 transition-colors duration-200 cursor-pointer text-sm block"
          @click="closeAllModals"
        >
          Zarejestruj się
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useCart } from "~/composables/useCart";
const { totalItems } = useCart();

const isMenuOpen = ref(false);
const isUserOpen = ref(false);
const isSearchOpen = ref(false);
const isSearchOpenMobile = ref(false);
const searchQuery = ref("");

const windowWidth = ref(0);

const searchInput = ref<HTMLInputElement | null>(null);
const searchInputMobile = ref<HTMLInputElement | null>(null);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", updateWindowWidth);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
  document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  const isSearchInput = target.closest('input[type="text"]');
  const isSearchIcon =
    target.closest('img[alt="Search"]') ||
    target.closest("button")?.querySelector('img[alt="Search"]');

  if (!isSearchInput && !isSearchIcon) {
    closeSearch();
  }
};

const getUserModalPosition = () => {
  if (windowWidth.value < 768) {
    return isMenuOpen.value ? "top-80 right-6" : "top-16 right-6";
  } else {
    return "top-16 right-32";
  }
};

const toggleUserModal = () => {
  isUserOpen.value = !isUserOpen.value;
  if (isMenuOpen.value && windowWidth.value >= 768) {
    isMenuOpen.value = false;
  }
  closeSearch();
};

const toggleMenuModal = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isUserOpen.value) {
    isUserOpen.value = false;
  }
  closeSearch();
};

const openUserModal = () => {
  isUserOpen.value = true;
};

const openSearch = () => {
  isSearchOpen.value = true;
  nextTick(() => {
    searchInput.value?.focus();
  });
};

const openSearchMobile = () => {
  isSearchOpenMobile.value = true;
  nextTick(() => {
    searchInputMobile.value?.focus();
  });
};

const closeSearch = () => {
  searchQuery.value = "";
  isSearchOpen.value = false;
  isSearchOpenMobile.value = false;
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("Searching for:", searchQuery.value);
    searchQuery.value = "";
  }
  closeSearch();
};

const closeAllModals = () => {
  isMenuOpen.value = false;
  isUserOpen.value = false;
  closeSearch();
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
