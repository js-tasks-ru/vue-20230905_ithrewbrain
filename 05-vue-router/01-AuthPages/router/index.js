import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: routes,
});
