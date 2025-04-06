<script setup>
import { useLoadingStore } from '@/stores/loading-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const loadingStore = useLoadingStore()
const { isLoading, loadingProcesses } = storeToRefs(loadingStore)

// Props for customizing the spinner
const props = defineProps({
    size: {
        type: [Number, String],
        default: 64
    },
    color: {
        type: String,
        default: 'primary'
    },
    thickness: {
        type: [Number, String],
        default: 4
    },
    indeterminate: {
        type: Boolean,
        default: true
    },
    overlay: {
        type: Boolean,
        default: true
    },
    text: {
        type: String,
        default: 'Loading...'
    },
    zIndex: {
        type: [Number, String],
        default: 1000
    },
    // Can be used to show the spinner regardless of the loading store state
    forceShow: {
        type: Boolean,
        default: false
    }
})

// Computed property to check if spinner should be visible
const isVisible = computed(() => props.forceShow || isLoading.value)

// Create a computed property for development mode
const isDev = computed(() => import.meta.env.DEV)

// Optionally show which processes are currently loading (for debugging)
const activeProcesses = computed(() => {
    return Object.entries(loadingProcesses.value)
        .filter(([, value]) => value)
        .map(([key]) => key)
})
</script>

<template>
    <div v-if="isVisible" class="position-fixed d-flex align-center justify-center"
        style="top: 0; left: 0; width: 100%; height: 100%;" :style="{ zIndex: zIndex }">
        <!-- Optional overlay -->
        <div v-if="overlay" class="position-absolute bg-black"
            style="top: 0; left: 0; width: 100%; height: 100%; opacity: 0.5; backdrop-filter: blur(2px);">
        </div>

        <div class="d-flex flex-column align-center justify-center rounded-lg pa-6 elevation-4"
            :class="$vuetify.theme.dark ? 'bg-dark-darken-1' : 'bg-white'" style="opacity: 0.9;"
            :style="{ zIndex: parseInt(zIndex) + 1 }">

            <!-- Vuetify circular progress component -->
            <v-progress-circular :size="size" :width="thickness" :color="color"
                :indeterminate="indeterminate"></v-progress-circular>

            <!-- Optional loading text -->
            <div v-if="text" class="mt-4 text-subtitle-1 font-weight-medium text-medium-emphasis">
                {{ text }}
            </div>

            <!-- Debug information - only shown during development -->
            <div v-if="isDev && activeProcesses.length" class="mt-2 text-caption text-disabled text-center"
                style="max-width: 300px; overflow-wrap: break-word;">
                {{ activeProcesses.join(', ') }}
            </div>
        </div>
    </div>
</template>
