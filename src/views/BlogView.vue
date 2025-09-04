<!-- BlogView.vue -->
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import postsData from '@/data/postData.json'

const query = ref('')
const selectedCategory = ref('All')
const startDate = ref('') // YYYY-MM-DD
const endDate = ref('')   // YYYY-MM-DD
const showFilters = ref(false)
// Sort posts newest first for consistent ordering
const posts = ref([...postsData].sort((a, b) => new Date(b.date) - new Date(a.date)))

// Pin post via JSON field
const pinned = computed(() => posts.value.find(p => p.pinned))
const pinnedId = computed(() => pinned.value?.id)

// Show pinned only when no query or it matches the query
const pinnedMatchesQuery = computed(() => {
    const pin = pinned.value
    if (!pin) return false
    const qRaw = query.value.trim()
    // Category filter
    if (selectedCategory.value !== 'All' && !(pin.categories || []).includes(selectedCategory.value)) {
        return false
    }
    // Date range filter
    const pinDate = new Date(pin.date)
    if (startDate.value && pinDate < new Date(startDate.value)) return false
    if (endDate.value && pinDate > new Date(endDate.value)) return false

    if (!qRaw) return true
    const q = qRaw.toLowerCase()
    return (
        pin.title.toLowerCase().includes(q) ||
        (pin.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        (pin.categories || []).some((c) => c.toLowerCase().includes(q))
    )
})

const filtered = computed(() => {
    const q = query.value.trim().toLowerCase()
    return posts.value.filter((p) => {
        // Category
        if (selectedCategory.value !== 'All' && !(p.categories || []).includes(selectedCategory.value)) {
            return false
        }
        // Date range
        const d = new Date(p.date)
        if (startDate.value && d < new Date(startDate.value)) return false
        if (endDate.value && d > new Date(endDate.value)) return false
        // Text
        if (!q) return true
        return (
            p.title.toLowerCase().includes(q) ||
            (p.tags || []).some((t) => t.toLowerCase().includes(q)) ||
            (p.categories || []).some((c) => c.toLowerCase().includes(q))
        )
    })
})

// Pagination
const isMobile = ref(false)
function handleResize() {
    isMobile.value = window.innerWidth < 768
}
onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

const currentPage = ref(1)
const perPage = computed(() => (isMobile.value ? 5 : 7))

const filteredNonPinned = computed(() =>
    filtered.value.filter((p) => p.id !== pinnedId.value)
)

const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredNonPinned.value.length / perPage.value))
)

const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    return filteredNonPinned.value.slice(start, start + perPage.value)
})

watch(query, () => {
    currentPage.value = 1
})
watch([selectedCategory, startDate, endDate], () => {
    currentPage.value = 1
})

// Collapsed pagination display (1 … n-1 n n+1 … N)
const displayedPages = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => ({ type: 'page', value: i + 1 }))
    }
    const pages = []
    pages.push({ type: 'page', value: 1 })
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    if (start > 2) pages.push({ type: 'ellipsis' })
    for (let p = start; p <= end; p++) {
        pages.push({ type: 'page', value: p })
    }
    if (end < total - 1) pages.push({ type: 'ellipsis' })
    pages.push({ type: 'page', value: total })
    return pages
})
// Unique categories
const categories = computed(() => {
    const set = new Set()
    posts.value.forEach((p) => (p.categories || []).forEach((c) => set.add(c)))
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
})
</script>

