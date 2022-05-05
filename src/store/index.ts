import {
  addProduct, buyProduct, deleteProduct, Order, products, updateProduct,
} from '@/api/store';
import {
  MaybeProduct, Product, ProductInstance, Products,
} from '@/api/types';
import { getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    initialized: false,
    products: [] as Products,
    orders: [] as Order[],
  },
  mutations: {
    setProducts(state, list) {
      state.products = list;
    },
    initialize(state) {
      if (state.initialized) return;
      state.initialized = true;
    },
  },
  actions: {
    async buyProduct(context, payload: Order) {
      return buyProduct(payload);
    },
    hasProduct(context, id) {
      return context.state.products.find((product) => product.id === id);
    },
    readSnapshot(context, snapshot: QuerySnapshot) {
      const list: Products = [];
      snapshot.docs.forEach((product) => {
        const doc = product.data() as ProductInstance;
        doc.id = product.id;
        list.push(doc);
      });
      store.commit('setProducts', list);
      store.commit('initialize');
    },
    async fetchProducts(context) {
      const snapshot = await getDocs(products);
      context.dispatch('readSnapshot', snapshot);
    },
    async initialize(context) {
      if (context.state.initialized) return;
      await context.dispatch('fetchProducts');
    },
    async updateProduct(context, payload) {
      const { id } = payload;
      const existingProduct = payload as MaybeProduct;
      delete existingProduct.id;
      await updateProduct(id, existingProduct);
      existingProduct.id = id;
    },
    async addProduct(context, payload: ProductInstance) {
      const newProduct = payload as MaybeProduct;
      delete newProduct.id;
      return addProduct(newProduct as Product);
    },
    async deleteProduct(context, id: string) {
      return deleteProduct(id);
    },
  },
  modules: {
  },
});

onSnapshot(products, (snapshot) => {
  store.dispatch('readSnapshot', snapshot);
});

export default store;
