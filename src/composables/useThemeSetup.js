import { watch, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme-store'
import { useTheme } from 'vuetify'

export function useThemeSetup() {
  const themeStore = useThemeStore()
  const vuetifyTheme = useTheme()

  // Set the theme based on the store value
  watch(
    () => themeStore.isDark,
    (isDark) => {
      vuetifyTheme.global.name.value = isDark ? 'dark' : 'light'
    },
  )

  // Initialize theme on component mount
  onMounted(() => {
    vuetifyTheme.global.name.value = themeStore.isDark ? 'dark' : 'light'
  })

  return {
    themeStore,
  }
}
