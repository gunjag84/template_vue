<script setup>
// Import necessary composables and components
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppNavigation from '@/components/layout/AppNavigation.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useThemeManager } from './plugins/vuetify'

// Get i18n instance
useI18n()

// Navigation drawer state
const drawer = ref(false)

// Get theme manager
const themeManager = inject('themeManager') || useThemeManager()

// Common navigation routes for both header and drawer
const routes = [
  { path: '/', name: 'home', icon: 'mdi-home' },
  { path: '/about', name: 'about', icon: 'mdi-information' }
]

// Toggle drawer function to pass to header
const toggleDrawer = () => {
  drawer.value = !drawer.value
}

// Provide themeStore-compatible interface for existing components
const themeStore = {
  isDark: themeManager.isDark,
  toggleTheme: () => {
    themeManager.toggleTheme()
  }
}
</script>

<template>
  <v-app :theme="themeManager.isDark ? 'dark' : 'light'">
    <!-- App Header -->
    <AppHeader :routes="routes" :theme-store="themeStore" @toggle-drawer="toggleDrawer" />

    <!-- Navigation Drawer -->
    <AppNavigation v-model:drawer="drawer" :routes="routes" :theme-store="themeStore" />

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <AppFooter />

    <!-- Loading Spinner -->
    <LoadingSpinner />
  </v-app>
</template>
