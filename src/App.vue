<script setup>
import NavBar from '@/components/header/NavBar.vue';
import Footer from '@/components/header/Footer.vue';
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isHome = computed(() => route.name === 'home');
</script>

<template>
  <NavBar />
  <main class="max-w-5xl mx-auto w-full px-6">
    <RouterView />
  </main>
  <Footer />
</template>