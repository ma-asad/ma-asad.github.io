<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import SocialLinks from '@/components/SocialLinks.vue'
import workExpData from '@/data/workExpData.json'

// Determine current role dynamically: prefer isCurrent, fallback to highest id
const currentExp = computed(() => {
    const marked = workExpData.find((exp) => exp.isCurrent === true)
    if (marked) return marked
    return workExpData.reduce((latest, exp) => (exp.id > latest.id ? exp : latest), workExpData[0])
})

const fullName = 'Mohammad Asad Atterkhan'
const typedName = ref('')
let typingTimeout
let restartTimeout
let setVhHandler

onMounted(() => {
    // Allow scroll on mobile; lock only on larger screens
    if (window.innerWidth >= 768) {
        document.body.style.overflow = 'hidden'
    } else {
        setVhHandler = () => {
            const footer = document.getElementById('home-footer')
            const footerH = footer ? footer.offsetHeight : 0
            const vh = window.innerHeight - footerH
            document.documentElement.style.setProperty('--vh', `${vh}px`)
            document.documentElement.style.setProperty('--footerH', `${footerH}px`)
        }
        setVhHandler()
        window.addEventListener('resize', setVhHandler)
        document.body.style.overflow = 'hidden'
    }

    // Typing effect loop for name (restarts every 4s after completion)
    const startTypingLoop = () => {
        typedName.value = ''
        let i = 0
        const step = () => {
            if (i < fullName.length) {
                typedName.value += fullName.charAt(i)
                i++
                typingTimeout = window.setTimeout(step, 90)
            } else {
                restartTimeout = window.setTimeout(startTypingLoop, 4000)
            }
        }
        step()
    }
    startTypingLoop()
})

onBeforeUnmount(() => {
    // Re-enable scroll when leaving home
    document.body.style.overflow = ''
    if (setVhHandler) {
        window.removeEventListener('resize', setVhHandler)
    }
    if (typingTimeout) clearTimeout(typingTimeout)
    if (restartTimeout) clearTimeout(restartTimeout)
})
</script>

<template>
    <section class="min-h-screen home-hero flex flex-col items-center justify-center text-center overflow-hidden w-full px-6 max-w-5xl mx-auto">
        <img
            src="@/assets/img/PixMeAlone.gif"
            alt="Profile"
            class="h-40 w-40"
        />
        <h1 class="mt-6 text-3xl font-semibold">
            <span>{{ typedName }}</span>
            <span class="ml-1 opacity-75 animate-pulse">|</span>
        </h1>
        <p class="mt-2 text-gray-700">
            {{ currentExp?.title }} at
            <span class="text-blue-700 font-semibold">{{ currentExp?.company }}</span>
        </p>
        <p class="mt-3 text-gray-600 mx-auto leading-relaxed">
            Passionate about cybersecurity, networking, automation and technology in general.
            <br>
            Oh and I also like Cats! 🐱
        </p>
        <div class="mt-4 flex items-center space-x-4">
            <RouterLink
                to="/resume"
                class="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:border-[rgb(130,130,6)] hover:text-[rgb(130,130,6)] transition"
            >
                Resume
            </RouterLink>
            <RouterLink
                to="/blog"
                class="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:border-[rgb(130,130,6)] hover:text-[rgb(130,130,6)] transition"
            >
                <font-awesome-icon :icon="['fas', 'code']" class="text-sm"/>
                <span>Blog</span>
            </RouterLink>
        </div>
        <div class="mt-4">
            <SocialLinks />
        </div>
    </section>
</template>