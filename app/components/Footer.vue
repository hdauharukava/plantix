<template>
  <footer class="h-120 md:h-64 bg-primary relative">
    <div class="max-w-7xl mx-auto w-full h-full relative">
      <div class="hidden md:block">
        <div class="absolute right-6 top-9 flex items-center space-x-4">
          <img
            src="@/assets/icons/Instagram.svg"
            alt="Instagram"
            class="w-8 h-8 cursor-pointer"
          />
          <img
            src="@/assets/icons/Facebook.svg"
            alt="Facebook"
            class="w-8 h-8 cursor-pointer"
          />
        </div>

        <div class="absolute right-6 bottom-12 space-x-4">
          <button
            class="w-60 h-10 border border-white font-bold text-sm text-white"
          >
            e-mail
          </button>
          <button
            class="w-30 h-10 bg-white font-bold text-sm text-[#90A88C] hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            subskrybuj
          </button>
        </div>

        <div class="flex items-center space-x-4 absolute left-6 top-9">
          <button class="text-white text-sm cursor-pointer hover:underline">
            Katalog
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Porady dotyczące pielęgnacji
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Płatność i dostawa
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Kontakt
          </button>
        </div>
        <div class="absolute left-6 bottom-12">
          <p class="text-white text-sm">
            ©2025 sklep z kwiatami i roślinami PLANTIX
          </p>
        </div>
        <div class="absolute left-6 bottom-18">
          <img src="@/assets/icons/LogoWhite.svg" class="h-8" />
        </div>
      </div>

      <div
        class="md:hidden flex flex-col items-center justify-center h-full space-y-8"
      >
        <div class="flex flex-col items-center space-y-3">
          <button class="text-white text-sm cursor-pointer hover:underline">
            Katalog
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Porady dotyczące pielęgnacji
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Płatność i dostawa
          </button>
          <button class="text-white text-sm cursor-pointer hover:underline">
            Kontakt
          </button>
        </div>

        <div class="flex items-center space-x-3">
          <img
            src="@/assets/icons/Instagram.svg"
            alt="Instagram"
            class="w-8 h-8 cursor-pointer"
          />
          <img
            src="@/assets/icons/Facebook.svg"
            alt="Facebook"
            class="w-8 h-8 cursor-pointer"
          />
        </div>

        <div class="flex flex-col items-center space-y-3">
          <button
            class="w-80 h-10 border border-white font-bold text-sm text-white"
          >
            e-mail
          </button>
          <button
            class="w-32 h-10 bg-white font-bold text-sm text-[#90A88C] hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            subskrybuj
          </button>
        </div>

        <div class="flex flex-col items-center space-y-3">
          <img src="@/assets/icons/LogoWhite.svg" class="h-8" />
          <p class="text-white text-sm text-center">
            ©2025 sklep z kwiatami i roślinami PLANTIX
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
