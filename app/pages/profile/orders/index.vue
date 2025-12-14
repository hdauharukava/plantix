<template>
  <div class="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
    <div class="w-full max-w-5xl mb-8">
      <div>
        <h1 class="font-poppins font-bold text-2xl md:text-3xl text-[#1e1e1e]">
          Moje zamówienia
        </h1>
        <p class="text-gray-600 mt-2">Historia Twoich zamówień</p>
      </div>
    </div>

    <div class="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
      <div class="lg:w-1/4">
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
              :class="{
                'bg-[#90A88C]/10 text-[#90a88c] font-semibold':
                  $route.path === '/profile',
              }"
            >
              <svg
                class="w-5 h-5"
                :class="{
                  'text-[#90a88c]': $route.path === '/profile',
                  'text-gray-500': $route.path !== '/profile',
                }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Dane osobowe</span>
            </NuxtLink>

            <div
              class="flex items-center space-x-3 py-2 px-3 rounded-md bg-[#90A88C]/10 text-[#90a88c] font-semibold"
            >
              <svg
                class="w-5 h-5 text-[#90a88c]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21"
                />
              </svg>
              <span>Moje zamówienia</span>
            </div>

            <NuxtLink
              to="/favorites"
              class="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-[#90A88C]/10 transition-colors duration-200"
              :class="{
                'bg-[#90A88C]/10 text-[#90a88c] font-semibold':
                  $route.path === '/favorites',
              }"
            >
              <svg
                class="w-5 h-5"
                :class="{
                  'text-[#90a88c]': $route.path === '/favorites',
                  'text-gray-500': $route.path !== '/favorites',
                }"
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
              <span>Ulubione</span>
            </NuxtLink>

            <button
              @click="logout"
              class="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full text-left text-gray-700"
            >
              <svg
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Wyloguj się</span>
            </button>
          </nav>
        </div>
      </div>

      <div class="lg:w-3/4">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
          >
            <h2 class="font-poppins font-bold text-xl">Historia zamówień</h2>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Filtruj:</span>
              <select
                v-model="selectedFilter"
                class="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#90a88c] focus:border-[#90a88c]"
              >
                <option value="all">Wszystkie</option>
                <option value="pending">Oczekujące</option>
                <option value="completed">Zrealizowane</option>
                <option value="cancelled">Anulowane</option>
              </select>
            </div>
          </div>

          <div v-if="filteredOrders.length > 0" class="space-y-6">
            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <div class="flex flex-col lg:flex-row justify-between gap-6">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-1">
                    Zamówienie #{{ order.id }}
                  </h3>
                  <p class="text-sm text-gray-500 mb-4">
                    Złożono: {{ formatDate(order.date) }}
                  </p>

                  <div class="space-y-3">
                    <div class="flex items-center space-x-4">
                      <span class="font-bold text-lg text-[#1e1e1e]">
                        {{ order.total.toFixed(2) }} zł
                      </span>
                      <span
                        class="text-xs px-2 py-1 rounded-full"
                        :class="getStatusClass(order.status)"
                      >
                        {{ getStatusText(order.status) }}
                      </span>
                    </div>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3">
                      <div
                        v-for="(product, index) in order.products.slice(0, 6)"
                        :key="index"
                        class="relative group"
                      >
                        <div
                          class="w-8 h-8 rounded-sm overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0"
                        >
                          <img
                            :src="product.image"
                            :alt="product.name"
                            class="w-full h-full object-cover"
                          />
                        </div>

                        <div
                          v-if="product.quantity > 1"
                          class="absolute -top-1 -right-1 w-4 h-4 bg-[#90a88c] text-white text-[9px] rounded-full flex items-center justify-center border border-white"
                        >
                          {{ product.quantity }}
                        </div>
                      </div>

                      <div
                        v-if="order.products.length > 6"
                        class="text-xs text-gray-500 ml-1"
                      >
                        +{{ order.products.length - 6 }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:w-1/3 space-y-3">
                  <div>
                    <p class="text-xs text-gray-500 mb-1">Sposób dostawy</p>
                    <p class="text-sm font-medium">
                      {{ order.shippingMethod }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 mb-1">Metoda płatności</p>
                    <p class="text-sm font-medium">{{ order.paymentMethod }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 mb-1">Liczba produktów</p>
                    <p class="text-sm font-medium">
                      {{ order.itemsCount }} szt.
                    </p>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-100 pt-4 mt-6">
                <div
                  class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <NuxtLink
                    :to="`/profile/orders/${order.id}`"
                    class="text-sm text-[#90a88c] hover:text-[#799573] font-medium hover:underline"
                  >
                    Zobacz szczegóły
                  </NuxtLink>
                  <div class="flex space-x-3">
                    <button
                      v-if="order.status === 'pending'"
                      @click="cancelOrder(order.id)"
                      class="text-sm border border-gray-300 text-gray-600 hover:bg-gray-50 active:bg-gray-200 rounded-full px-4 py-1 transition-colors"
                    >
                      Anuluj
                    </button>
                    <button
                      v-if="order.status === 'completed'"
                      @click="reorder(order.id)"
                      class="text-sm bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full px-4 py-1 transition-colors"
                    >
                      Zamów ponownie
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <div class="flex justify-center mb-4">
              <svg
                class="w-16 h-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21"
                />
              </svg>
            </div>
            <p class="text-gray-500 text-lg mb-2">Nie masz jeszcze zamówień</p>
            <p class="text-gray-400 text-sm mb-6">
              Złóż pierwsze zamówienie w naszym sklepie
            </p>
            <NuxtLink
              to="/catalog"
              class="bg-[#90a88c] hover:bg-[#799573] text-white rounded-full px-6 py-2 text-sm cursor-pointer transition-colors inline-block"
            >
              Przejdź do katalogu
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "#app";

import fikus1 from "@/assets/plants/fikus2.png";
import fikus2 from "@/assets/plants/fikus3.png";
import kaktus1 from "@/assets/plants/kaktus.png";
import kaktus2 from "@/assets/plants/kaktus2.png";
import iglica1 from "@/assets/plants/iglica.png";
import iglica2 from "@/assets/plants/iglica2.png";
import monstera1 from "@/assets/plants/monstera.png";
import monstera2 from "@/assets/plants/monstera2.png";

const router = useRouter();
const isLoading = ref(false);

const orders = ref([
  {
    id: "ORD-2023-001",
    date: "2023-10-15",
    total: 245.97,
    status: "completed",
    shippingMethod: "Kurier DPD",
    paymentMethod: "Przelew online",
    itemsCount: 3,
    products: [
      {
        id: 1,
        name: "Fikus „Maluszek”",
        image: fikus1,
        quantity: 1,
        price: 89.99,
      },
      {
        id: 3,
        name: "Kaktus „Malusieńki”",
        image: kaktus1,
        quantity: 2,
        price: 34.99,
      },
    ],
  },
  {
    id: "ORD-2023-002",
    date: "2023-11-20",
    total: 129.99,
    status: "pending",
    shippingMethod: "Paczkomat InPost",
    paymentMethod: "Karta płatnicza",
    itemsCount: 1,
    products: [
      {
        id: 11,
        name: "Monstera „Deliciosa”",
        image: monstera1,
        quantity: 1,
        price: 129.99,
      },
    ],
  },
  {
    id: "ORD-2023-003",
    date: "2023-09-05",
    total: 89.5,
    status: "completed",
    shippingMethod: "Poczta Polska",
    paymentMethod: "Przelew tradycyjny",
    itemsCount: 2,
    products: [
      {
        id: 5,
        name: "Iglice „Zielona Piękność”",
        image: iglica1,
        quantity: 1,
        price: 65.5,
      },
      {
        id: 10,
        name: "Sukulent „Kolorowy”",
        image: kaktus2,
        quantity: 1,
        price: 24.0,
      },
    ],
  },
  {
    id: "ORD-2023-004",
    date: "2023-08-12",
    total: 310.25,
    status: "cancelled",
    shippingMethod: "Kurier DHL",
    paymentMethod: "Karta płatnicza",
    itemsCount: 4,
    products: [
      {
        id: 2,
        name: "Fikus „Gigantyczny”",
        image: fikus2,
        quantity: 1,
        price: 199.99,
      },
      {
        id: 8,
        name: "Zamiokulkas „Pnący”",
        image: monstera2,
        quantity: 1,
        price: 120.0,
      },
      {
        id: 6,
        name: "Iglice „Miniatura”",
        image: iglica2,
        quantity: 2,
        price: 45.0,
      },
    ],
  },
]);

const selectedFilter = ref("all");

const filteredOrders = computed(() => {
  if (selectedFilter.value === "all") {
    return orders.value;
  }
  return orders.value.filter((order) => order.status === selectedFilter.value);
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: "Oczekujące",
    completed: "Zrealizowane",
    cancelled: "Anulowane",
  };
  return texts[status] || status;
};

const cancelOrder = (orderId: string) => {
  if (confirm("Czy na pewno chcesz anulować to zamówienie?")) {
    const order = orders.value.find((o) => o.id === orderId);
    if (order) {
      order.status = "cancelled";
      alert("Zamówienie zostało anulowane.");
    }
  }
};

const reorder = (orderId: string) => {
  alert(`Dodano produkty z zamówienia ${orderId} do koszyka.`);
};

const logout = () => {
  localStorage.removeItem("auth_token");
  router.push("/");
};
</script>