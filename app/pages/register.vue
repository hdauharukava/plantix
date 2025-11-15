<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 sm:px-6 py-6 max-w-sm">
      <h1 class="mb-4 text-xl text-center">Załóż konto</h1>

      <UForm :state="state" @submit="onSubmit" class="space-y-4">

        <UFormField name="email" :error="errors.email" required label="Email">
          <UInput
            id="email"
            v-model="state.email"
            type="email"
            required
            :ui="{
              base: 'w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
              icon: { trailing: { pointer: '' } }
            }"
          />
        </UFormField>
        
        <UFormField name="password" :error="errors.password" required label="Hasło">

          <UInput
            id="password"
            v-model="state.password"
            :type="showPassword ? 'text' : 'password'"
            required
            :ui="{
              base: 'w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
              icon: { trailing: { pointer: '' } }
            }"
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

          <div class="mt-1">
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

            <ul class="space-y-0.5 mt-1 text-xs">
              <li v-for="(req, index) in passwordRequirements" :key="index" class="flex items-center gap-1.5">
                <UIcon
                  :name="req.met ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                  class="w-3 h-3 shrink-0"
                  :class="req.met ? 'text-green-500' : 'text-gray-400'"
                />
                <span :class="req.met ? 'text-green-500' : 'text-gray-400'">
                  {{ req.text }}
                </span>
              </li>
            </ul>
          </div>
        </UFormField>

        <UFormField name="confirmPassword" :error="errors.confirmPassword" required label="Powtórz hasło">

          <UInput
            id="confirmPassword"
            v-model="state.confirmPassword"
            type="password"
            placeholder="Wpisz hasło"
            required
            :ui="{
              base: 'w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors'
            }"
          />
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

        <UButton
          type="submit"
          class="w-full bg-primary text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 text-sm"
          :ui="{ rounded: 'rounded-full' }"
        >
          Zarejestruj się
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-xs">
        Już masz konto? 
        <NuxtLink to="/login" class="hover:underline font-medium">
          Zaloguj się
        </NuxtLink>
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";

interface FormState {
  email: string;
  userType: string;
  password: string;
  confirmPassword: string;
  acceptedRODO: boolean;
}

interface FormErrors {
  email?: string;
  userType?: string;
  password?: string;
  confirmPassword?: string;
}

const state = reactive<FormState>({
  email: "",
  userType: "",
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

const passwordStrengthScore = computed(() => 
  passwordRequirements.value.filter((req) => req.met).length
);

const passwordStrengthPercent = computed(() => 
  (passwordStrengthScore.value / passwordRequirements.value.length) * 100
);

const passwordStrengthClass = computed(() => {
  if (passwordStrengthScore.value === 0) return "bg-gray-400";
  if (passwordStrengthScore.value <= 1) return "bg-red-500";
  if (passwordStrengthScore.value <= 2) return "bg-yellow-500";
  if (passwordStrengthScore.value === 3) return "bg-yellow-500";
  return "bg-green-500";
});

const passwordStrengthText = computed(() => {
  if (passwordStrengthScore.value === 0) return "Wprowadź hasło";
  if (passwordStrengthScore.value <= 2) return "Słabe hasło";
  if (passwordStrengthScore.value === 3) return "Średnie hasło";
  return "Silne hasło";
});

const passwordStrengthTextClass = computed(() => {
  if (passwordStrengthScore.value === 0) return "text-gray-500";
  if (passwordStrengthScore.value <= 2) return "text-red-500";
  if (passwordStrengthScore.value === 3) return "text-yellow-600";
  return "text-green-600";
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

  if (!state.userType) {
    errors.userType = "Wybierz kim jesteś";
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
  if (!validateForm()) {
    return;
  }

  try {
    console.log("Registration data:", state);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: state.email,
        userType: state.userType,
      })
    );

    alert("Rejestracja zakończona sukcesem!");
    
  } catch (error) {
    console.error("Registration error:", error);
    alert("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
  }
}
</script>