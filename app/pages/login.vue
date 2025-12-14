<template>
  <div v-if="!isLoading" class="min-h-screen flex flex-col">
    <Navbar />
    <Layout>
      <div class="w-full max-w-sm mx-auto sm:px-6 px-4 py-6">
        <h1 class="mb-6 text-xl text-center">Zaloguj się</h1>

        <UForm :state="state" @submit="onSubmit" class="space-y-4">
          <UFormField name="email" :error="errors.email" required label="Email">
            <div class="w-full">
              <UInput
                id="email"
                v-model="state.email"
                type="email"
                required
                class="w-full custom-focus"
              />
            </div>
          </UFormField>

          <UFormField
            name="password"
            :error="errors.password"
            required
            label="Hasło"
          >
            <div class="w-full">
              <UInput
                id="password"
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full custom-focus"
              >
                <template #trailing>
                  <UButton
                    type="button"
                    @click="showPassword = !showPassword"
                    variant="ghost"
                    color="neutral"
                    :padded="false"
                    class="mr-1"
                  >
                    <UIcon
                      :name="
                        showPassword
                          ? 'i-heroicons-eye-slash'
                          : 'i-heroicons-eye'
                      "
                      class="w-4 h-4 text-gray-400 hover:text-gray-500"
                    />
                  </UButton>
                </template>
              </UInput>
            </div>
          </UFormField>

          <div class="flex justify-center pt-4">
            <NuxtLink to="/profile">
              <UButton
                type="submit"
                class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white text-sm font-medium rounded-full px-8 py-2.5 cursor-pointer transition-colors duration-200 font-bold"
              >
                Zaloguj się
              </UButton>
            </NuxtLink>
          </div>
        </UForm>

        <p class="mt-6 text-center text-xs">
          Nie masz konta?
          <NuxtLink to="/register" class="hover:underline font-medium">
            Zarejestruj się
          </NuxtLink>
        </p>
      </div>
    </Layout>
  </div>
    <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90a88c] mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Ładowanie strony logowania...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const isLoading = ref(false);

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const state = reactive<FormState>({
  email: "",
  password: "",
});

const errors = reactive<FormErrors>({});
const showPassword = ref(false);

function validateForm() {
  Object.keys(errors).forEach((key) => delete errors[key as keyof FormErrors]);
  let isValid = true;

  if (!state.email) {
    errors.email = "Email jest wymagany";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(state.email)) {
    errors.email = "Nieprawidłowy email";
    isValid = false;
  }

  if (!state.password) {
    errors.password = "Hasło jest wymagane";
    isValid = false;
  }

  return isValid;
}

async function onSubmit() {
  if (!validateForm()) return;

  try {
    console.log("Login data:", state);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.email === state.email) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Logowanie zakończone sukcesem!");
      } else {
        alert("Nieprawidłowy email lub hasło");
      }
    } else {
      alert("Nie znaleziono użytkownika. Zarejestruj się najpierw.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Wystąpił błąd podczas logowania. Spróbuj ponownie.");
  }
}
</script>

<style scoped>
:deep(.custom-focus input:focus) {
  --tw-ring-color: #90a88c !important;
}
</style>
