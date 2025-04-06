import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import de from '@/locales/de.json'

export function setupI18n(app) {
  const i18n = createI18n({
    legacy: false, // Use Composition API mode
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, de },
  })

  app.use(i18n)

  return i18n
}
