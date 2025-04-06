<script setup>
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

const { t } = useI18n()
const display = useDisplay()

// Props
defineProps({
    drawer: {
        type: Boolean,
        required: true
    },
    routes: {
        type: Array,
        required: true
    },
    themeStore: {
        type: Object,
        required: true
    }
})

// Emit events
const emit = defineEmits(['update:drawer'])

// When drawer changes internally
const updateDrawer = (value) => {
    emit('update:drawer', value)
}
</script>

<template>
    <v-navigation-drawer :model-value="drawer" @update:model-value="updateDrawer" temporary
        :location="display.smAndDown.value ? 'bottom' : 'left'" :height="display.smAndDown.value ? '80vh' : undefined"
        :width="!display.smAndDown.value ? '256' : undefined" rounded="t-xl" class="transition-swing">
        <v-list>
            <v-list-item :title="t('app_name')" prepend-icon="mdi-application" class="py-4"></v-list-item>
            <v-divider></v-divider>
            <v-list-item v-for="route in routes" :key="route.path" :to="route.path" :prepend-icon="route.icon"
                :title="t(route.name)">
            </v-list-item>

            <!-- Theme Toggle in Drawer -->
            <v-divider class="my-2"></v-divider>
            <v-list-item @click="themeStore.toggleTheme"
                :prepend-icon="themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                :title="themeStore.isDark ? t('switch_to_light') : t('switch_to_dark')">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
