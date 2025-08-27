<script setup>
import SocialLinks from './SocialLinks.vue'
import workExpData from '@/data/workExpData.json' // work experience data

// Define the ID of the current work
const currentWorkExpId = 1

// current work place using the defined ID
const currentExp = workExpData.find((exp) => exp.id === currentWorkExpId)
</script>

<template>
    <section class="mb-12 bg-blue-50 p-4 rounded-lg">
        <h2 class="text-3xl font-bold mb-4">
            Hi, I'm Mohammad Asad Atterkhan!👋
        </h2>
        <p class="mb-4">
            Currently working as an <span>{{ currentExp.title }}</span> at
            <span class="text-blue-700 font-semibold">{{
                currentExp.company
            }}</span
            >.
        </p>
        <p class="mb-4">
            Passionate about automation, infrastructure security, and
            networking. Enthusiast of technology and innovation.<br />
            Oh and I like Cats! 🐱
        </p>
        <div class="flex items-center space-x-4">
            <SocialLinks />
            <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-gray-600 text-gray-600 px-2 py-1 rounded hover:border-blue-900 hover:bg-blue-900 hover:text-white transition"
            >
                Resume
            </a>
        </div>
    </section>
</template>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
