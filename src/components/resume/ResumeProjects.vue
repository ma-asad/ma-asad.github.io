<!-- ResumeProjects.vue -->
<script setup>
import { ref } from 'vue'
import projectsData from '@/data/projectsData.json'

const isProjectsOpen = ref(true)
</script>

<template>
    <section>
        <h3
            class="text-2xl font-bold mb-4 cursor-pointer flex justify-between items-center text-[#444440] dark:text-gray-200"
            @click="isProjectsOpen = !isProjectsOpen"
        >
            <span>Projects</span>
            <span v-if="isProjectsOpen">−</span>
            <span v-else>+</span>
        </h3>
        <div v-if="isProjectsOpen">
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                <li
                    v-for="project in projectsData"
                    :key="project.id"
                    class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4"
                >
                    <h4 class="text-lg md:text-xl font-semibold mb-2 text-gray-600 dark:text-gray-200">
                        {{ project.title }}
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">{{ project.description }}</p>

                    <!-- Display Links with Icons Only -->
                    <div v-if="project.links.length > 0" class="mt-2 flex">
                        <span
                            v-for="link in project.links"
                            :key="link.type"
                            class="mr-4 flex items-center"
                        >
                            <a
                                :href="link.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-[rgb(130,130,6)] dark:text-[rgb(130,130,6)] hover:text-[rgb(100,100,4)] dark:hover:text-[rgb(100,100,4)] transition-colors"
                                :aria-label="`${link.type} Link`"
                            >
                                <font-awesome-icon
                                    :icon="[
                                        'fas',
                                        link.type === 'Code'
                                            ? 'code'
                                            : 'external-link-alt'
                                    ]"
                                    class="mr-1"
                                />
                            </a>
                        </span>
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
