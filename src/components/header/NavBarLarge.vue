<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isHome = computed(() => route.name === 'home');

const isScrolled = ref(false);

function handleScroll() {
  const currentScrollY = window.scrollY;
  
  // Determine if header should be fixed
  isScrolled.value = currentScrollY > 50;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    :class="[
      'z-50 transition-all duration-300',
      isHome ? 'absolute top-0 left-0 right-0 bg-transparent' : 'sticky top-0 left-0 right-0 bg-white'
    ]"
  >
    <div class="flex items-center max-w-5xl mx-auto w-full px-6" :class="[isHome ? 'justify-end' : 'justify-between', { 'py-2': isScrolled && !isHome, 'py-4': !isScrolled || isHome }]"></div>
    <div class="flex items-center max-w-5xl mx-auto w-full px-6" :class="[isHome ? 'justify-end' : 'justify-between', { 'mb-4': !isScrolled && !isHome }]">
      <div v-if="!isHome" class="flex items-center">
        <img 
          src="@/assets/img/PixMeAlone.gif" 
          alt="Pixel Me" 
          :class="{ 'h-10 w-10': isScrolled, 'h-14 w-14': !isScrolled }"
        />
      </div>
      <nav>
        <ul class="flex space-x-4 font-medium">
          <li v-if="!isHome"><RouterLink to="/" class="hover:underline hover:text-[rgb(130,130,6)]">Home</RouterLink></li>
          <li v-if="!isHome"><RouterLink to="/blog" class="hover:underline hover:text-[rgb(130,130,6)]">Blog</RouterLink></li>
          <li v-if="!isHome"><RouterLink to="/resume" class="hover:underline hover:text-[rgb(130,130,6)]">Resume</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
  
  
</template>