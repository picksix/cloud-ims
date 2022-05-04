import { getProducts } from '@/api/store';
import { Products } from '@/api/types';
import { createStore } from 'vuex';

export default createStore({
  state: {
    initialized: false,
    products: [] as Products,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    initialize(state) {
      state.initialized = true;
    },
  },
  actions: {
    async fetchProducts(context) {
      context.commit('initialize');
      const products = await getProducts();
      context.commit('setProducts', products);
    },
    buyProduct(context, payload) {
      console.log('buying');
    },
    hasProduct(context, id) {
      return context.state.products.find((product) => product.id === id);
    },
    async initialize(context) {
      if (context.state.initialized) return;
      await context.dispatch('fetchProducts');
    },
  },
  modules: {
  },
});
