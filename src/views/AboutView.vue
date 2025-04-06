<script setup>
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme-store'

const { t } = useI18n()
const themeStore = useThemeStore()
</script>

<template>
  <v-container fluid>
    <v-card flat class="pa-6">
      <h1 class="text-h4 mb-4">{{ t('about') }}</h1>
      <p class="text-body-1">{{ t('about_description') }}</p>

      <!-- Additional themed content -->
      <v-divider class="my-4"></v-divider>

      <v-card :color="themeStore.isDark ? 'secondary-darken-1' : 'secondary-lighten-4'" class="pa-4 mt-4">
        <v-card-title>{{ t('features') }}</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(feature, index) in ['Vue 3', 'Vuetify 3', 'Pinia', 'Vue Router', 'i18n', 'Supabase']"
              :key="index" :title="feature">
              <template v-slot:prepend>
                <v-icon :color="themeStore.isDark ? 'primary' : 'secondary'" class="me-2">mdi-check-circle</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
