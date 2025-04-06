<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
    routes: {
        type: Array,
        required: true
    },
    themeStore: {
        type: Object,
        required: true
    }
})

defineEmits(['toggle-drawer'])
</script>

<template>
    <v-app-bar elevation="1" color="">
        <!-- Mobile menu toggle -->
        <v-app-bar-nav-icon @click="$emit('toggle-drawer')" class="d-md-none"></v-app-bar-nav-icon>

        <!-- App title -->
        <v-app-bar-title>{{ t('app_name') }}</v-app-bar-title>

        <v-spacer></v-spacer>

        <!-- Desktop navigation -->
        <div class="d-none d-md-flex">
            <v-btn v-for="route in routes" :key="route.path" :to="route.path" :prepend-icon="route.icon" variant="text">
                {{ t(route.name) }}
            </v-btn>
        </div>

        <!-- Theme toggle -->
        <v-btn icon @click="themeStore.toggleTheme">
            <v-icon>{{ themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
    </v-app-bar>
</template>
