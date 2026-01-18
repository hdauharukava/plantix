<template>
  <div v-if="!isLoading" class="min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8">
          <h1
            class="font-poppins font-bold text-3xl md:text-4xl text-gray-900"
          >
            Kasa
          </h1>
          <p class="text-gray-600 mt-2">
            Uzupełnij dane do dostawy i płatności
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="space-y-8">
              <div
                class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h2 class="font-poppins font-bold text-xl text-gray-900 mb-6">
                  Dane kontaktowe
                </h2>

                <UForm
                  :state="formState"
                  @submit="processOrder"
                  class="space-y-6"
                >
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UFormField name="firstName" label="Imię" required>
                      <UInput
                        v-model="formState.firstName"
                        type="text"
                        placeholder="Wpisz imię"
                        class="w-full"
                        :ui="{
                          base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                        }"
                      />
                    </UFormField>

                    <UFormField name="lastName" label="Nazwisko" required>
                      <UInput
                        v-model="formState.lastName"
                        type="text"
                        placeholder="Wpisz nazwisko"
                        class="w-full"
                        :ui="{
                          base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                        }"
                      />
                    </UFormField>

                    <UFormField name="email" label="Email" required>
                      <UInput
                        v-model="formState.email"
                        type="email"
                        placeholder="przyklad@email.pl"
                        class="w-full"
                        :ui="{
                          base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                        }"
                      />
                    </UFormField>

                    <UFormField name="phone" label="Telefon" required>
                      <UInput
                        v-model="formState.phone"
                        type="tel"
                        placeholder="+48 123 456 789"
                        class="w-full"
                        :ui="{
                          base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                        }"
                      />
                    </UFormField>
                  </div>

                  <div class="pt-6 border-t border-gray-200">
                    <h3 class="font-semibold text-lg text-gray-900 mb-6">
                      Adres dostawy
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <UFormField name="street" label="Ulica i numer" required>
                        <UInput
                          v-model="formState.street"
                          type="text"
                          placeholder="Wpisz ulicę i numer"
                          class="w-full"
                          :ui="{
                            base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                          }"
                        />
                      </UFormField>

                      <UFormField
                        name="apartment"
                        label="Mieszkanie / Lokal (opcjonalnie)"
                      >
                        <UInput
                          v-model="formState.apartment"
                          type="text"
                          placeholder="Nr mieszkania"
                          class="w-full"
                          :ui="{
                            base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                          }"
                        />
                      </UFormField>

                      <UFormField name="city" label="Miasto" required>
                        <UInput
                          v-model="formState.city"
                          type="text"
                          placeholder="Wpisz miasto"
                          class="w-full"
                          :ui="{
                            base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                          }"
                        />
                      </UFormField>

                      <UFormField
                        name="postalCode"
                        label="Kod pocztowy"
                        required
                      >
                        <UInput
                          v-model="formState.postalCode"
                          type="text"
                          placeholder="00-000"
                          class="w-full"
                          :ui="{
                            base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                          }"
                        />
                      </UFormField>

                      <UFormField name="country" label="Kraj" required>
                        <UInput
                          v-model="formState.country"
                          type="text"
                          placeholder="Wpisz kraj"
                          class="w-full"
                          :ui="{
                            base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                          }"
                        />
                      </UFormField>
                    </div>
                  </div>

                  <div class="pt-6 border-t border-gray-200">
                    <h3 class="font-semibold text-lg text-gray-900 mb-6">
                      Metoda dostawy
                    </h3>

                    <div class="space-y-4">
                      <label
                        v-for="method in shippingMethods"
                        :key="method.id"
                        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#90a88c] cursor-pointer transition-colors"
                        :class="{
                          'border-[#90a88c] bg-[#90a88c]/5':
                            selectedShipping === method.id,
                        }"
                      >
                        <div class="flex items-center space-x-4">
                          <input
                            type="radio"
                            :value="method.id"
                            v-model="selectedShipping"
                            class="w-4 h-4 text-[#90a88c] focus:ring-[#90a88c]"
                          />
                          <div>
                            <p class="font-medium text-gray-900">
                              {{ method.name }}
                            </p>
                            <p class="text-sm text-gray-600">
                              {{ method.description }}
                            </p>
                            <p class="text-xs text-gray-500 mt-1">
                              Czas dostawy: {{ method.deliveryTime }}
                            </p>
                          </div>
                        </div>
                        <span class="font-semibold">
                          {{
                            method.price === 0
                              ? "Darmowa"
                              : `${method.price.toFixed(2)} zł`
                          }}
                        </span>
                      </label>
                    </div>

                    <div
                      v-if="subtotal >= 250"
                      class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <p class="text-green-700 text-sm">
                        🎉 Gratulacje! Twoje zamówienie kwalifikuje się do
                        <strong>darmowej dostawy</strong>.
                      </p>
                    </div>
                    <div
                      v-else
                      class="mt-4 p-3 border border-[#90a88c] rounded-lg"
                    >
                      <p class="text-[#90a88c] text-sm">
                        💡 Do darmowej dostawy brakuje Ci tylko
                        <strong>{{ (250 - subtotal).toFixed(2) }} zł</strong>.
                      </p>
                    </div>
                  </div>

                  <div class="pt-6 border-t border-gray-200">
                    <h3 class="font-semibold text-lg text-gray-900 mb-6">
                      Metoda płatności
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        v-for="method in paymentMethods"
                        :key="method.id"
                        class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#90a88c] cursor-pointer transition-colors"
                        :class="{
                          'border-[#90a88c] bg-[#90a88c]/5':
                            selectedPayment === method.id,
                        }"
                      >
                        <input
                          type="radio"
                          :value="method.id"
                          v-model="selectedPayment"
                          class="w-4 h-4 text-[#90a88c] focus:ring-[#90a88c] mr-3"
                        />
                        <div class="flex items-center space-x-3">
                          <div
                            class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
                          >
                            <span
                              v-html="method.icon"
                              class="w-6 h-6 text-gray-600"
                            />
                          </div>
                          <div>
                            <p class="font-medium text-gray-900">
                              {{ method.name }}
                            </p>
                            <p class="text-xs text-gray-600">
                              {{ method.description }}
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div class="mt-6">
                      <div class="flex items-center space-x-4">
                        <UInput
                          v-model="promoCode"
                          type="text"
                          placeholder="Kod promocyjny"
                          class="flex-1"
                          :ui="{
                            base: 'focus:ring-2 focus:ring-[#90a88c] focus:border-transparent focus-visible:ring-[#90a88c]',
                          }"
                        />
                        <UButton
                          type="button"
                          @click="applyPromoCode"
                          class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white"
                        >
                          Zastosuj
                        </UButton>
                      </div>
                      <p
                        v-if="promoCodeError"
                        class="text-red-500 text-sm mt-2"
                      >
                        {{ promoCodeError }}
                      </p>
                      <p
                        v-if="promoCodeSuccess"
                        class="text-[#90a88c] text-sm mt-2"
                      >
                        {{ promoCodeSuccess }}
                      </p>
                    </div>
                  </div>
                </UForm>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8"
            >
              <h2 class="font-poppins font-bold text-xl text-gray-900 mb-6">
                Podsumowanie zamówienia
              </h2>

              <div class="mb-6">
                <h3 class="font-semibold text-gray-900 mb-4">Twoje produkty</h3>
                <div class="space-y-4 max-h-64 overflow-y-auto pr-2">
                  <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="flex items-center space-x-3"
                  >
                    <div
                      class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <img
                        :src="item.image"
                        :alt="item.title"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-sm text-gray-900 truncate">
                        {{ item.title }}
                      </p>
                      <div class="flex items-center justify-between mt-1">
                        <p class="text-sm text-gray-600">
                          {{ item.quantity }} × {{ item.price.toFixed(2) }} zł
                        </p>
                        <p class="font-semibold text-sm">
                          {{ (item.price * item.quantity).toFixed(2) }} zł
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-3 border-t border-gray-200 pt-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Wartość produktów:</span>
                  <span class="font-semibold"
                    >{{ subtotal.toFixed(2) }} zł</span
                  >
                </div>

                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Dostawa:</span>
                  <span class="font-semibold">
                    {{ selectedShippingPrice.toFixed(2) }} zł
                  </span>
                </div>

                <div
                  v-if="selectedPayment === 'cod'"
                  class="flex justify-between text-sm"
                >
                  <span class="text-gray-600"
                    >Płatność kartą przy odbiorze:</span
                  >
                  <span class="font-semibold text-amber-600">
                    +{{ (subtotal * 0.01).toFixed(2) }} zł
                  </span>
                </div>

                <div v-if="discount > 0" class="flex justify-between text-sm">
                  <span class="text-gray-600">Rabat:</span>
                  <span class="font-semibold text-green-600">
                    -{{ discount.toFixed(2) }} zł
                  </span>
                </div>

                <div class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between text-lg font-bold">
                    <span>Do zapłaty:</span>
                    <span class="text-gray-900">
                      {{ totalPrice.toFixed(2) }} zł
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <label class="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    v-model="termsAccepted"
                    class="custom-checkbox h-4 w-4 rounded border-gray-300 focus:ring-[#90a88c] focus:ring-2 focus:ring-offset-0"
                  />
                  <span class="text-xs text-gray-600">
                    Akceptuję
                    <NuxtLink
                      to="/regulamin"
                      class="text-[#90a88c] hover:underline"
                    >
                      regulamin sklepu
                    </NuxtLink>
                    oraz
                    <NuxtLink
                      to="/polityka-prywatnosci"
                      class="text-[#90a88c] hover:underline"
                    >
                      politykę prywatności
                    </NuxtLink>
                    . Oświadczam, że zapoznałem/am się z treścią tych
                    dokumentów.
                  </span>
                </label>
              </div>

              <button
                @click="processOrder"
                :disabled="!isFormValid || isProcessing"
                class="w-full mt-6 bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full py-4 font-bold transition-colors flex items-center justify-center space-x-2"
              >
                <span v-if="!isProcessing">
                  {{ getOrderButtonText() }}
                </span>
                <span v-else class="flex items-center space-x-2">
                  <div
                    class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                  ></div>
                  <span>Przetwarzanie...</span>
                </span>
              </button>

              <NuxtLink
                to="/cart"
                class="w-full mt-4 border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 rounded-full py-3 font-medium transition-colors text-center block"
              >
                Wróć do koszyka
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="cartItems.length === 0"
    class="min-h-screen flex items-center justify-center"
  >
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21"
          />
        </svg>
      </div>
      <p class="text-gray-500 text-lg mb-2">Twój koszyk jest pusty</p>
      <p class="text-gray-400 text-sm mb-6">
        Nie możesz przejść do kasy bez produktów w koszyku
      </p>
      <NuxtLink
        to="/catalog"
        class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full px-6 py-2 text-sm cursor-pointer transition-colors inline-block"
      >
        Przejdź do katalogu
      </NuxtLink>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "#app";
