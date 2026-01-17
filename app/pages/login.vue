<template>
  <div v-if="!isLoading" class="min-h-screen flex flex-col">
    <Navbar />
    <NuxtLayout>
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
                autocomplete="email"
                @blur="validateEmail"
                @input="clearError('email')"
                :ui="{
                  base: errors.email
                    ? 'ring-1 ring-red-500 focus:ring-1 focus:ring-[#90a88c]'
                    : '',
                }"
              />
            </div>
            <p
              v-if="!errors.email && state.email"
              class="text-xs text-green-600 mt-1"
            >
              ✓ Poprawny format email
            </p>
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
                autocomplete="current-password"
                @input="clearError('password')"
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
            <UButton
              type="submit"
              class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] disabled:bg-[#90a88c] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full px-8 py-2.5 cursor-pointer transition-colors duration-200 font-bold"
              :disabled="!isFormValid"
            >
              Zaloguj się
            </UButton>
          </div>
        </UForm>

        <div
          v-if="generalError"
          class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <p class="text-sm text-red-600 text-center">{{ generalError }}</p>
        </div>

        <p class="mt-6 text-center text-xs">
          Nie masz konta?
          <NuxtLink to="/register" class="hover:underline font-medium">
            Zarejestruj się
          </NuxtLink>
        </p>
      </div>
    </NuxtLayout>
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
import { reactive, ref, computed, watch } from "vue";
import { useRouter } from "#app";
import { loginUserUseCase } from "@/domain/usecases/loginUser";

const router = useRouter();
const isLoading = ref(false);
const generalError = ref("");

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

const isFormValid = computed(() => {
  return (
    state.email &&
    state.password &&
    !errors.email &&
    validateEmailFormat(state.email)
  );
});

const validateEmail = () => {
  if (!state.email.trim()) {
    errors.email = "Email jest wymagany";
    return false;
  }

  if (!validateEmailFormat(state.email)) {
    errors.email = "Nieprawidłowy format email (np. przyklad@domena.pl)";
    return false;
  }

  errors.email = undefined;
  return true;
};

const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = () => {
  if (!state.password) {
    errors.password = "Hasło jest wymagane";
    return false;
  }

  errors.password = undefined;
  return true;
};

const clearError = (field: keyof FormErrors) => {
  errors[field] = undefined;
  generalError.value = "";
};

function validateForm() {
  const emailValid = validateEmail();
  const passwordValid = validatePassword();

  return emailValid && passwordValid;
}

async function onSubmit() {
  if (!validateForm()) return;

  try {
    isLoading.value = true;
    const user = await loginUserUseCase(state.email, state.password);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: user.email ?? state.email,
        name: user.displayName || "Użytkownik",
      }),
    );

    alert("Logowanie zakończone sukcesem!");
    await router.push("/profile");
  } catch (error) {
    console.error("Login error:", error);
    if (typeof error === "object" && error !== null && "code" in error) {
      const authError = error as { code?: string };
      if (authError.code === "auth/user-not-found") {
        generalError.value =
          "Nie znaleziono użytkownika. Zarejestruj się najpierw.";
      } else if (authError.code === "auth/wrong-password") {
        generalError.value = "Nieprawidłowy email lub hasło";
        errors.password = " ";
      } else if (authError.code === "auth/invalid-credential") {
        generalError.value = "Nieprawidłowy email lub hasło";
        errors.password = " ";
      } else {
        generalError.value =
          "Wystąpił błąd podczas logowania. Spróbuj ponownie.";
      }
    } else {
      generalError.value =
        "Wystąpił błąd podczas logowania. Spróbuj ponownie.";
    }
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => state.email,
  (newEmail) => {
    if (newEmail && !validateEmailFormat(newEmail)) {
      errors.email = "Nieprawidłowy format email";
    } else {
      errors.email = undefined;
    }
  },
);

watch(
  () => state.password,
  (newPassword) => {
    if (!newPassword) {
      errors.password = "Hasło jest wymagane";
    } else {
      errors.password = undefined;
    }
  },
);
</script>

<style scoped>
:deep(.custom-focus input:focus) {
  --tw-ring-color: #90a88c !important;
}

:deep(.custom-focus input[aria-invalid="true"]) {
  --tw-ring-color: #ef4444 !important;
  border-color: #ef4444 !important;
}
</style>
