import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    fetchProducts(context) {
      // TODO: read products from google cloud function
    },
    buyProduct(context, payload) {
      console.log('buying');
    },
  },
  modules: {
  },
});
