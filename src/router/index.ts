import store from '@/store';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/store',
    name: 'store',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Store.vue'),
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import(/* webpackChunkName: "staff" */ '@/views/Staff.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '@/views/Product.vue'),
    async beforeEnter(to, from, next) {
      await store.dispatch('initialize');
      if (!await store.dispatch('hasProduct', to.params.id)) { return next('/store'); }
      next();
      return undefined;
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
