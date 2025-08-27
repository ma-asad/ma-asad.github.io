<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import posts from '@/data/postData.json'

const route = useRoute()
const postId = route.params.id

const post = posts.find((p) => p.id === postId)

const html = ref('')

onMounted(() => {
    const fetchPostContent = async () => {
        try {
            const response = await fetch(`/data/posts/${postId}.html`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const text = await response.text()
            html.value = text
        } catch (error) {
            html.value = '<h1>Error</h1><p>Failed to load the post content.</p>'
            console.error('Failed to fetch post content:', error)
        }
    }

    fetchPostContent()
})
</script>

<template>
    <div class="post-content mx-auto max-w-5xl w-full px-6">
        <div class="mb-4 flex items-center justify-between">
            <router-link to="/blog" class="text-sm text-gray-600 hover:text-gray-900 hover:underline">← Back to Blog</router-link>
            <span class="text-sm text-gray-500"><font-awesome-icon :icon="['fas', 'calendar-days']" class="mr-1"/> {{ post.date }}</span>
        </div>

        <article class="prose prose-neutral max-w-none">
            <div class="mb-2">
                <span
                    v-for="category in post.categories"
                    :key="category"
                    class="inline-block bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs mr-2"
                >{{ category }}</span>
            </div>
            <div v-html="html"></div>
            <div class="mt-6">
                <span v-for="tag in post.tags" :key="tag" class="inline-block bg-black text-white px-2 py-0.5 rounded text-xs mr-2">#{{ tag }}</span>
            </div>
        </article>
    </div>
</template>

<style scoped>
.post-content {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}

.output {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}

.prose {
    color: #333;
}

.post-meta {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    align-items: left;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #555;
}

.tag {
    display: inline-block;
    background-color: #000;
    color: #fff;
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
    margin-right: 0.5rem;
    font-size: 0.8rem;
}

.category {
    display: inline-block;
    background-color: #e2e8f0;
    color: #2d3748;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    margin-right: 0.5rem;
    font-size: 0.8rem;
}

.prose h1 {
    color: #1f1f1f;
    font-weight: 700;
}

.prose h2 {
    color: #1f1f1f;
    font-weight: 600;
}

.prose h3 {
    color: #1f1f1f;
    font-weight: 600;
}

.prose h4 {
    color: #718096;
    font-weight: 600;
}

.prose h5 {
    color: #718096;
    font-weight: 600;
}

.prose h6 {
    color: #718096;
    font-weight: 600;
}

.prose a {
    color: #3182ce;
    text-decoration: underline;
    transition: color 0.3s;
}

.prose a:hover {
    color: #2b6cb0;
}

.prose code {
    padding: 2px 4px;
    border-radius: 4px;
}

.prose blockquote {
    border-left: 4px solid #cbd5e0;
    padding-left: 1em;
    color: #718096;
    font-style: italic;
}

.prose ul {
    list-style-type: disc;
    padding-left: 1.5em;
}

.prose ol {
    list-style-type: decimal;
    padding-left: 1.5em;
}

.prose img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1em 0;
}

.prose pre {
    padding: 1em;
    border-radius: 12px;
    overflow-x: auto;
}

.prose table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
}

.prose th,
.prose td {
    border: 1px solid #e2e8f0;
    padding: 0.5em 1em;
}

.prose th {
    background-color: #edf2f7;
    font-weight: bold;
}
</style>
