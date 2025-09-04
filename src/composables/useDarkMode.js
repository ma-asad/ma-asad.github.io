import { ref } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    if (typeof window === 'undefined') return
    
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  // Apply theme to document
  const applyTheme = () => {
    if (typeof document === 'undefined') return
    
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
    applyTheme()
  }

  // Watch for system theme changes
  const watchSystemTheme = () => {
    if (typeof window === 'undefined') return () => {}
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches
        applyTheme()
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }

  return {
    isDark,
    toggleTheme,
    initTheme,
    watchSystemTheme
  }
}
