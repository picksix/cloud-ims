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
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
