<template>
  <div class="flex flex-col items-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-5xl h-64 md:h-80 lg:h-96 bg-mygray relative mb-0">
      <img src="@/assets/index.png" class="absolute bottom-0 w-full "/>
      <div class="absolute top-12 md:top-18 lg:top-24 left-6 md:left-12 lg:left-20 font-poppins font-bold text-xl md:text-2xl lg:text-3xl text-[#1e1e1e]">
        Kwiaty do Twojego domu
      </div>
      <div class="absolute left-6 md:left-12 lg:left-20 top-24 md:top-34 lg:top-44 max-w-80 md:max-w-96 font-poppins font-bold text-xs md:text-sm text-[#1e1e1e]">
        <p>Rośliny w doniczkach staną się pięknym i modnym dodatkiem do wnętrza Twojego mieszkania lub biura.</p>
      </div>
      <div class="absolute left-6 md:left-12 lg:left-20 top-40 md:top-50 lg:top-64">
        <button class="bg-primary hover:bg-primary activ:bg-primary text-white text-sm md:text-base rounded-full px-4 md:px-5 py-1 cursor-pointer font-bold">
          PRZEJDŹ DO KATALOGU
        </button>
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
      <p class="text-primary text-xl md:text-2xl">Oferty miesiąca</p>
    </div>

    <div class="w-full max-w-5xl mt-8 md:mt-10 mb-8 md:mb-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <OfferCard
          :image="of1"
          category="Fikusy"
          title="Fikus „Maluszek”"
          :price="89.99"
          :oldPrice="119.99"
          discount="-25%"
        />
        <OfferCard
          :image="of2"
          category="Kaktusy"
          title="Kaktus „Malusieńki”"
          :price="34.99"
          :oldPrice="49.99"
          discount="-30%"
        />
        <OfferCard
          :image="of3"
          category="Sukulenty"
          title="Aloes Wera „Piękny”"
          :price="45.50"
        />
        <OfferCard
          :image="of4"
          category="Fikusy"
          title="Fikus „Gigantyczny”"
          :price="29.99"
          :oldPrice="39.99"
          discount="-20%"
        />
      </div>
    </div>

    <div class="flex justify-center mb-20 md:mb-25 mt-8 md:mt-10">
      <button class="bg-primary hover:bg-primary activ:bg-primary text-white text-sm md:text-base rounded-full px-4 md:px-5 py-1 cursor-pointer font-bold">
        PRZEJDŹ DO KATALOGU
      </button>
    </div>
  </div>
</template>

<script setup>
import CategoryCard from '@/components/CategoryCard.vue'
import OfferCard from '@/components/OfferCard.vue'
import fikusy from '@/assets/fikusy.png'
import kaktusy from '@/assets/kaktusy.png'
import iglice from '@/assets/iglice.png'
import zamiokulkasy from '@/assets/zamiokulkasy.png'
import of1 from '@/assets/of1.png'
import of2 from '@/assets/of2.png'
import of3 from '@/assets/of3.png'
import of4 from '@/assets/of4.png'
</script>