import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupPlugins } from './plugins'

// Import Vuetify styles explicitly
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

// Use the setupPlugins function
const { i18n, vuetify } = setupPlugins(app, router)

// Make i18n and vuetify available for all components
app.config.globalProperties.$i18n = i18n
app.config.globalProperties.$vuetify = vuetify

app.mount('#app')
