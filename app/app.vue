<template>
  <div>
    <NavBar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import { useHead } from "#app";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { useTheme } from "~/composables/useTheme";

const { theme } = useTheme();

useHead(() => ({
  htmlAttrs: {
    "data-theme": theme.value,
  },
}));
</script>