import { createOrderUseCase } from "@/domain/usecases/createOrder";
import type { CreateOrderPayload, OrderItem } from "@/types/order";

const router = useRouter();
const isLoading = ref(false);
const isProcessing = ref(false);

interface FormState {
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

const formState = ref<FormState>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  apartment: "",
  city: "",
  postalCode: "",
  country: "",
});

const cartItems = ref<OrderItem[]>([]);

const shippingMethods = ref([
  {
    id: "courier",
    name: "Kurier DPD/InPost",
    description: "Bezpieczna dostawa kurierska pod wskazany adres",
    deliveryTime: "1-2 dni robocze",
    price: 14.99,
    freeFrom: 250,
  },
  {
    id: "inpost",
    name: "Paczkomat InPost",
    description: "Najwygodniejsza i najszybsza opcja",
    deliveryTime: "1 dzień roboczy",
    price: 11.99,
    freeFrom: 250,
  },
  {
    id: "pickup",
    name: "Odbiór osobisty",
    description: "Odbiór w sklepie w Warszawie",
    deliveryTime: "24h - przygotowanie",
    price: 0,
    freeFrom: 0,
  },
]);

const selectedShipping = ref("inpost");

const paymentMethods = ref([
  {
    id: "online",
    name: "Płatność online",
    description: "Przelewy24 - Visa, Mastercard, BLIK",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>',
  },
  {
    id: "cod",
    name: "Płatność przy odbiorze",
    description: "Gotówka lub karta przy odbiorze",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>',
  },
  {
    id: "transfer",
    name: "Przelew tradycyjny",
    description: "Przelew bankowy",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>',
  },
]);

