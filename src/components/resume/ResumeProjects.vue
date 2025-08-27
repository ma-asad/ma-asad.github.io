<!-- ResumeProjects.vue -->
<script setup>
import { ref } from 'vue'
import projectsData from '@/data/projectsData.json'

const isProjectsOpen = ref(true)
</script>

<template>
    <section>
        <h3
            class="text-2xl font-bold mb-4 cursor-pointer flex justify-between items-center"
            @click="isProjectsOpen = !isProjectsOpen"
        >
            <span style="color: #444440">Projects</span>
            <span v-if="isProjectsOpen">−</span>
            <span v-else>+</span>
        </h3>
        <div v-if="isProjectsOpen">
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                <li
                    v-for="project in projectsData"
                    :key="project.id"
                    class="bg-white shadow-md rounded-lg p-4"
                >
                    <h4 class="text-lg md:text-xl font-semibold mb-2">
                        {{ project.title }}
                    </h4>
                    <p>{{ project.description }}</p>

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
                                class="text-blue-500 hover:text-blue-700"
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
