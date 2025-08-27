<script setup>
import { ref } from 'vue'
import educationData from '@/data/educationData.json'

const isEducationOpen = ref(true)
</script>

<template>
  <section>
    <h3
      class="text-2xl md:text-2xl font-bold mb-4 cursor-pointer flex justify-between items-center"
      @click="isEducationOpen = !isEducationOpen"
    >
      <span style="color: #444440">Education</span>
      <span v-if="isEducationOpen">−</span>
      <span v-else>+</span>
    </h3>
    <div
      v-if="isEducationOpen"
    >
      <ul class="grid grid-cols-1 gap-4 text-gray-600 mb-4">
        <li v-for="(education, index) in educationData" :key="index" class="bg-white shadow-md rounded-lg p-4">
          <h4 class="text-lg md:text-xl font-semibold mb-2">
            <a :href="education.degreeLink" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
              {{ education.field }}
            </a>
          </h4>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-500 text-sm mb-2">
            <p>{{ education.degree }}</p>
            <span class="hidden sm:block">|</span>
            <p>{{ education.university }}</p>
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-500 text-sm">
            <p>{{ education.classification }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>