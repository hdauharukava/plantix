<template>
  <div v-if="!isLoading" class="min-h-screen py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div class="text-center mb-12">
        <div class="flex justify-center mb-6">
          <div
            class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1
          class="font-poppins font-bold text-3xl md:text-4xl text-[#1e1e1e] mb-4"
        >
          Zamówienie potwierdzone!
        </h1>

        <p class="text-gray-600 text-lg mb-6">
          Dziękujemy za zakupy w naszym sklepie. Twoje zamówienie zostało
          przyjęte.
        </p>

        <div
          v-if="orderDetails"
          class="inline-flex items-center px-6 py-3 bg-[#90a88c]/10 text-[#90a88c] rounded-full font-semibold"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Numer zamówienia:
          <span class="ml-2 font-mono">{{ orderDetails.orderNumber }}</span>
        </div>
      </div>

      <div
        v-if="orderDetails"
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
      >
        <div class="lg:col-span-2">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
          >
            <h2
              class="font-poppins font-bold text-xl text-[#1e1e1e] mb-6 pb-4 border-b border-gray-200"
            >
              Szczegóły zamówienia
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    class="w-5 h-5 text-[#90a88c] mr-2"
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
                  Dane klienta
                </h3>
                <div class="space-y-2 text-gray-600">
                  <p>
                    {{ orderDetails.customer.firstName }}
                    {{ orderDetails.customer.lastName }}
                  </p>
                  <p>{{ orderDetails.customer.email }}</p>
                  <p>{{ orderDetails.customer.phone }}</p>
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    class="w-5 h-5 text-[#90a88c] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Adres dostawy
                </h3>
                <div class="space-y-2 text-gray-600">
                  <p>
                    {{ orderDetails.customer.street
                    }}{{
                      orderDetails.customer.apartment
                        ? ", " + orderDetails.customer.apartment
                        : ""
                    }}
                  </p>
                  <p>
                    {{ orderDetails.customer.postalCode }}
                    {{ orderDetails.customer.city }}
                  </p>
                  <p>{{ orderDetails.customer.country }}</p>
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    class="w-5 h-5 text-[#90a88c] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  Dostawa
                </h3>
                <div class="space-y-2 text-gray-600">
                  <p class="font-medium">{{ orderDetails.shipping.method }}</p>
                  <p class="text-sm">{{ orderDetails.shipping.description }}</p>
                  <p class="text-sm">
                    Czas dostawy: {{ orderDetails.shipping.deliveryTime }}
                  </p>
                  <p
                    v-if="orderDetails.shipping.cost > 0"
                    class="font-semibold"
                  >
                    Koszt: {{ orderDetails.shipping.cost.toFixed(2) }} zł
                  </p>
                  <p v-else class="font-semibold text-green-600">
                    Darmowa dostawa
                  </p>
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    class="w-5 h-5 text-[#90a88c] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Płatność
                </h3>
                <div class="space-y-2 text-gray-600">
                  <p class="font-medium">{{ orderDetails.payment.method }}</p>
                  <p class="text-sm">{{ orderDetails.payment.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2
              class="font-poppins font-bold text-xl text-[#1e1e1e] mb-6 pb-4 border-b border-gray-200"
            >
              Zamówione produkty
            </h2>

            <div class="space-y-4">
              <div
                v-for="item in orderDetails.items"
                :key="item.id"
                class="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden mr-4"
                >
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-medium text-gray-900 mb-1">
                        {{ item.title }}
                      </h3>
                      <div class="flex flex-wrap gap-2 mb-2">
                        <span
                          class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                        >
                          {{ item.category }}
                        </span>
                        <span
                          v-if="item.size"
                          class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                        >
                          Rozmiar: {{ getSizeName(item.size) }}
                        </span>
                      </div>
                    </div>
                    <span class="font-semibold text-gray-900 text-lg">
                      {{ (item.price * item.quantity).toFixed(2) }} zł
                    </span>
                  </div>

                  <div class="flex justify-between items-center mt-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-sm text-gray-600">
                        Ilość: {{ item.quantity }}
                      </span>
                      <span class="text-gray-400">•</span>
                      <span class="text-sm text-gray-600">
                        Cena: {{ item.price.toFixed(2) }} zł/szt
                      </span>
                    </div>
                    <NuxtLink
                      :to="`/products/${item.id}`"
                      class="text-sm text-[#90a88c] hover:text-[#799573] hover:underline"
                    >
                      Zobacz produkt
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8"
          >
            <h2 class="font-poppins font-bold text-xl text-[#1e1e1e] mb-6">
              Podsumowanie
            </h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Data zamówienia:</span>
                <span class="font-medium">{{
                  formatDate(orderDetails.date)
                }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Status:</span>
                <span class="font-medium">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800"
                  >
                    W przygotowaniu
                  </span>
                </span>
              </div>
            </div>

            <div class="space-y-3 border-t border-gray-200 pt-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Wartość produktów:</span>
                <span class="font-semibold"
                  >{{ orderDetails.subtotal.toFixed(2) }} zł</span
                >
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Dostawa:</span>
                <span class="font-semibold">
                  {{
                    orderDetails.shipping.cost === 0
                      ? "Darmowa"
                      : orderDetails.shipping.cost.toFixed(2) + " zł"
                  }}
                </span>
              </div>

              <div
                v-if="orderDetails.additionalFees > 0"
                class="flex justify-between text-sm"
              >
                <span class="text-gray-600">Dodatkowe opłaty:</span>
                <span class="font-semibold text-amber-600">
                  +{{ orderDetails.additionalFees.toFixed(2) }} zł
                </span>
              </div>

              <div
                v-if="orderDetails.discount > 0"
                class="flex justify-between text-sm"
              >
                <span class="text-gray-600">Rabat:</span>
                <span class="font-semibold text-green-600">
                  -{{ orderDetails.discount.toFixed(2) }} zł
                </span>
              </div>

              <div class="border-t border-gray-200 pt-4 mt-3">
                <div class="flex justify-between text-lg font-bold">
                  <span>Łącznie do zapłaty:</span>
                  <span class="text-[#1e1e1e]">
                    {{ orderDetails.total.toFixed(2) }} zł
                  </span>
                </div>
                <p
                  v-if="orderDetails.payment.method === 'Przelew tradycyjny'"
                  class="text-sm text-gray-600 mt-2"
                >
                  DANE DO PRZELEWU:<br />
                  Plantix sp. z o.o.<br />
                  00-000 Warszawa, ul. Roślinna 1<br />
                  PL 00 0000 0000 0000 0000 0000 0000
                </p>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <h3 class="font-semibold text-gray-900 mb-4">Co dalej?</h3>
              <ul class="space-y-3 text-sm text-gray-600">
                <li class="flex items-start">
                  <svg
                    class="w-5 h-5 text-[#90a88c] mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span
                    >Potwierdzenie zamówienia zostało wysłane na adres
                    email</span
                  >
                </li>
                <li class="flex items-start">
                  <svg
                    class="w-5 h-5 text-[#90a88c] mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Przygotowanie przesyłki zajmie 1-2 dni robocze</span>
                </li>
                <li class="flex items-start">
                  <svg
                    class="w-5 h-5 text-[#90a88c] mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Będziemy informować Cię o statusie zamówienia</span>
                </li>
              </ul>
            </div>

            <div class="mt-6">
              <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <button
                  @click="printOrder"
                  class="flex-1 flex items-center justify-center space-x-2 border border-[#90a88c] text-[#90a88c] hover:bg-[#90a88c] hover:text-white rounded-full py-3 px-4 font-medium transition-colors text-sm"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  <span>Wydrukuj</span>
                </button>

                <NuxtLink
                  to="/catalog"
                  class="flex-1 text-center bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full py-3 px-4 font-semibold transition-colors text-sm"
                >
                  Kontynuuj zakupy
                </NuxtLink>

                <NuxtLink
                  to="/profile/orders"
                  class="flex-1 text-center border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 rounded-full py-3 px-4 font-medium transition-colors text-sm"
                >
                  Moje zamówienia
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="orderDetails" class="mt-8 text-center text-gray-500 text-sm">
        <p>
          W razie pytań dotyczących zamówienia, podaj numer referencyjny:
          <span class="font-mono font-semibold">{{
            orderDetails.orderNumber
          }}</span>
        </p>
        <p class="mt-2">Dziękujemy za zakupy w Plantix! 🌿</p>
      </div>
    </div>
  </div>

  <div
    v-else-if="isLoading"
    class="min-h-screen flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie zamówienia...</p>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Zamówienie nie znalezione
      </h2>
      <p class="text-gray-600 mb-6">
        Przepraszamy, nie możemy znaleźć tego zamówienia.
      </p>
      <NuxtLink
        to="/"
        class="bg-[#90a88c] hover:bg-[#799573] text-white rounded-full px-6 py-2 text-sm cursor-pointer transition-colors inline-block"
      >
        Wróć do strony głównej
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const route = useRoute();

interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderItem {
  id: number;
  title: string;
  category: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderShipping {
  method: string;
  description: string;
  deliveryTime: string;
  cost: number;
}

interface OrderPayment {
  method: string;
  description: string;
}

interface OrderDetails {
  id: number;
  orderNumber: string;
  date: string;
  customer: OrderCustomer;
  items: OrderItem[];
  shipping: OrderShipping;
  payment: OrderPayment;
  subtotal: number;
  shippingCost: number;
  additionalFees: number;
  discount: number;
  total: number;
  status: string;
  promoCode: string | null;
}

const orderDetails = ref<OrderDetails | null>(null);
const isLoading = ref(true);

const getSizeName = (size: string) => {
  const sizes: Record<string, string> = {
    small: "Mały",
    medium: "Średni",
    large: "Duży",
  };
  return sizes[size] || size;
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return dateString;
  }
};

const loadOrderDetails = () => {
  if (typeof window !== "undefined") {
    try {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const orderId = parseInt(route.params.id as string);

      const order = orders.find((o: OrderDetails) => o.id === orderId);

      if (order) {
        orderDetails.value = order;
      }
    } catch (error) {
      console.error("Błąd ładowania zamówienia:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

const printOrder = () => {
  window.print();
};

onMounted(() => {
  loadOrderDetails();
});
</script>
