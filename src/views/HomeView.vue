<script setup>
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme-store'

const { t } = useI18n()
const themeStore = useThemeStore()
</script>

<template>
  <v-container fluid>
    <v-card flat class="pa-6">
      <h1 class="text-h4 mb-4">{{ t('welcome_message') }}</h1>
      <p class="text-body-1">{{ t('home_description') }}</p>

      <!-- Demo content to show theme changes -->
      <v-divider class="my-4"></v-divider>

      <v-row class="mt-6">
        <v-col cols="12" md="6">
          <v-card :color="themeStore.isDark ? 'primary-darken-1' : 'primary-lighten-4'" class="pa-4 mb-4">
            <v-card-title>{{ t('theme_demo') }}</v-card-title>
            <v-card-text>
              {{ t('current_theme') }}: <strong>{{ themeStore.isDark ? t('dark_mode') : t('light_mode') }}</strong>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
