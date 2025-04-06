import { setupVuetify } from './vuetify'
import { setupPinia } from './pinia'
import { setupI18n } from './i18n'

export function setupPlugins(app, router) {
  app.use(router)
  setupPinia(app)
  const vuetify = setupVuetify(app)
  const i18n = setupI18n(app)

  // Make i18n available globally for components
  app.provide('i18n', i18n)

  return { i18n, vuetify }
}
