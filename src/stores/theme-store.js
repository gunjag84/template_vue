import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useThemeStore = defineStore('theme', () => {
  const { t } = useI18n()
  const isDark = ref(false)

  // Initialize theme from localStorage if available
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Check system preference
      isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // Persist theme changes to localStorage
  watch(isDark, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme', newValue ? 'dark' : 'light')
    }
  })

  // Toggle between light and dark themes
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  // Get the current theme
  const currentTheme = ref(() => (isDark.value ? 'dark' : 'light'))

  // Get the icon for the toggle button
  const themeIcon = ref(() => (isDark.value ? 'mdi-weather-sunny' : 'mdi-weather-night'))

  // Get the tooltip text for the toggle button
  const themeTooltip = ref(() => (isDark.value ? t('switch_to_light') : t('switch_to_dark')))

  return {
    isDark,
    toggleTheme,
    currentTheme,
    themeIcon,
    themeTooltip,
  }
})