const selectedPayment = ref("online");
const promoCode = ref("");
const promoCodeError = ref("");
const promoCodeSuccess = ref("");
const discount = ref(0);
const termsAccepted = ref(false);

const loadCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cartItems.value = (cart as OrderItem[]).map((item) => ({
    id: String(item.id),
    title: item.title ?? "",
    category: item.category ?? "",
    size: item.size ?? "",
    price: item.price ?? 0,
    image: item.image ?? "",
    quantity: item.quantity ?? 1,
  }));
};

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
});

const selectedShippingPrice = computed(() => {
  const method = shippingMethods.value.find(
    (m) => m.id === selectedShipping.value,
  );
  if (!method) return 0;

  if (subtotal.value >= method.freeFrom) {
    return 0;
  }

  return method.price;
});

const totalPrice = computed(() => {
  const additionalFees =
    selectedPayment.value === "cod" ? subtotal.value * 0.01 : 0;
  return (
    subtotal.value +
    selectedShippingPrice.value +
    additionalFees -
    discount.value
  );
});

const getOrderButtonText = () => {
  return "Złóż zamówienie";
};

const isFormValid = computed(() => {
  return (
    formState.value.firstName.trim() &&
    formState.value.lastName.trim() &&
    formState.value.email.trim() &&
    formState.value.phone.trim() &&
    formState.value.street.trim() &&
    formState.value.city.trim() &&
    formState.value.postalCode.trim() &&
    formState.value.country &&
    selectedShipping.value &&
    selectedPayment.value &&
    termsAccepted.value
  );
});