<template>
    <section class="mb-12 max-w-5xl mx-auto w-full px-6">
        <h2 class="text-2xl font-bold mb-4">Blog</h2>

        <div class="sticky top-0 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur py-2 transition-colors duration-200">
            <div class="flex items-center gap-2">
                <div class="relative flex-1 max-w-sm">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                    </span>
                    <input
                        v-model="query"
                        type="text"
                        placeholder="Search posts..."
                        class="w-full border border-gray-300 dark:border-gray-600 rounded pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                </div>
                <!-- Mobile Filter Trigger -->
                <button class="sm:hidden p-2.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200" @click="showFilters = true" aria-label="Open filters">
                    <font-awesome-icon :icon="['fas', 'filter']" class="text-gray-700 dark:text-gray-300" />
                </button>
                <!-- Desktop Filters Dropdown -->
                <details class="relative hidden sm:block">
                    <summary class="list-none cursor-pointer p-2.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200" aria-label="Open filters">
                        <font-awesome-icon :icon="['fas', 'filter']" class="text-gray-700 dark:text-gray-300" />
                    </summary>
                    <div class="absolute right-0 mt-2 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow z-20 w-72 transition-colors duration-200">
                        <div class="mb-2">
                            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Category</label>
                            <select v-model="selectedCategory" class="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Start date</label>
                            <input v-model="startDate" type="date" class="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">End date</label>
                            <input v-model="endDate" type="date" class="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                        </div>
                    </div>
                </details>
            </div>
        </div>

        <!-- Mobile Filters Bottom Sheet -->
        <div v-if="showFilters" class="fixed inset-0 z-50 sm:hidden">
            <div class="absolute inset-0 bg-black/40" @click="showFilters = false"></div>
            <div class="absolute inset-x-0 bottom-0 bg-white dark:bg-gray-700 rounded-t-2xl p-4 max-h-[80vh] overflow-auto filter-sheet transition-colors duration-200">
                <div class="mb-3">
                    <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Category</label>
                    <select v-model="selectedCategory" class="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                    </select>
                </div>
                <div class="grid grid-cols-1 gap-3 min-w-0">
                    <div class="min-w-0">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon :icon="['fas', 'calendar-days']" class="text-gray-400 dark:text-gray-500 text-xs" />
                            <label class="block text-xs text-gray-500 dark:text-gray-400">Start date</label>
                        </div>
                        <input v-model="startDate" type="date" class="w-full min-w-0 border border-gray-300 dark:border-gray-600 rounded px-2 py-2 text-sm appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon :icon="['fas', 'calendar-days']" class="text-gray-400 dark:text-gray-500 text-xs" />
                            <label class="block text-xs text-gray-500 dark:text-gray-400">End date</label>
                        </div>
                        <input v-model="endDate" type="date" class="w-full min-w-0 border border-gray-300 dark:border-gray-600 rounded px-2 py-2 text-sm appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                    </div>
                </div>
                <div class="mt-4 flex justify-end gap-2">
                    <button class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200" @click="() => { selectedCategory = 'All'; startDate = ''; endDate = '' }">Reset</button>
                    <button class="px-3 py-2 border rounded bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-100 hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-200" @click="showFilters = false">Apply</button>
                </div>
            </div>
        </div>

        <div v-if="pinned && pinnedMatchesQuery && currentPage === 1" class="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
            <div class="flex items-start justify-between">
                <router-link :to="`/post/${pinned.id}`" class="font-semibold text-gray-900 dark:text-gray-100 hover:underline">
                    {{ pinned.title }}
                </router-link>
                <div class="flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'thumbtack']" class="text-gray-400 dark:text-gray-500 text-xs rotate-45"/>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ pinned.date }}</span>
                </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1" v-if="pinned.excerpt">{{ pinned.excerpt }}</p>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span v-if="pinned.categories?.length">{{ pinned.categories.join(', ') }}</span>
            </div>
        </div>

        <ul class="space-y-3">
            <li v-for="post in paginatedPosts" :key="post.id" class="p-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200">
                <div class="flex items-center justify-between">
                    <router-link :to="`/post/${post.id}`" class="font-medium text-gray-900 dark:text-gray-100 hover:underline truncate">
                        {{ post.title }}
                    </router-link>
                    <span class="text-xs text-gray-500 dark:text-gray-400 ml-4 shrink-0">{{ post.date }}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate" v-if="post.excerpt">{{ post.excerpt }}</p>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                    <span v-if="post.categories?.length">{{ post.categories.join(', ') }}</span>
                </div>
            </li>
        </ul>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="mt-6 flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <button
                class="disabled:opacity-40 hover:underline transition-colors duration-200"
                :disabled="currentPage === 1"
                @click="currentPage = Math.max(1, currentPage - 1)"
            >Prev</button>
            <template v-for="(item, idx) in displayedPages" :key="idx">
                <button
                    v-if="item.type === 'page'"
                    class="px-1 hover:text-[rgb(130,130,6)] dark:hover:text-[rgb(130,130,6)] transition-colors duration-200"
                    :class="{ 'font-semibold underline': item.value === currentPage }"
                    @click="currentPage = item.value"
                >{{ item.value }}</button>
                <span v-else class="px-1 text-gray-400 dark:text-gray-500">…</span>
            </template>
            <button
                class="disabled:opacity-40 hover:underline transition-colors duration-200"
                :disabled="currentPage === totalPages"
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
            >Next</button>
        </div>
    </section>
</template>
