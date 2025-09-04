<script setup>
import { ref } from 'vue'
import educationData from '@/data/educationData.json'

const isEducationOpen = ref(true)
</script>

<template>
  <section>
    <h3
      class="text-2xl md:text-2xl font-bold mb-4 cursor-pointer flex justify-between items-center text-[#444440] dark:text-gray-200"
      @click="isEducationOpen = !isEducationOpen"
    >
      <span>Education</span>
      <span v-if="isEducationOpen">−</span>
      <span v-else>+</span>
    </h3>
    <div
      v-if="isEducationOpen"
    >
      <ul class="grid grid-cols-1 gap-4 text-gray-600 dark:text-gray-300 mb-4">
        <li v-for="(education, index) in educationData" :key="index" class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4">
          <h4 class="text-lg md:text-xl font-semibold mb-2">
                                    <a :href="education.degreeLink" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-200 hover:text-[rgb(130,130,6)] dark:hover:text-[rgb(130,130,6)] transition-colors">
                            {{ education.field }}
                        </a>
          </h4>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2">
            <p>{{ education.degree }}</p>
                          <span class="hidden sm:block text-[rgb(130,130,6)]">|</span>
            <p>{{ education.university }}</p>
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
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