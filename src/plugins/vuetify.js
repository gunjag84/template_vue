import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useStorage } from '@vueuse/core'
import { watch, reactive } from 'vue'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Create a composable for theme management that can be imported anywhere
export const useThemeManager = () => {
  const isDark = useStorage('dark-mode', window.matchMedia('(prefers-color-scheme: dark)').matches)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // Return a reactive object with getters/setters for isDark
  return reactive({
    get isDark() {
      return isDark.value
    },
    set isDark(value) {
      isDark.value = value
    },
    toggleTheme,
  })
}

// Define theme settings
const lightTheme = {
  dark: false,
  colors: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#FFFFFF',
    surface: '#FAFAFA',
    'on-primary': '#FFFFFF', // Text on primary color
    'on-secondary': '#FFFFFF', // Text on secondary color
    'on-background': '#000000', // Text on background
    'on-surface': '#000000', // Text on surface
  },
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#2196F3',
    secondary: '#757575',
    accent: '#FF4081',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#121212',
    surface: '#212121',
    'on-primary': '#FFFFFF', // Text on primary color
    'on-secondary': '#FFFFFF', // Text on secondary color
    'on-background': '#FFFFFF', // Text on background
    'on-surface': '#FFFFFF', // Text on surface
  },
}

// Create and export vuetify instance setup function
export const setupVuetify = (app) => {
  const themeManager = useThemeManager()

  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: themeManager.isDark ? 'dark' : 'light',
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    defaults: {
      VBtn: {
        variant: 'outlined',
      },
      VNavigationDrawer: {
        width: 256,
      },
      VAppBar: {
        elevation: 1,
      },
      VIcon: {
        // Remove default color to allow inheritance
      },
      VAppBarTitle: {},
    },
    display: {
      mobileBreakpoint: 'sm',
    },
  })

  app.use(vuetify)

  // Make theme manager globally available
  app.provide('themeManager', themeManager)

  // Fix the watcher to use a function
  watch(
    () => themeManager.isDark,
    (newValue) => {
      vuetify.theme.global.name.value = newValue ? 'dark' : 'light'
    },
    { immediate: true },
  )

  return vuetify
}
