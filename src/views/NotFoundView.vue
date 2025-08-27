<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white max-w-5xl mx-auto w-full px-6">
    <div class="text-center">
      <h1 class="text-5xl font-semibold text-gray-800 mb-2">404</h1>
      <p class="text-lg text-gray-600 mb-4">Page Not Found</p>
      <RouterLink to="/" class="text-blue-500 hover:underline">Go back to Home</RouterLink>
    </div>
  </div>
</template>