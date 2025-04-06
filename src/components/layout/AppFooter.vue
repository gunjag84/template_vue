<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <v-footer app fixed height="70" class="d-flex justify-center py-4">
        <div class="text-center">
            © {{ new Date().getFullYear() }} — {{ t('app_name') }}
        </div>
    </v-footer>
</template>