const applyPromoCode = () => {
  promoCodeError.value = "";
  promoCodeSuccess.value = "";

  if (!promoCode.value.trim()) {
    promoCodeError.value = "Wpisz kod promocyjny";
    return;
  }

  const validCodes: Record<string, number> = {
    WELCOME10: 0.1,
    PLANTLOVER: 0.15,
    SPRING2026: 0.2,
    FREESHIP: -selectedShippingPrice.value,
  };

  const code = promoCode.value.toUpperCase();

  if (validCodes[code]) {
    if (code === "FREESHIP") {
      discount.value = -validCodes[code];
      promoCodeSuccess.value = "Darmowa dostawa została zastosowana!";
    } else {
      discount.value = subtotal.value * validCodes[code];
      promoCodeSuccess.value = `Kod promocyjny zastosowany! Rabat: ${(validCodes[code] * 100).toFixed(0)}%`;
    }
  } else {
    promoCodeError.value = "Nieprawidłowy kod promocyjny";
  }
};

const processOrder = async () => {
  if (!isFormValid.value) {
    alert("Proszę uzupełnić wszystkie wymagane pola i zaakceptować regulamin");
    return;
  }

  if (cartItems.value.length === 0) {
    alert("Twój koszyk jest pusty");
    return;
  }

  try {
    isProcessing.value = true;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const shippingMethod = shippingMethods.value.find(
      (m) => m.id === selectedShipping.value,
    );
    const paymentMethod = paymentMethods.value.find(
      (m) => m.id === selectedPayment.value,
    );

    const additionalFees =
      selectedPayment.value === "cod" ? subtotal.value * 0.01 : 0;
    const orderPayload: CreateOrderPayload = {
      orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      customer: formState.value,
      items: cartItems.value,
      shipping: {
        method: shippingMethod?.name || "",
        description: shippingMethod?.description || "",
        deliveryTime: shippingMethod?.deliveryTime || "",
        cost: selectedShippingPrice.value,
      },
      payment: {
        method: paymentMethod?.name || "",
        description: paymentMethod?.description || "",
      },
      subtotal: subtotal.value,
      shippingCost: selectedShippingPrice.value,
      additionalFees,
      discount: discount.value,
      total: totalPrice.value,
      status: "pending",
      promoCode: promoCode.value || null,
    };

    const orderId = await createOrderUseCase(orderPayload);

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));

    await router.push(`/order-confirmation/${orderId}`);
  } catch (error) {
    console.error("Błąd podczas składania zamówienia:", error);
    alert("Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.");
  } finally {
    isProcessing.value = false;
  }
};

onMounted(() => {
  isLoading.value = true;
  loadCart();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (currentUser) {
    formState.value.email = currentUser.email || "";
    formState.value.firstName = currentUser.name?.split(" ")[0] || "";
    formState.value.lastName = currentUser.name?.split(" ")[1] || "";
  }

  isLoading.value = false;

  window.addEventListener("cartUpdated", loadCart);
});

onBeforeUnmount(() => {
  window.removeEventListener("cartUpdated", loadCart);
});
</script>

<style scoped>
.max-h-64 {
  max-height: 16rem;
}

input[type="radio"]:checked {
  accent-color: #90a88c !important;
}

.custom-checkbox {
  accent-color: #90a88c;
}

.custom-checkbox:checked {
  background-color: #90a88c;
  border-color: #90a88c;
}

.custom-checkbox:focus {
  outline: 2px solid #90a88c;
  outline-offset: 2px;
}
</style>
