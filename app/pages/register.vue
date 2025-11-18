<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <Layout>
      <div class="w-full max-w-sm mx-auto sm: px-6 px-4 py-6">
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
              />
            </div>
          </UFormField>
          
          <UFormField name="password" :error="errors.password" required label="Hasło">
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
                    color="gray"
                    :padded="false"
                    class="mr-1"
                    :ui="{ rounded: 'rounded-md' }"
                  >
                  </UButton>
                </template>
              </UInput>
            </div>

            <div class="mt-2">
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  class="h-1.5 rounded-full transition-all duration-300"
                  :class="passwordStrengthClass"
                  :style="{ width: passwordStrengthPercent + '%' }"
                ></div>
              </div>
              
              <p class="text-xs font-medium mt-1" :class="passwordStrengthTextClass">
                {{ passwordStrengthText }}
              </p>

              <ul class="space-y-0.5 mt-2 text-xs">
                <li v-for="(req, index) in passwordRequirements" :key="index" class="flex items-center gap-1.5">
                  <UIcon
                    :name="req.met ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                    class="w-3 h-3 shrink-0"
                    :class="req.met ? 'text-[#90a88c]' : 'text-gray-400'"
                  />
                  <span :class="req.met ? 'text-[#90a88c]' : 'text-gray-400'">
                    {{ req.text }}
                  </span>
                </li>
              </ul>
            </div>
          </UFormField>

          <UFormField name="confirmPassword" :error="errors.confirmPassword" required label="Powtórz hasło">
            <div class="w-full">
              <UInput
                id="confirmPassword"
                v-model="state.confirmPassword"
                type="password"
                required
                class="w-full custom-focus"
              />
            </div>
          </UFormField>

          <UFormField name="rodo">
            <div class="flex items-start space-x-2">
              <UCheckbox
                id="rodo"
                v-model="state.acceptedRODO"
                required
                color="primary"
                label="Akceptuję warunki RODO"
              />
            </div>
          </UFormField>

          <div class="flex justify-center pt-4">
            <UButton
              type="submit"
              class="bg-[#90a88c] hover:bg-[#799573] active:bg-[#647e5e] text-white text-sm font-medium rounded-full px-8 py-2.5 cursor-pointer transition-colors duration-200 font-bold"
            >
              Zarejestruj się
            </UButton>
          </div>
        </UForm>

        <p class="mt-6 text-center text-xs">
          Już masz konto? 
          <NuxtLink to="/login" class="hover:underline font-medium">
            Zaloguj się
          </NuxtLink>
        </p>
      </div>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";

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
}

const state = reactive<FormState>({
  email: "",
  password: "",
  confirmPassword: "",
  acceptedRODO: false,
});

const errors = reactive<FormErrors>({});
const showPassword = ref(false);

const passwordRequirements = computed(() => {
  const requirements = [
    { regex: /.{8,}/, text: "Przynajmniej 8 znaków" },
    { regex: /\d/, text: "Przynajmniej 1 cyfra" },
    { regex: /[a-z]/, text: "Przynajmniej 1 mała litera" },
    { regex: /[A-Z]/, text: "Przynajmniej 1 duża litera" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(state.password),
    text: req.text,
  }));
});

const passwordStrengthScore = computed(() => passwordRequirements.value.filter(req => req.met).length);
const passwordStrengthPercent = computed(() => (passwordStrengthScore.value / passwordRequirements.value.length) * 100);

const passwordStrengthClass = computed(() => {
  if (passwordStrengthScore.value === 0) return "bg-gray-400";
  if (passwordStrengthScore.value <= 2) return "bg-[#b31e1e]";
  if (passwordStrengthScore.value === 3) return "bg-[#e5b609]";
  return "bg-[#90a88c]";
});

const passwordStrengthText = computed(() => {
  if (passwordStrengthScore.value === 0) return "Wprowadź hasło";
  if (passwordStrengthScore.value <= 2) return "Słabe hasło";
  if (passwordStrengthScore.value === 3) return "Średnie hasło";
  return "Silne hasło";
});

const passwordStrengthTextClass = computed(() => {
  if (passwordStrengthScore.value === 0) return "text-gray-500";
  if (passwordStrengthScore.value <= 2) return "text-[#b31e1e]";
  if (passwordStrengthScore.value === 3) return "text-[#e5b609]";
  return "text-[#90a88c]";
});

function validateForm() {
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors]);
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
  } else if (state.password.length < 8) {
    errors.password = "Hasło musi mieć co najmniej 8 znaków";
    isValid = false;
  }

  if (!state.confirmPassword) {
    errors.confirmPassword = "Potwierdzenie hasła jest wymagane";
    isValid = false;
  } else if (state.password !== state.confirmPassword) {
    errors.confirmPassword = "Hasła nie są identyczne";
    isValid = false;
  }

  return isValid;
}

async function onSubmit() {
  if (!validateForm()) return;

  try {
    console.log("Registration data:", state);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem("user", JSON.stringify({ email: state.email }));
    alert("Rejestracja zakończona sukcesem!");
  } catch (error) {
    console.error("Registration error:", error);
    alert("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
  }
}
</script>

<style scoped>
:deep(.custom-focus input:focus) {
  --tw-ring-color: #90a88c !important;
}
</style>