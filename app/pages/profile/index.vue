<template>
  <div class="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
    <div class="w-full max-w-5xl mb-8">
      <div>
        <h1 class="font-poppins font-bold text-2xl md:text-3xl text-[#1e1e1e]">
          Mój profil
        </h1>
        <p class="text-gray-600 mt-2">Zarządzaj swoim kontem i zamówieniami</p>
      </div>
    </div>

    <div class="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
      <div class="lg:w-1/4 mb-60">
        <div class="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-8">
          <div class="flex items-center space-x-4 mb-6">
            <div>
              <h3 class="font-semibold text-gray-900">Jan Kowalski</h3>
              <p class="text-sm text-gray-500">jan.kowalski@example.com</p>
            </div>
          </div>

          <nav class="space-y-2">
            <NuxtLink
              to="/profile"
              class="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-[#90A88C]/10 transition-colors duration-200"
              :class="{ 'bg-[#90A88C]/10 text-[#90a88c] font-semibold': $route.path === '/profile' }"
            >
              <svg 
                class="w-5 h-5" 
                :class="{ 'text-[#90a88c]': $route.path === '/profile', 'text-gray-500': $route.path !== '/profile' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Dane osobowe</span>
            </NuxtLink>

            <NuxtLink
              to="/profile/orders"
              class="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-[#90A88C]/10 transition-colors duration-200"
              :class="{ 'bg-[#90A88C]/10 text-[#90a88c] font-semibold': $route.path === '/profile/orders' }"
            >
              <svg 
                class="w-5 h-5" 
                :class="{ 'text-[#90a88c]': $route.path === '/profile/orders', 'text-gray-500': $route.path !== '/profile/orders' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
              </svg>
              <span>Moje zamówienia</span>
            </NuxtLink>

            <NuxtLink
              to="/profile/favorites"
              class="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-[#90A88C]/10 transition-colors duration-200"
              :class="{ 'bg-[#90A88C]/10 text-[#90a88c] font-semibold': $route.path === '/profile/favorites' }"
            >
              <svg 
                class="w-5 h-5" 
                :class="{ 'text-[#90a88c]': $route.path === '/profile/favorites', 'text-gray-500': $route.path !== '/profile/favorites' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Ulubione</span>
            </NuxtLink>

            <NuxtLink
              to="/profile/addresses"
              class="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-[#90A88C]/10 transition-colors duration-200"
              :class="{ 'bg-[#90A88C]/10 text-[#90a88c] font-semibold': $route.path === '/profile/addresses' }"
            >
              <svg 
                class="w-5 h-5" 
                :class="{ 'text-[#90a88c]': $route.path === '/profile/addresses', 'text-gray-500': $route.path !== '/profile/addresses' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Adresy</span>
            </NuxtLink>

            <button
              @click="logout"
              class="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full text-left text-gray-700"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Wyloguj się</span>
            </button>
          </nav>
        </div>
      </div>

      <div class="lg:w-3/4">
        <div v-if="$route.path === '/profile'" class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="font-poppins font-bold text-xl mb-6">Dane osobowe</h2>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Imię</label>
                <input
                  type="text"
                  v-model="userData.firstName"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nazwisko</label>
                <input
                  type="text"
                  v-model="userData.lastName"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                v-model="userData.email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
              <input
                type="tel"
                v-model="userData.phone"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none"
              />
            </div>

            <div class="pt-4 border-t border-gray-200">
              <button
                @click="saveProfile"
                class="bg-[#90a88c] hover:bg-[#799573] text-white rounded-full px-6 py-2 font-bold transition-colors"
              >
                Zapisz zmiany
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="$route.path === '/profile/orders'" class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="font-poppins font-bold text-xl mb-6">Moje zamówienia</h2>
          <p class="text-gray-500">Brak zamówień</p>
        </div>

        <div v-else-if="$route.path === '/profile/favorites'" class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="font-poppins font-bold text-xl mb-6">Ulubione produkty</h2>
          <p class="text-gray-500">Przejdź do <NuxtLink to="/favorites" class="text-[#90a88c] hover:underline">ulubionych produktów</NuxtLink></p>
        </div>

        <div v-else-if="$route.path === '/profile/addresses'" class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="font-poppins font-bold text-xl mb-6">Moje adresy</h2>
          <p class="text-gray-500">Brak zapisanych adresów</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from '#app';

const router = useRouter();

const userData = ref({
  firstName: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@example.com',
  phone: '+48 123 456 789'
});

const saveProfile = () => {
  alert('Zapisano zmiany!');
};

const logout = () => {
  localStorage.removeItem('auth_token');
  router.push('/');
};
</script>