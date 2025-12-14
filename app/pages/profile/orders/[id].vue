<template>
  <div v-if="order" class="bg-white rounded-lg shadow-sm p-6">
    <!-- Навигация -->
    <nav class="flex items-center space-x-2 text-sm mb-6">
      <NuxtLink to="/profile/orders" class="text-gray-600 hover:text-[#90a88c]">
        Moje zamówienia
      </NuxtLink>
      <span class="text-gray-400">/</span>
      <span class="text-gray-900 font-medium line-clamp-1">
        Zamówienie #{{ order.id }}
      </span>
    </nav>

    <!-- Заголовок и статус -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h1 class="font-poppins font-bold text-2xl text-[#1e1e1e]">
          Zamówienie #{{ order.id }}
        </h1>
        <span
          class="text-sm px-3 py-1.5 rounded-full font-medium"
          :class="getStatusClass(order.status)"
        >
          {{ getStatusText(order.status) }}
        </span>
      </div>
      
      <p class="text-gray-600">
        Złożono: {{ formatDate(order.date) }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Левая колонка: Продукты -->
      <div class="lg:col-span-2">
        <!-- Список продуктов -->
        <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 class="font-poppins font-bold text-lg mb-6">Produkty w zamówieniu</h2>
          
          <div class="space-y-4">
            <div
              v-for="(product, index) in order.products"
              :key="index"
              class="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
            >
              <div class="flex items-start gap-4">
                <!-- Изображение продукта -->
                <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 mb-1">
                    {{ product.name }}
                  </h3>
                  
                  <div class="flex flex-wrap items-center gap-4 mt-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-sm text-gray-600">Ilość:</span>
                      <span class="font-medium">{{ product.quantity }} szt.</span>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <span class="text-sm text-gray-600">Cena:</span>
                      <span class="font-medium">{{ product.price.toFixed(2) }} zł</span>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <span class="text-sm text-gray-600">Razem:</span>
                      <span class="font-bold text-[#1e1e1e]">
                        {{ (product.price * product.quantity).toFixed(2) }} zł
                      </span>
                    </div>
                  </div>
                  
                  <!-- Кнопки действий -->
                  <div class="flex items-center space-x-3 mt-3">
                    <button
                      @click="addToCart(product)"
                      class="text-sm border border-[#90a88c] text-[#90a88c] hover:bg-[#90a88c] hover:text-white rounded-full px-4 py-1.5 transition-colors"
                    >
                      Dodaj do koszyka
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Adres dostawy i faktury -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="font-poppins font-bold text-lg mb-6">Dane dostawy i faktury</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">Adres dostawy</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <p class="font-medium">Jan Kowalski</p>
                <p>ul. Kwiatowa 123/45</p>
                <p>00-001 Warszawa</p>
                <p>Polska</p>
                <p>+48 123 456 789</p>
                <p>jan.kowalski@example.com</p>
              </div>
            </div>
            
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">Adres faktury</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <p class="font-medium">Jan Kowalski</p>
                <p>ul. Kwiatowa 123/45</p>
                <p>00-001 Warszawa</p>
                <p>Polska</p>
                <p>NIP: 1234567890</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка: Podsumление -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="font-poppins font-bold text-lg mb-6">Podsumowanie zamówienia</h2>
          
          <div class="space-y-4 mb-6">
            <!-- Sposób dostawy -->
            <div class="pb-4 border-b border-gray-100">
              <h3 class="font-semibold text-sm text-gray-700 mb-2">Sposób dostawy</h3>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">{{ order.shippingMethod }}</span>
                <span class="font-medium">{{ shippingCost.toFixed(2) }} zł</span>
              </div>
            </div>
            
            <!-- Metoda płatности -->
            <div class="pb-4 border-b border-gray-100">
              <h3 class="font-semibold text-sm text-gray-700 mb-2">Metoda płatności</h3>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">{{ order.paymentMethod }}</span>
                <span class="font-medium">0,00 zł</span>
              </div>
            </div>
            
            <!-- Podsumowanie цен -->
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Wartość produktów:</span>
                <span class="font-medium">{{ subtotal.toFixed(2) }} zł</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Dostawa:</span>
                <span class="font-medium">{{ shippingCost.toFixed(2) }} zł</span>
              </div>
              
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-lg font-bold">
                  <span>Razem:</span>
                  <span class="text-[#1e1e1e]">{{ order.total.toFixed(2) }} zł</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Przyciski akcji -->
          <div class="space-y-3">
            <button
              v-if="order.status === 'pending'"
              @click="cancelOrder"
              class="w-full border border-red-300 text-red-600 hover:bg-red-50 rounded-full py-3 font-medium transition-colors"
            >
              Anuluj zamówienie
            </button>
            
            <button
              v-if="order.status === 'completed'"
              @click="reorderAll"
              class="w-full bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full py-3 font-medium transition-colors"
            >
              Zamów ponownie wszystkie
            </button>
            
            <NuxtLink
              to="/profile/orders"
              class="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 rounded-full py-3 font-medium transition-colors text-center block"
            >
              Wróć do listy zamówień
            </NuxtLink>
          </div>
          
          <!-- Informacje dodatkowe -->
          <div class="mt-6 pt-6 border-t border-gray-100">
            <h3 class="font-semibold text-sm text-gray-700 mb-3">Informacje</h3>
            <div class="space-y-2 text-xs text-gray-500">
              <p>Numer zamówienia: {{ order.id }}</p>
              <p>Data złożenia: {{ formatDate(order.date) }}</p>
              <p>Liczba produktów: {{ order.itemsCount }} szt.</p>
              <p v-if="order.trackingNumber" class="font-medium text-[#90a88c]">
                Numer śledzenia: {{ order.trackingNumber }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Замовлення не знайдено -->
  <div v-else-if="!order" class="bg-white rounded-lg shadow-sm p-6">
    <div class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Zamówienie nie znalezione</h2>
      <p class="text-gray-600 mb-6">Przepraszamy, nie możemy znaleźć tego zamówienia.</p>
      <NuxtLink 
        to="/profile/orders" 
        class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full px-6 py-2 text-sm transition-colors inline-block"
      >
        Wróć do listy zamówień
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

// Исправляем импорт изображений
import fikus2 from "@/assets/plants/fikus2.png";
import fikus3 from "@/assets/plants/fikus3.png";
import kaktus from "@/assets/plants/kaktus.png";
import kaktus2 from "@/assets/plants/kaktus2.png";
import iglica from "@/assets/plants/iglica.png";
import iglica2 from "@/assets/plants/iglica2.png";
import monstera from "@/assets/plants/monstera.png";
import monstera2 from "@/assets/plants/monstera2.png";

const route = useRoute();
const order = ref<any>(null);

const ordersData = [
  {
    id: "ORD-2023-001",
    date: "2023-10-15",
    total: 245.97,
    status: "completed",
    shippingMethod: "Kurier DPD",
    paymentMethod: "Przelew online",
    itemsCount: 3,
    trackingNumber: "DPD123456789PL",
    products: [
      {
        id: 1,
        name: "Fikus „Maluszek”",
        image: fikus2,
        quantity: 1,
        price: 89.99,
      },
      {
        id: 3,
        name: "Kaktus „Malusieńki”",
        image: kaktus,
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
    trackingNumber: "INP987654321",
    products: [
      {
        id: 11,
        name: "Monstera „Deliciosa”",
        image: monstera,
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
    trackingNumber: "PP1234567890PL",
    products: [
      {
        id: 5,
        name: "Iglice „Zielona Piękność”",
        image: iglica,
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
    trackingNumber: "DHL9876543210",
    products: [
      {
        id: 2,
        name: "Fikus „Gigantyczny”",
        image: fikus3,
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
];

const subtotal = computed(() => {
  if (!order.value) return 0;
  return order.value.products.reduce(
    (total: number, product: any) => total + (product.price * product.quantity),
    0
  );
});

const shippingCost = computed(() => {
  if (!order.value) return 0;
  return order.value.total - subtotal.value;
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

const addToCart = (product: any) => {
  if (typeof window !== 'undefined') {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    
    alert(`${product.name} został dodany do koszyka!`);
  }
};

const reorderAll = () => {
  if (!order.value) return;
  
  if (typeof window !== 'undefined') {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    order.value.products.forEach((product: any) => {
      const existingItem = cart.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        cart.push({
          id: product.id,
          title: product.name,
          price: product.price,
          image: product.image,
          quantity: product.quantity
        });
      }
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    
    alert(`Wszystkie produkty z zamówienia ${order.value.id} zostały dodane do koszyka!`);
  }
};

const cancelOrder = () => {
  if (confirm("Czy na pewno chcesz anulować to zamówienie?")) {
    order.value.status = "cancelled";
    alert("Zamówienie zostało anulowane.");
  }
};

onMounted(() => {
  const orderId = route.params.id as string;
  const foundOrder = ordersData.find(o => o.id === orderId);
  order.value = foundOrder;
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>