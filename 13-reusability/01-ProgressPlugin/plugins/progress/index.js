import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const progressContainer = container || document.body.appendChild(document.createElement('div'));
  const progressInstance = createApp(TheTopProgressBar).mount(progressContainer);

  const progress = {
    start: progressInstance.start,
    finish: progressInstance.finish,
    fail: progressInstance.fail,

    install(app) {
      if (router) {
        router.beforeEach((to) => {
          progress.start(to);
        });

        router.afterEach((to) => {
          progress.finish(to);
        });

        router.onError(() => {
          progress.fail();
        });
      }

      app.provide(PROGRESS_KEY, progress);
      app.component('TheTopProgressBar', TheTopProgressBar);
    },
  };

  return progress;
}
