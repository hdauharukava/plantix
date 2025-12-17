<template>
  <div class="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
    <div class="w-full max-w-5xl mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h1
            class="font-poppins font-bold text-2xl md:text-3xl text-[#1e1e1e]"
          >
            Płatność i dostawa
          </h1>
          <p class="text-gray-600 mt-2">
            Informacje o metodach płatności, kosztach i terminach dostawy
          </p>
        </div>
      </div>
    </div>

    <div class="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="lg:w-2/3">
        <div class="space-y-8">
          <!-- Payment Methods -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="font-poppins font-bold text-lg mb-6">
              Metody płatności
            </h2>

            <div class="space-y-6">
              <!-- Online Payment -->
              <div
                class="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
              >
                <div class="flex items-start gap-4">
                  <div class="bg-[#90a88c]/10 p-3 rounded-lg">
                    <svg
                      class="w-6 h-6 text-[#90a88c]"
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
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-2">
                      Płatność online
                    </h3>
                    <div class="space-y-2">
                      <p class="text-gray-600 text-sm">
                        Bezpieczna płatność kartą kredytową lub debetową przez
                        system płatności Przelewy24.
                      </p>
                      <div class="flex flex-wrap gap-2 mt-3">
                        <div
                          class="bg-gray-50 px-3 py-1 rounded text-xs text-gray-600 border border-gray-200"
                        >
                          Visa
                        </div>
                        <div
                          class="bg-gray-50 px-3 py-1 rounded text-xs text-gray-600 border border-gray-200"
                        >
                          Mastercard
                        </div>
                        <div
                          class="bg-gray-50 px-3 py-1 rounded text-xs text-gray-600 border border-gray-200"
                        >
                          Blik
                        </div>
                        <div
                          class="bg-gray-50 px-3 py-1 rounded text-xs text-gray-600 border border-gray-200"
                        >
                          Przelew24
                        </div>
                      </div>
                      <p class="text-xs text-green-600 font-medium mt-3">
                        Szybsza realizacja zamówienia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cash on Delivery -->
              <div
                class="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
              >
                <div class="flex items-start gap-4">
                  <div class="bg-[#90a88c]/10 p-3 rounded-lg">
                    <svg
                      class="w-6 h-6 text-[#90a88c]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-2">
                      Płatność przy odbiorze
                    </h3>
                    <div class="space-y-2">
                      <p class="text-gray-600 text-sm">
                        Zapłać gotówką lub kartą przy odbiorze przesyłki od
                        kuriera.
                      </p>
                      <div class="text-xs text-gray-500 mt-2">
                        <p class="font-medium mb-1">Dodatkowe opłaty:</p>
                        <ul class="list-disc list-inside space-y-1">
                          <li>+8,99 zł - opłata za pobranie</li>
                          <li>Przy płatności kartą: +1% wartości zamówienia</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bank Transfer -->
              <div
                class="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
              >
                <div class="flex items-start gap-4">
                  <div class="bg-[#90a88c]/10 p-3 rounded-lg">
                    <svg
                      class="w-6 h-6 text-[#90a88c]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-2">
                      Przelew tradycyjny
                    </h3>
                    <div class="space-y-2">
                      <p class="text-gray-600 text-sm">
                        Przelew na konto bankowe. Wysyłka następuje po
                        zaksięgowaniu wpłaty.
                      </p>
                      <div class="text-xs text-gray-500 mt-2">
                        <p class="font-medium mb-1">Dane do przelewu:</p>
                        <div
                          class="bg-gray-50 p-3 rounded border border-gray-200"
                        >
                          <p class="font-mono text-sm">Plantix Sp. z o.o.</p>
                          <p class="font-mono text-sm">
                            ul. Zielona 42, 00-001 Warszawa
                          </p>
                          <p class="font-mono text-sm mt-1">Bank: MBank</p>
                          <p class="font-mono text-sm">
                            Nr konta: 12 3456 7890 1234 5678 9012 3456
                          </p>
                          <p class="font-mono text-sm">
                            Tytuł przelewu: Zamówienie #[numer zamówienia]
                          </p>
                        </div>
                      </div>
                      <p class="text-xs text-amber-600 font-medium mt-3">
                        Realizacja zamówienia 1-2 dni robocze po zaksięgowaniu
                        wpłaty
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:w-1/3">
        <div class="space-y-8">
          <!-- Important Information -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="font-poppins font-bold text-lg mb-6">
              Ważne informacje
            </h2>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-[#90a88c] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <div>
                  <h3 class="font-semibold text-gray-900 text-sm mb-1">
                    Bezpieczeństwo płatności
                  </h3>
                  <p class="text-gray-600 text-xs">
                    Wszystkie płatności online są szyfrowane i chronione przez
                    system Przelewy24.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-[#90a88c] mt-0.5 flex-shrink-0"
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
                <div>
                  <h3 class="font-semibold text-gray-900 text-sm mb-1">
                    Gwarancja jakości
                  </h3>
                  <p class="text-gray-600 text-xs">
                    Wszystkie rośliny są zdrowe i starannie wyselekcjonowane.
                    14-dniowa gwarancja na rośliny.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-[#90a88c] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 class="font-semibold text-gray-900 text-sm mb-1">
                    Ekologiczne opakowania
                  </h3>
                  <p class="text-gray-600 text-xs">
                    Używamy biodegradowalnych i nadających się do recyklingu
                    materiałów do pakowania.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Times -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="font-poppins font-bold text-lg mb-6">
              Czasy realizacji
            </h2>

            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-semibold text-gray-900 text-sm mb-2">
                  Przygotowanie zamówienia
                </h3>
                <p class="text-gray-600 text-xs">
                  Zamówienia złożone do godziny 14:00 są przygotowywane tego
                  samego dnia. Zamówienia złożone po 14:00 - następnego dnia
                  roboczego.
                </p>
              </div>

              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-semibold text-gray-900 text-sm mb-2">
                  Dostawy w weekend
                </h3>
                <p class="text-gray-600 text-xs">
                  Kurier DPD: Dostawa możliwa w sobotę za dodatkową opłatą 9,99
                  zł. Paczkomaty: Dostępne 7 dni w tygodniu.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-gray-900 text-sm mb-2">
                  Święta i dni wolne
                </h3>
                <p class="text-gray-600 text-xs">
                  W dni ustawowo wolne od pracy dostawy nie są realizowane. Czas
                  dostawy ulega odpowiedniemu wydłużeniu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full max-w-5xl mb-8 mt-8 space-y-8">
      <!-- Delivery Methods -->
      <!-- Delivery Methods - Horizontal Layout -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="font-poppins font-bold text-lg mb-6">Metody dostawy</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Courier -->
          <div
            class="border border-gray-100 rounded-lg p-5 hover:border-gray-200 transition-colors"
          >
            <div class="flex flex-col h-full">
              <div
                class="bg-[#90a88c]/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-6 h-6 text-[#90a88c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">
                Kurier DPD/InPost
              </h3>
              <div class="space-y-3 flex-grow">
                <p class="text-gray-600 text-sm">
                  Bezpieczna dostawa kurierska pod wskazany adres. Rośliny
                  pakowane są w specjalne opakowania zabezpieczające.
                </p>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Koszt:</span>
                    <span class="text-[#90a88c] font-semibold mr-2"
                      >14,99 zł</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Czas:</span>
                    <span class="text-gray-600 mr-2 mr-2">1-2 dni</span>
                  </div>
                </div>
                <div class="text-xs text-gray-500 mt-auto pt-2">
                  <p class="font-medium">Darmowa dostawa od:</p>
                  <p class="text-[#90a88c] font-semibold">250 zł</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Paczkomat -->
          <div
            class="border border-gray-100 rounded-lg p-5 hover:border-gray-200 transition-colors"
          >
            <div class="flex flex-col h-full">
              <div
                class="bg-[#90a88c]/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-6 h-6 text-[#90a88c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Paczkomat InPost</h3>
              <div class="space-y-3 flex-grow">
                <p class="text-gray-600 text-sm">
                  Najwygodniejsza i najszybsza opcja. Rośliny specjalnie
                  zabezpieczone do transportu w paczkomatach.
                </p>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Koszt:</span>
                    <span class="text-[#90a88c] font-semibold mr-2"
                      >11,99 zł</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Czas:</span>
                    <span class="text-gray-600 mr-2">1 dzień</span>
                  </div>
                </div>
                <div class="text-xs text-green-600 font-medium mt-auto pt-2">
                  Najczęściej wybierana opcja
                </div>
              </div>
            </div>
          </div>

          <!-- Store Pickup -->
          <div
            class="border border-gray-100 rounded-lg p-5 hover:border-gray-200 transition-colors"
          >
            <div class="flex flex-col h-full">
              <div
                class="bg-[#90a88c]/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-6 h-6 text-[#90a88c]"
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
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Odbiór osobisty</h3>
              <div class="space-y-3 flex-grow">
                <p class="text-gray-600 text-sm">
                  Odbiór zamówienia w naszym sklepie stacjonarnym w Warszawie.
                </p>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Koszt:</span>
                    <span class="text-[#90a88c] font-semibold mr-2">0 zł</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700"
                      >Przygotowanie:</span
                    >
                    <span class="text-gray-600 mr-2">24h</span>
                  </div>
                </div>
                <div class="text-xs text-gray-500 mt-auto pt-2">
                  <p class="font-medium">Godziny odbioru:</p>
                  <p>Pon-Pt: 9:00-18:00</p>
                  <p>Sob: 10:00-15:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- FAQ -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="font-poppins font-bold text-lg mb-6">Najczęstsze pytania</h2>

        <div class="space-y-4">
          <div class="border border-gray-100 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-2">
              Czy rośliny są odpowiednio zabezpieczone podczas transportu?
            </h3>
            <p class="text-gray-600 text-sm">
              Tak, wszystkie rośliny są specjalnie pakowane w stabilne kartonowe
              pudła z warstwą ochronną. Wewnątrz znajdują się stabilizatory
              zabezpieczające doniczkę i ziemię. W okresie zimowym dodajemy też
              termoizolację.
            </p>
          </div>

          <div class="border border-gray-100 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-2">
              Co jeśli roślina zostanie uszkodzona podczas transportu?
            </h3>
            <p class="text-gray-600 text-sm">
              W przypadku uszkodzenia rośliny podczas transportu, prosimy o
              kontakt w ciągu 48 godzin od dostawy. Wymienimy roślinę na nową
              lub zwrócimy pieniądze. Wystarczy przesłać zdjęcia uszkodzeń na
              adres: reklamacje@plantix.pl
            </p>
          </div>

          <div class="border border-gray-100 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-2">
              Czy mogę zmienić adres dostawy po złożeniu zamówienia?
            </h3>
            <p class="text-gray-600 text-sm">
              Tak, możesz zmienić adres dostawy kontaktując się z nami pod
              numerem +48 123 456 789 lub pisząc na kontakt@plantix.pl, pod
              warunkiem że zamówienie nie zostało jeszcze przekazane do wysyłki.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
