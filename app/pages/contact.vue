<template>
  <div class="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
    <div class="w-full max-w-5xl mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h1
            class="font-poppins font-bold text-2xl md:text-3xl text-gray-900"
          >
            Skontaktuj się z nami
          </h1>
          <p class="text-gray-600 mt-2">
            Jesteśmy tutaj, aby odpowiedzieć na wszystkie Twoje pytania
            dotyczące naszych roślin
          </p>
        </div>
      </div>
    </div>

    <div class="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
      <div class="lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="font-poppins font-bold text-lg mb-6">Wyślij wiadomość</h2>

          <form @submit.prevent="sendMessage" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Imię *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nazwisko *
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Wiadomość *
              </label>
              <textarea
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90a88c] focus:border-[#90a88c] focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <div class="flex items-center">
              <input
                id="privacy"
                v-model="form.privacy"
                type="checkbox"
                required
                class="custom-checkbox h-4 w-4 rounded border-gray-300 focus:ring-[#90a88c] focus:ring-2 focus:ring-offset-0"
              />
              <label for="privacy" class="ml-3 text-xs text-gray-600">
                * Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie
                z polityką prywatności
              </label>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white rounded-full py-2 font-bold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Wyślij wiadomość</span>
              <span v-else class="flex items-center justify-center">
                <svg
                  class="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Wysyłanie...
              </span>
            </button>
          </form>
        </div>
      </div>

      <div class="lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="font-poppins font-bold text-lg mb-6">Dane kontaktowe</h2>

          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-[#90a88c]/10 p-3 rounded-lg mr-4">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
                <a
                  href="mailto:kontakt@plantix.pl"
                  class="text-[#90a88c] hover:text-[#799573] active:text-[#647e5e] transition-colors"
                >
                  kontakt@plantix.pl
                </a>
                <p class="text-xs text-gray-500 mt-1">
                  Odpowiadamy w ciągu 24 godzin
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="bg-[#90a88c]/10 p-3 rounded-lg mr-4">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Telefon</h3>
                <a
                  href="tel:+48123456789"
                  class="text-[#90a88c] hover:text-[#799573] active:text-[#647e5e] transition-colors"
                >
                  +48 123 456 789
                </a>
                <p class="text-xs text-gray-500 mt-1">Pon-pt: 9:00-17:00</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="bg-[#90a88c]/10 p-3 rounded-lg mr-4">
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
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Adres</h3>
                <p class="text-gray-600 text-sm">
                  ul. Pupupu 42<br />
                  00-001 Warszawa<br />
                  Polska
                </p>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-gray-100 mt-6">
            <h3 class="font-semibold text-gray-900 mb-4">Śledź nas</h3>
            <div class="flex space-x-4">
              <a
                href="#"
                class="bg-gray-100 hover:bg-[#90a88c] active:bg-[#647e5e] hover:text-white p-3 rounded-full transition-colors duration-300"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="bg-gray-100 hover:bg-[#90a88c] active:bg-[#647e5e] hover:text-white p-3 rounded-full transition-colors duration-300"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSubmitting = ref(false);

const form = ref({
  name: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  privacy: false,
});

const sendMessage = async () => {
  if (!form.value.privacy) {
    alert("Proszę zaakceptować politykę prywatności");
    return;
  }

  isSubmitting.value = true;

  setTimeout(() => {
    alert(
      "Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin.",
    );

    form.value = {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacy: false,
    };

    isSubmitting.value = false;
  }, 1500);
};
</script>

<style scoped>
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
