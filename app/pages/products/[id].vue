<template>
  <div v-if="plant" class="min-h-screen bg-gray-50">
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center space-x-2 text-sm">
          <NuxtLink to="/catalog" class="text-gray-600 hover:text-[#90a88c]">
            Katalog roślin
          </NuxtLink>
          <span class="text-gray-400">/</span>
          <span class="text-gray-400">{{ plant.category }}</span>
          <span class="text-gray-400">/</span>
          <span class="text-gray-900 font-medium line-clamp-1">{{
            plant.title
          }}</span>
        </nav>
      </div>
    </div>
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <div class="rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                :src="plant.image"
                :alt="plant.title"
                class="w-full h-80 md:h-96 object-cover"
              />
            </div>

            <div class="grid grid-cols-4 gap-4">
              <div
                v-for="(thumbnail, index) in [plant.image]"
                :key="index"
                class="rounded-lg overflow-hidden border-2 border-transparent hover:border-[#90a88c] cursor-pointer transition-colors"
                @click="selectImage(thumbnail)"
              >
                <img
                  :src="thumbnail"
                  :alt="`${plant.title} - zdjęcie ${index + 1}`"
                  class="w-full h-20 object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <div class="mb-6">
              <h1
                class="font-poppins font-bold text-3xl md:text-4xl text-[#1e1e1e] mb-3"
              >
                {{ plant.title }}
              </h1>

              <div class="flex items-center space-x-4 mb-4">
                <div class="flex items-center space-x-2">
                  <span class="font-bold text-2xl text-[#1e1e1e]">
                    {{ plant.price.toFixed(2) }} zł
                  </span>
                  <span
                    v-if="plant.oldPrice"
                    class="text-lg text-gray-400 line-through"
                  >
                    {{ plant.oldPrice.toFixed(2) }} zł
                  </span>
                </div>
                <span
                  v-if="plant.discount"
                  class="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full"
                >
                  {{ plant.discount }}
                </span>
              </div>

              <!-- Категория и размер -->
              <div
                class="flex items-center space-x-4 text-sm text-gray-600 mb-6"
              >
                <span class="bg-gray-100 px-3 py-1 rounded-full">
                  {{ plant.category }}
                </span>
                <span class="bg-gray-100 px-3 py-1 rounded-full">
                  {{ getSizeName(plant.size) }}
                </span>
              </div>
            </div>

            <div class="mb-8">
              <h2 class="font-semibold text-lg text-gray-900 mb-3">
                Opis rośliny
              </h2>
              <p class="text-gray-700 leading-relaxed">
                {{ plant.description || getDefaultDescription(plant) }}
              </p>
            </div>

            <div class="mb-8">
              <h2 class="font-semibold text-lg text-gray-900 mb-4">
                Charakterystyka
              </h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"
                  >
                    <img
                      src="@/assets/icons/Sun.svg"
                      alt="Światło"
                      class="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Wymagania świetlne</p>
                    <p class="font-medium">
                      {{ getLightRequirements(plant.category) }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"
                  >
                    <img
                      src="@/assets/icons/Water.svg"
                      alt="Podlewanie"
                      class="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Podlewanie</p>
                    <p class="font-medium">
                      {{ getWateringRequirements(plant.category) }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center"
                  >
                    <img
                      src="@/assets/icons/Temperature.svg"
                      alt="Temperatura"
                      class="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Temperatura</p>
                    <p class="font-medium">
                      {{ getTemperatureRequirements(plant.category) }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-[#90a88c]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L3 9v11h6v-7h6v7h6V9l-9-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Poziom trudności</p>
                    <p class="font-medium">
                      {{ getDifficultyLevel(plant.category) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="addToCart"
                class="flex-1 bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center space-x-2"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Dodaj do koszyka</span>
              </button>

              <button
                @click="toggleFavorite"
                class="w-12 h-12 border border-gray-300 hover:border-gray-400 rounded-full transition-colors duration-200 flex items-center justify-center"
                :class="{ 'border-red-500': isFavorite }"
                aria-label="Dodaj do ulubionych"
              >
                <svg
                  class="w-5 h-5"
                  :class="isFavorite ? 'text-red-500' : 'text-gray-500'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <div class="mt-8 pt-8 border-t border-gray-200">
              <h2 class="font-semibold text-lg text-gray-900 mb-4">
                Dodatkowe informacje
              </h2>
              <div class="space-y-3 text-sm text-gray-600">
                <div class="flex justify-between">
                  <span>Dostępność:</span>
                  <span class="font-medium text-green-600">W magazynie</span>
                </div>
                <div class="flex justify-between">
                  <span>Dostawa:</span>
                  <span class="font-medium">2-3 dni robocze</span>
                </div>
                <div class="flex justify-between">
                  <span>Gwarancja:</span>
                  <span class="font-medium">30 dni na zwrot</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16 pt-8 border-t border-gray-200">
          <h2 class="font-poppins font-bold text-2xl text-[#1e1e1e] mb-6">
            Podobne rośliny
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <PlantCard
              v-for="similarPlant in similarPlants"
              :key="similarPlant.id"
              :id="similarPlant.id"
              :image="similarPlant.image"
              :category="similarPlant.category"
              :title="similarPlant.title"
              :price="similarPlant.price"
              :old-price="similarPlant.oldPrice ?? undefined"
              :discount="similarPlant.discount ?? undefined"
              :size="similarPlant.size"
              class="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie produktu...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { allPlants } from "@/composables/usePlants";
import type { Plant } from "@/types/plants";
import PlantCard from "@/components/PlantCard.vue";

const route = useRoute();
const router = useRouter();

const plant = ref<Plant | null>(null);
const selectedImage = ref<string>("");
const isFavorite = ref(false);

const id = parseInt(route.params.id as string);
plant.value = allPlants.find((p) => p.id === id) || null;

if (!plant.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Produkt nie znaleziony",
  });
}

selectedImage.value = plant.value.image;

const similarPlants = computed(() => {
  if (!plant.value) return [];
  return allPlants
    .filter(
      (p) => p.category === plant.value!.category && p.id !== plant.value!.id,
    )
    .slice(0, 4);
});

const checkFavoriteStatus = () => {
  if (typeof window !== "undefined") {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    isFavorite.value = favorites.includes(plant.value?.id);
  }
};

const getSizeName = (size: string) => {
  const sizes: Record<string, string> = {
    small: "Mały",
    medium: "Średni",
    large: "Duży",
  };
  return sizes[size] || size;
};

const getDefaultDescription = (plant: Plant) => {
  const descriptions: Record<string, string> = {
    Fikusy:
      "Fikus to popularna roślina doniczkowa, znana ze swoich pięknych, błyszczących liści. Idealna do nowoczesnych wnętrz.",
    Kaktusy:
      "Kaktus to wytrzymała roślina, która świetnie radzi sobie w różnych warunkach. Doskonała dla początkujących.",
    Iglice:
      "Iglice to eleganckie rośliny o delikatnych igiełkach. Nadają wnętrzom naturalny, leśny charakter.",
    Zamiokulkasy:
      "Zamiokulkas to żelazna roślina, bardzo wytrzymała i łatwa w uprawie. Idealna do miejsc o słabym oświetleniu.",
    Sukulenty:
      "Sukulenty to rośliny magazynujące wodę w liściach. Charakteryzują się różnorodnymi kształtami i kolorami.",
    Monstery:
      "Monstera to modna roślina o charakterystycznych, postrzępionych liściach. Wymaga więcej uwagi, ale efekt jest wart zachodu.",
  };
  return (
    descriptions[plant.category] ||
    "Piękna roślina doniczkowa, która ozdobi każde wnętrze."
  );
};

const getLightRequirements = (category: string) => {
  const requirements: Record<string, string> = {
    Fikusy: "Średnie",
    Kaktusy: "Duże",
    Iglice: "Średnie",
    Zamiokulkasy: "Małe",
    Sukulenty: "Duże",
    Monstery: "Średnie",
  };
  return requirements[category] || "Średnie";
};

const getWateringRequirements = (category: string) => {
  const requirements: Record<string, string> = {
    Fikusy: "Umiarkowane",
    Kaktusy: "Rzadkie",
    Iglice: "Regularne",
    Zamiokulkasy: "Rzadkie",
    Sukulenty: "Rzadkie",
    Monstery: "Regularne",
  };
  return requirements[category] || "Umiarkowane";
};

const getTemperatureRequirements = (category: string) => {
  return "18-25°C";
};

const getDifficultyLevel = (category: string) => {
  const levels: Record<string, string> = {
    Fikusy: "Średni",
    Kaktusy: "Łatwy",
    Iglice: "Łatwy",
    Zamiokulkasy: "Łatwy",
    Sukulenty: "Łatwy",
    Monstery: "Średni",
  };
  return levels[category] || "Średni";
};

const selectImage = (image: string) => {
  selectedImage.value = image;
};

const addToCart = () => {
  if (!plant.value) return;

  if (typeof window !== "undefined") {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === plant.value!.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: plant.value.id,
        title: plant.value.title,
        price: plant.value.price,
        image: plant.value.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${plant.value.title} został dodany do koszyka!`);
  }
};

const toggleFavorite = () => {
  if (!plant.value) return;

  if (typeof window !== "undefined") {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite.value) {
      const index = favorites.indexOf(plant.value.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    } else {
      favorites.push(plant.value.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    isFavorite.value = !isFavorite.value;

    window.dispatchEvent(new Event("favoritesUpdated"));
  }
};

const shareProduct = () => {
  if (navigator.share) {
    navigator.share({
      title: plant.value?.title,
      text: `Sprawdź tę piękną roślinę: ${plant.value?.title}`,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Link do produktu został skopiowany do schowka!");
  }
};

onMounted(() => {
  checkFavoriteStatus();
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
