import { menusAdmin } from '@/utils/menu';
import { createRouter, createWebHashHistory } from 'vue-router';
import store from './store';

const routers = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', name: 'Login', component: () => import('@p/login/Login.vue') },
    {
      path: '/admin',
      component: () => import('@p/layout/Layout.vue'),
      children: menusAdmin.map((item) => ({
        path: item.path,
        name: item.file,
        component: () => import(`../pages/${item.folder}/${item.file}.vue`),
      })),
    },
  ],
});

routers.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.users) {
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath,
      },
    });
  }
  next();
});

export default routers;
