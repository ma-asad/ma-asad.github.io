<script setup>
import { computed } from 'vue'
import skillsData from '@/data/skillsData.json'

const parsedSkills = computed(() =>
    skillsData.map((s) => {
        const idx = s.name.indexOf(':')
        if (idx > -1) {
            return {
                id: s.id,
                label: s.name.slice(0, idx).trim(),
                detail: s.name.slice(idx + 1).trim()
            }
        }
        return { id: s.id, label: s.name, detail: '' }
    })
)
</script>

<template>
    <section class="mb-4">
        <div class="text-gray-600">
            <ul class="list-disc pl-5 space-y-1">
                <li v-for="s in parsedSkills" :key="s.id">
                    <strong>{{ s.label }}:</strong>
                    <span v-if="s.detail"> {{ s.detail }}</span>
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