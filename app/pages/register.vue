<template>
  <div v-if="!isLoading" class="min-h-screen flex flex-col">
    <Navbar />
    <NuxtLayout>
      <div class="w-full max-w-sm mx-auto sm:px-6 px-4 py-6">
        <h1 class="mb-6 text-xl text-center">Załóż konto</h1>

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
                autocomplete="new-password"
                @blur="validatePassword"
                @input="clearError('password')"
                :ui="{
                  base: errors.password
                    ? 'ring-1 ring-red-500 focus:ring-1 focus:ring-[#90a88c]'
                    : '',
                }"
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

            <div v-if="state.password" class="mt-2">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-gray-600">Siła hasła:</span>
                <span
                  class="text-xs font-medium"
                  :class="passwordStrengthTextClass"
                >
                  {{ passwordStrengthText }}
                </span>
              </div>

              <div class="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                <div
                  class="h-1.5 rounded-full transition-all duration-300"
                  :class="passwordStrengthClass"
                  :style="{ width: passwordStrengthPercent + '%' }"
                ></div>
              </div>

              <ul class="space-y-1.5 mt-2 text-xs">
                <li
                  v-for="(req, index) in passwordRequirements"
                  :key="index"
                  class="flex items-center gap-1.5"
                >
                  <UIcon
                    :name="
                      req.met
                        ? 'i-heroicons-check-circle'
                        : 'i-heroicons-x-circle'
                    "
                    class="w-3.5 h-3.5 shrink-0"
                    :class="req.met ? 'text-green-500' : 'text-gray-400'"
                  />
                  <span :class="req.met ? 'text-green-600' : 'text-gray-600'">
                    {{ req.text }}
                  </span>
                </li>
              </ul>
            </div>
          </UFormField>

          <UFormField
            name="confirmPassword"
            :error="errors.confirmPassword"
            required
            label="Powtórz hasło"
          >
            <div class="w-full">
              <UInput
                id="confirmPassword"
                v-model="state.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full custom-focus"
                autocomplete="new-password"
                @blur="validateConfirmPassword"
                @input="clearError('confirmPassword')"
                :ui="{
                  base: errors.confirmPassword
                    ? 'ring-1 ring-red-500 focus:ring-1 focus:ring-[#90a88c]'
                    : '',
                }"
              >
                <template #trailing>
                  <UButton
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    variant="ghost"
                    color="neutral"
                    :padded="false"
                    class="mr-1"
                  >
                    <UIcon
                      :name="
                        showConfirmPassword
                          ? 'i-heroicons-eye-slash'
                          : 'i-heroicons-eye'
                      "
                      class="w-4 h-4 text-gray-400 hover:text-gray-500"
                    />
                  </UButton>
                </template>
              </UInput>
            </div>
            <p
              v-if="
                !errors.confirmPassword &&
                state.confirmPassword &&
                passwordsMatch
              "
              class="text-xs text-green-600 mt-1"
            >
              ✓ Hasła są identyczne
            </p>
          </UFormField>

          <UFormField name="rodo" :error="errors.rodo">
            <div class="flex items-start space-x-2">
              <UCheckbox
                id="rodo"
                v-model="state.acceptedRODO"
                required
                color="primary"
                @change="clearError('rodo')"
              />
              <label for="rodo" class="text-sm text-gray-700 leading-tight">
                Akceptuję warunki RODO
                <span class="text-red-500">*</span>
              </label>
            </div>
          </UFormField>

          <div class="flex justify-center pt-4">
            <UButton
              type="submit"
              class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] disabled:bg-[#90a88c] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full px-8 py-2.5 cursor-pointer transition-colors duration-200 font-bold"
              :disabled="!isFormValid"
            >
              Zarejestruj się
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
          Już masz konto?
          <NuxtLink to="/login" class="hover:underline font-medium">
            Zaloguj się
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
      <p class="text-gray-600">Ładowanie strony rejestracji...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch } from "vue";
import { useRouter } from "#app";
import { registerUserUseCase } from "@/domain/usecases/registerUser";

const router = useRouter();
const isLoading = ref(false);
const generalError = ref("");

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  acceptedRODO: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  rodo?: string;
}

const state = reactive<FormState>({
  email: "",
  password: "",
  confirmPassword: "",
  acceptedRODO: false,
});

const errors = reactive<FormErrors>({});
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordsMatch = computed(() => {
  return (
    state.password &&
    state.confirmPassword &&
    state.password === state.confirmPassword
  );
});

const isFormValid = computed(() => {
  return (
    state.email &&
    state.password &&
    state.confirmPassword &&
    state.acceptedRODO &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    !errors.rodo &&
    validateEmailFormat(state.email) &&
    passwordsMatch.value
  );
});

