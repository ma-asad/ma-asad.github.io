<!-- NavBarResponsive.vue -->
<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const route = useRoute();
const isHome = computed(() => route.name === 'home');

const menuOpen = ref(false);
const isFixed = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  
  // make header fixed after scrolling 50px
  isFixed.value = currentScrollY > 50;
};

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
      'w-full z-50 transition-all duration-300 pt-6 pb-2 md:pt-0 md:pb-0',
      isHome ? 'absolute left-0 right-0 bg-transparent top-2 md:top-0' : 'relative bg-white bg-opacity-90'
    ]"
  >
    <div class="max-w-5xl mx-auto w-full px-6 flex items-center justify-between">
      <!-- Show gif icon on non-home pages (mobile) -->
      <div class="flex items-center">
        <img v-if="!isHome" src="@/assets/img/PixMeAlone.gif" alt="Pixel Me" class="h-8 w-8" />
      </div>
      <button class="md:hidden block ml-auto" @click="toggleMenu" aria-label="Toggle navigation">
        <font-awesome-icon v-if="!menuOpen" :icon="['fas', 'ellipsis']" size="2x"/>
        <font-awesome-icon v-else :icon="['fas', 'xmark']" size="2x"/>
      </button>
    </div>

    <!-- Fullscreen overlay menu on mobile -->
    <div 
      v-if="menuOpen" 
      class="fixed inset-0 bg-white/95 z-40 flex items-center justify-center"
      @click.self="closeMenu"
    >
      <ul class="flex flex-col items-center space-y-6 text-lg">
        <li v-if="!isHome">
          <RouterLink to="/" class="hover:underline hover:text-[rgb(130,130,6)]" @click="closeMenu">Home</RouterLink>
        </li>
        <li v-if="!isHome">
          <RouterLink to="/blog" class="hover:underline hover:text-[rgb(130,130,6)]" @click="closeMenu">Blog</RouterLink>
        </li>
        <li v-if="!isHome">
          <RouterLink to="/resume" class="hover:underline hover:text-[rgb(130,130,6)]" @click="closeMenu">Resume</RouterLink>
        </li>
      </ul>
    </div>

    <!-- Desktop navigation (hidden on mobile) -->
    <nav class="hidden md:block w-full mt-4 md:mt-2 max-w-5xl mx-auto px-6">
      <ul class="flex flex-row justify-end items-center space-x-4">
        <li v-if="!isHome">
          <RouterLink to="/" class="hover:underline hover:text-[rgb(130,130,6)]">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/blog" class="hover:underline hover:text-[rgb(130,130,6)]">Blog</RouterLink>
        </li>
        <li v-if="!isHome">
          <RouterLink to="/resume" class="hover:underline hover:text-[rgb(130,130,6)]">Resume</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  
  
</template>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>