import { menusAdmin } from '@/utils/menu';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from './store';

const newMenus:RouteRecordRaw[] = [];
const children = (menus: typeof menusAdmin) => {
  menus.forEach((item) => {
    if (item.children) {
      children(item.children as typeof menusAdmin);
    } else {
      newMenus.push({
        path: item.path,
        name: item.file,
        component: () => import(`../pages/${item.folder}/${item.file}.vue`),
      });
    }
  });
};
children(menusAdmin);
const routers = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', name: 'Login', component: () => import('@p/login/Login.vue') },
    {
      path: '/admin',
      component: () => import('@p/layout/Layout.vue'),
      children: newMenus,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
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
  } else {
    next();
  }
});

export default routers;