const passwordRequirements = computed(() => {
  return [
    {
      regex: /.{8,}/,
      text: "Minimum 8 znaków",
      met: state.password.length >= 8,
    },
    {
      regex: /\d/,
      text: "Przynajmniej 1 cyfra",
      met: /\d/.test(state.password),
    },
    {
      regex: /[a-z]/,
      text: "Przynajmniej 1 mała litera",
      met: /[a-z]/.test(state.password),
    },
    {
      regex: /[A-Z]/,
      text: "Przynajmniej 1 duża litera",
      met: /[A-Z]/.test(state.password),
    },
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      text: "Przynajmniej 1 znak specjalny",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(state.password),
    },
  ];
});

const passwordStrengthScore = computed(() => {
  if (!state.password) return 0;
  return passwordRequirements.value.filter((req) => req.met).length;
});

const passwordStrengthPercent = computed(() => {
  return (
    (passwordStrengthScore.value / passwordRequirements.value.length) * 100
  );
});

const passwordStrengthClass = computed(() => {
  if (passwordStrengthScore.value === 0) return "bg-gray-300";
  if (passwordStrengthScore.value <= 2) return "bg-red-500";
  if (passwordStrengthScore.value <= 3) return "bg-yellow-500";
  if (passwordStrengthScore.value <= 4) return "bg-blue-500";
  return "bg-green-500";
});

const passwordStrengthText = computed(() => {
  if (passwordStrengthScore.value === 0) return "Wprowadź hasło";
  if (passwordStrengthScore.value <= 2) return "Bardzo słabe";
  if (passwordStrengthScore.value === 3) return "Słabe";
  if (passwordStrengthScore.value === 4) return "Średnie";
  return "Silne";
});

const passwordStrengthTextClass = computed(() => {
  if (passwordStrengthScore.value === 0) return "text-gray-500";
  if (passwordStrengthScore.value <= 2) return "text-red-600";
  if (passwordStrengthScore.value === 3) return "text-yellow-600";
  if (passwordStrengthScore.value === 4) return "text-blue-600";
  return "text-green-600";
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

  if (state.password.length < 8) {
    errors.password = "Hasło musi mieć co najmniej 8 znaków";
    return false;
  }

  const hasUpperCase = /[A-Z]/.test(state.password);
  const hasLowerCase = /[a-z]/.test(state.password);
  const hasNumbers = /\d/.test(state.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(state.password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    errors.password = "Hasło musi zawierać duże i małe litery oraz cyfry";
    return false;
  }

  errors.password = undefined;
  return true;
};

const validateConfirmPassword = () => {
  if (!state.confirmPassword) {
    errors.confirmPassword = "Potwierdzenie hasła jest wymagane";
    return false;
  }

  if (state.password !== state.confirmPassword) {
    errors.confirmPassword = "Hasła nie są identyczne";
    return false;
  }

  errors.confirmPassword = undefined;
  return true;
};

const clearError = (field: keyof FormErrors) => {
  errors[field] = undefined;
  generalError.value = "";
};

const validateRODO = () => {
  if (!state.acceptedRODO) {
    errors.rodo = "Musisz zaakceptować warunki RODO";
    return false;
  }

  errors.rodo = undefined;
  return true;
};

function validateForm() {
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  const confirmPasswordValid = validateConfirmPassword();
  const rodoValid = validateRODO();

  return emailValid && passwordValid && confirmPasswordValid && rodoValid;
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
    if (newPassword && newPassword.length < 8) {
      errors.password = "Hasło musi mieć co najmniej 8 znaków";
    } else {
      errors.password = undefined;
    }

    if (state.confirmPassword && newPassword !== state.confirmPassword) {
      errors.confirmPassword = "Hasła nie są identyczne";
    } else if (state.confirmPassword) {
      errors.confirmPassword = undefined;
    }
  },
);

watch(
  () => state.confirmPassword,
  (newConfirmPassword) => {
    if (newConfirmPassword && state.password !== newConfirmPassword) {
      errors.confirmPassword = "Hasła nie są identyczne";
    } else if (newConfirmPassword) {
      errors.confirmPassword = undefined;
    }
  },
);

watch(
  () => state.acceptedRODO,
  (newValue) => {
    if (newValue) {
      errors.rodo = undefined;
    }
  },
);

async function onSubmit() {
  if (!validateForm()) return;

  try {
    isLoading.value = true;

    await registerUserUseCase(state.email, state.password);

    alert("Rejestracja zakończona sukcesem! Teraz możesz się zalogować.");
    await router.push("/login");
  } catch (error) {
    console.error("Registration error:", {
      error,
      email: state.email,
    });
    if (error instanceof Error) {
      if (error.message === "user-exists") {
        generalError.value = "Użytkownik z tym adresem email już istnieje";
      } else if (error.message === "invalid-email") {
        generalError.value = "Nieprawidłowy format email";
      } else if (error.message === "weak-password") {
        generalError.value = "Hasło jest zbyt słabe";
      } else {
        generalError.value =
          "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.";
      }
    } else {
      generalError.value =
        "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.";
    }
  } finally {
    isLoading.value = false;
  }
}
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
