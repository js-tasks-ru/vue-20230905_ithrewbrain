export const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('../views/PageIndex.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/PageLogin.vue'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../views/PageRegister.vue'),
  },
];
