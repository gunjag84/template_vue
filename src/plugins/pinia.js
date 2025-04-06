import { createPinia } from 'pinia';

export function setupPinia(app) {
  const pinia = createPinia();
  app.use(pinia);
}
