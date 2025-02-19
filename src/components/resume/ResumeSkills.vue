<script setup>
import { ref } from 'vue'
import skillsData from '@/data/skillsData.json'

const isSkillsOpen = ref(true)
const bullet = '•' // Define the bullet symbol
</script>

<template>
    <section class="mb-4">
        <h3
            class="text-2xl font-bold mb-4 cursor-pointer flex justify-between items-center"
            @click="isSkillsOpen = !isSkillsOpen"
        >
            <span style="color: #444440">Skills</span>
            <span v-if="isSkillsOpen">−</span>
            <span v-else>+</span>
        </h3>
        <div
            v-if="isSkillsOpen"
            class="bg-white shadow-md rounded-lg p-6"
        >
            <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-600">
                <li
                    v-for="skill in skillsData"
                    :key="skill.id"
                    class="flex items-start"
                >
                    <span class="bullet mr-2">{{ bullet }}</span>
                    <span>{{ skill.name }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.bullet {
    /* Define the bullet symbol styling  */
    color: #4B5563; /* Tailwind gray-600 */
    font-size: 1rem;
}
.cursor-pointer {
    cursor: pointer;
}
</style>