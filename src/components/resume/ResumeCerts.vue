<script setup>
import { ref, computed } from 'vue'
import certsData from '@/data/certsData.json'

const isCertsOpen = ref(true)
const sortedCerts = computed(() => [...certsData].sort((a, b) => b.id - a.id))
</script>

<template>
    <section class="mb-4">
        <h3
            class="text-2xl font-bold mb-4 cursor-pointer flex justify-between items-center text-[#444440] dark:text-gray-200"
            @click="isCertsOpen = !isCertsOpen"
        >
            <span>Certifications</span>
            <span v-if="isCertsOpen">−</span>
            <span v-else>+</span>
        </h3>
        <div v-if="isCertsOpen">
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                <li
                    v-for="cert in sortedCerts"
                    :key="cert.id"
                    class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4"
                >
                    <h4 class="text-lg md:text-xl font-semibold mb-2">
                        <a
                            :href="cert.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-600 dark:text-gray-200 hover:text-[rgb(130,130,6)] dark:hover:text-[rgb(130,130,6)] transition-colors"
                        >
                            {{ cert.title }}
                        </a>
                    </h4>
                    <div
                        class="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2"
                    >
                        <p>{{ cert.issuer }}</p>
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
