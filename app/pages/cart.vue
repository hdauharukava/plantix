<template>
  <div
    v-if="!isLoading"
    class="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8"
  >
    <div class="w-full max-w-5xl mb-8">
      <div>
        <h1 class="font-poppins font-bold text-2xl md:text-3xl text-[#1e1e1e]">
          Koszyk
        </h1>
        <p class="text-gray-600 mt-2">Twoje produkty do zakupu</p>
      </div>
    </div>

    <div class="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
      <div class="lg:w-2/3">
        <div v-if="cartItems.length > 0" class="space-y-6">
          <div
            class="hidden md:grid grid-cols-10 gap-4 px-4 py-3 bg-gray-50 rounded-lg"
          >
            <div class="col-span-5">
              <span class="text-sm font-semibold text-gray-700">Produkt</span>
            </div>
            <div class="col-span-2 text-center">
              <span class="text-sm font-semibold text-gray-700">Cena</span>
            </div>
            <div class="col-span-3 text-center">
              <span class="text-sm font-semibold text-gray-700">Ilość</span>
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div
                class="flex flex-col md:grid md:grid-cols-10 md:gap-4 md:items-center"
              >
                <div
                  class="col-span-5 flex items-center space-x-4 mb-4 md:mb-0"
                >
                  <NuxtLink
                    :to="`/products/${item.id}`"
                    class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden"
                  >
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </NuxtLink>
                  <div class="flex-1 min-w-0">
                    <NuxtLink
                      :to="`/products/${item.id}`"
                      class="block hover:text-[#90a88c] transition-colors"
                    >
                      <h3
                        class="font-semibold text-sm md:text-base text-gray-900 mb-1 line-clamp-2"
                      >
                        {{ item.title }}
                      </h3>
                    </NuxtLink>
                    <p class="text-xs text-gray-500 mb-1">
                      {{ item.category }}
                    </p>
                    <p class="text-sm text-gray-600" v-if="item.size">
                      Rozmiar: {{ getSizeName(item.size) }}
                    </p>
                    <div class="md:hidden mt-2">
                      <div class="flex items-center space-x-2">
                        <span class="font-bold text-lg text-[#1e1e1e]"
                          >{{ item.price.toFixed(2) }} zł</span
                        >
                        <span
                          v-if="item.oldPrice"
                          class="text-sm text-gray-500 line-through ml-1"
                        >
                          {{ item.oldPrice?.toFixed(2) }} zł
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="hidden md:flex col-span-2 flex-col items-center">
                  <NuxtLink
                    :to="`/products/${item.id}`"
                    class="flex flex-col items-center hover:text-[#90a88c] transition-colors"
                  >
                    <span class="font-bold text-lg text-[#1e1e1e]"
                      >{{ item.price.toFixed(2) }} zł</span
                    >
                    <span
                      v-if="item.oldPrice"
                      class="text-xs text-gray-500 mt-1 line-through"
                    >
                      {{ item.oldPrice?.toFixed(2) }} zł
                    </span>
                  </NuxtLink>
                </div>

                <div
                  class="col-span-3 flex items-center justify-between md:justify-center md:space-x-4"
                >
                  <div class="flex items-center space-x-3">
                    <button
                      @click.stop="decreaseQuantity(item.id)"
                      class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                      :disabled="item.quantity <= 1"
                      :class="{
                        'opacity-50 cursor-not-allowed': item.quantity <= 1,
                      }"
                    >
                      <svg
                        class="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>

                    <span class="font-semibold text-lg min-w-8 text-center">
                      {{ item.quantity }}
                    </span>

                    <button
                      @click.stop="increaseQuantity(item.id)"
                      class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        class="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    @click.stop="removeFromCart(item.id)"
                    class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100"
        >
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
            Dodaj rośliny do koszyka, aby je kupić
          </p>
          <NuxtLink
            to="/catalog"
            class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full px-6 py-2 text-sm cursor-pointer transition-colors inline-block"
          >
            Przejdź do katalogu
          </NuxtLink>
        </div>
      </div>

      <div class="lg:w-1/3">
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-8"
        >
          <h2 class="font-poppins font-bold text-lg mb-6">Podsumowanie</h2>

          <div v-if="cartItems.length > 0" class="space-y-4 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Liczba produktów:</span>
              <span class="font-semibold">{{ totalItems }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Wartość produktów:</span>
              <span class="font-semibold">{{ subtotal.toFixed(2) }} zł</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Dostawa:</span>
              <span class="font-semibold"
                >{{ shippingCost.toFixed(2) }} zł</span
              >
            </div>
            <div class="border-t border-gray-200 pt-4">
              <div class="flex justify-between text-lg font-bold">
                <span>Razem:</span>
                <span class="text-[#1e1e1e]"
                  >{{ totalPrice.toFixed(2) }} zł</span
                >
              </div>
            </div>

            <button
              @click="proceedToCheckout"
              class="w-full mt-2 bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full py-3 font-bold transition-colors"
            >
              Przejdź do kasy
            </button>
          </div>

          <div v-else class="space-y-4 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Liczba produktów:</span>
              <span class="font-semibold">0</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Wartość produktów:</span>
              <span class="font-semibold">0,00 zł</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Dostawa:</span>
              <span class="font-semibold">0,00 zł</span>
            </div>
            <div class="border-t border-gray-200 pt-4">
              <div class="flex justify-between text-lg font-bold">
                <span>Razem:</span>
                <span class="text-[#1e1e1e]">0,00 zł</span>
              </div>
            </div>

            <button
              disabled
              class="w-full bg-gray-300 text-gray-500 rounded-full py-3 font-bold cursor-not-allowed"
            >
              Przejdź do kasy
            </button>
          </div>

          <NuxtLink
            to="/catalog"
            class="w-full border-1 border-[#90a88c] text-[#90a88c] hover:border-[#799573] hover:text-[#799573] active:border-[#647e5e] active:text-[#647e5e] text-sm rounded-full py-3 font-bold transition-colors text-center block"
          >
            Kontynuuj zakupy
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie koszyka...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { usePlantData } from "@/composables/usePlantData"
import type { Plant } from "@/composables/usePlantData"

const { getPlantById, getAllSizes } = usePlantData()
const sizes = getAllSizes()

const isLoading = ref(false)

interface CartItem extends Plant {
  quantity: number
}

const cartItems = ref<CartItem[]>([])

const loadCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  cartItems.value = cart
    .map((item: { id: number; quantity: number }) => {
      const plant = getPlantById(item.id)
      if (plant) {
        return {
          ...plant,
          quantity: item.quantity,
        }
      }
      return null
    })
    .filter(Boolean) as CartItem[]
}

const saveCart = () => {
  const cart = cartItems.value.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }))
  localStorage.setItem("cart", JSON.stringify(cart))

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"))
    window.dispatchEvent(new Event("storage"))
  }
}

const getSizeName = (size: string) => {
  const sizeObj = sizes.find(s => s.id === size)
  return sizeObj ? sizeObj.name : size
}

const increaseQuantity = (id: number) => {
  const item = cartItems.value.find((item) => item.id === id)
  if (item) {
    item.quantity++
    saveCart()
  }
}

const decreaseQuantity = (id: number) => {
  const item = cartItems.value.find((item) => item.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
    saveCart()
  }
}

const removeFromCart = (id: number) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id)
  saveCart()
}

const proceedToCheckout = () => {
  alert("Przechodzisz do kasy!")
}

const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
})

const shippingCost = computed(() => {
  return subtotal.value > 200 ? 0 : 19.99
})

const totalPrice = computed(() => {
  return subtotal.value + shippingCost.value
})

onMounted(() => {
  loadCart()
  window.addEventListener("cartUpdated", loadCart)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>