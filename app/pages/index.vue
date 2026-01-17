<template>
  <div
    v-if="!isLoading"
    class="flex flex-col items-center px-4 sm:px-6 lg:px-8"
  >
    <div
      class="w-full max-w-5xl h-64 md:h-80 lg:h-96 bg-[#ececec] relative mb-0"
    >
      <img :src="heroImage" class="absolute bottom-0 w-full" />
      <div
        class="absolute top-12 md:top-18 lg:top-24 left-6 md:left-12 lg:left-20 font-poppins font-bold text-xl md:text-2xl lg:text-3xl text-[#1e1e1e]"
      >
        Kwiaty do Twojego domu
      </div>
      <div
        class="absolute left-6 md:left-12 lg:left-20 top-24 md:top-34 lg:top-44 max-w-80 md:max-w-96 font-poppins font-bold text-xs md:text-sm text-[#1e1e1e]"
      >
        <p>
          Rośliny w doniczkach staną się pięknym i modnym dodatkiem do wnętrza
          Twojego mieszkania lub biura.
        </p>
      </div>
      <div
        class="absolute left-6 md:left-12 lg:left-20 top-40 md:top-50 lg:top-64"
      >
        <NuxtLink
          to="/catalog"
          class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white text-sm md:text-base rounded-full px-4 md:px-5 py-2 cursor-pointer font-bold"
        >
          PRZEJDŹ DO KATALOGU
        </NuxtLink>
      </div>
    </div>

    <div class="w-full max-w-5xl mt-8 md:mt-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <CategoryCard
          :image="fikusy"
          title="Fikusy"
          description="Niezawodne rośliny, które zawsze ozdobią Twój dom"
        />
        <CategoryCard
          :image="kaktusy"
          title="Kaktusy"
          description="Małe i duże kaktusy potrafią pokazać charakter ich właściciela"
        />
        <CategoryCard
          :image="iglice"
          title="Iglice"
          description="Efektowne dekoracje wnętrza"
        />
        <CategoryCard
          :image="zamiokulkasy"
          title="Zamiokulkasy"
          description="Staną się lakonicznym elementem dekoracyjnym"
        />
      </div>
    </div>

    <div class="w-full max-w-5xl flex items-start mt-8 md:mt-10">
      <p class="font-poppins font-bold tracking-[0.025em] text-xl md:text-2xl">
        Oferty miesiąca
      </p>
    </div>

    <div class="w-full max-w-5xl mt-8 md:mt-10 mb-8 md:mb-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <OfferCard
          :image="fikus2"
          category="Fikusy"
          title="Fikus „Maluszek”"
          :price="89.99"
          :oldPrice="119.99"
          discount="-25%"
        />
        <OfferCard
          :image="kaktus2"
          category="Kaktusy"
          title="Kaktus „Malusieńki”"
          :price="34.99"
          :oldPrice="49.99"
          discount="-30%"
        />
        <OfferCard
          :image="sukulent"
          category="Sukulenty"
          title="Aloes Wera „Piękny”"
          :price="45.5"
        />
        <OfferCard
          :image="fikus3"
          category="Fikusy"
          title="Fikus „Gigantyczny”"
          :price="29.99"
          :oldPrice="39.99"
          discount="-20%"
        />
      </div>
    </div>

    <div class="flex justify-center mb-20 md:mb-25 mt-8 md:mt-10">
      <NuxtLink
        to="/catalog"
        class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white text-sm md:text-base rounded-full px-4 md:px-5 py-1 cursor-pointer font-bold"
      >
        PRZEJDŹ DO KATALOGU
      </NuxtLink>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie strony...</p>
    </div>
  </div>
</template>

<script setup>
import CategoryCard from "@/components/CategoryCard.vue";
import OfferCard from "@/components/OfferCard.vue";
import { useAssetUrl } from "@/composables/useAssetUrl";

const { resolveAssetUrl } = useAssetUrl();

const heroImage = resolveAssetUrl("/index.png");
const fikusy = resolveAssetUrl("/plants/fikus.webp");
const kaktusy = resolveAssetUrl("/plants/kaktus.webp");
const iglice = resolveAssetUrl("/plants/iglica.webp");
const zamiokulkasy = resolveAssetUrl("/plants/zamiokulkas.webp");
const fikus2 = resolveAssetUrl("/plants/fikus2.webp");
const kaktus2 = resolveAssetUrl("/plants/kaktus2.webp");
const sukulent = resolveAssetUrl("/plants/sukulent.webp");
const fikus3 = resolveAssetUrl("/plants/fikus3.webp");

const isLoading = ref(false);
</script>
