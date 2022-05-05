<template>
  <div class="modal" :class="editModalClass">
    <span class="modal-background" @click="closeEditModal"></span>
    <div class="modal-content">
      <div class="box">
        <div v-if="editData">
          <div class="field">
            <p class="label">Name</p>
            <input type="text" class="input" v-model="editData.name">
          </div>
          <div class="field">
            <p class="label">Description</p>
            <input type="text" class="input" v-model="editData.description">
          </div>
          <div class="field">
            <p class="label">Image URL</p>
            <input type="url" class="input" v-model="editData.image">
          </div>
          <div class="field">
            <p class="label">Price</p>
            <input type="number" class="input" v-model="editData.price">
          </div>
          <div class="field">
            <p class="label">Quantity</p>
            <input type="number" class="input" v-model="editData.quantity">
          </div>
          <br>
          <p class="help has-text-danger" v-if="error">{{error}}</p>

          <div v-if="!submitting">
            <div class="buttons is-right" v-if="editData.id == null">
              <div class="button is-success" @click="submit">Create</div>
            </div>
            <div class="buttons is-right" v-else>
              <div class="button is-danger" @click="deleteProduct">Delete</div>
              <div class="button is-primary" @click="submit">Edit</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-half">
      <div class="box">
        <div class="level">
          <div class="level-left">
            <h1 class="title is-2 level-item">Products</h1>
          </div>
          <div class="level-right">
            <div class="button is-success level-item" @click="openCreator">Create</div>
          </div>
        </div>

        <table class="table is-fullwidth" v-if="products.length">
          <thead>
            <tr>
              <th>Name</th>
              <th class="is-narrow">Quantity</th>
              <th class="is-narrow">Price</th>
              <th class="is-narrow"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <p>
                  {{product.name}} <span class="has-text-danger" v-if="product.quantity === 0">
                    Out of stock!
                  </span>
                </p>
              </td>
              <td v-if="product.quantity === 0" class="has-text-danger">{{product.quantity}}</td>
              <td v-else>{{product.quantity}}</td>
              <td>{{format(product.price)}}</td>
              <td>
                <a @click="editProduct(product)" class="is-unselectable">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="has-text-centered" v-else>
          <p class="subtitle">No products to display!</p>
        </div>
      </div>
    </div>
    <div class="column is-half">
      <div class="box">
        <h1 class="title is-2 is-unselectable">Recent Orders</h1>
        <table class="table is-fullwidth" v-if="orders.length">
          <thead>
            <tr>
              <th>Customer</th>
              <th>CC</th>
              <th>Product</th>
              <th class="is-narrow">Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.time">
              <td>{{order.data().order.name ?? 'none'}}</td>
              <td>{{order.data().order.cc ?? 'none'}}</td>
              <td>{{order.data().product}}</td>
              <td>{{order.data().order.quantity}}</td>
              <td><a @click="deleteOrder(order.id)" class="has-text-danger">Delete</a></td>
            </tr>
          </tbody>
        </table>
        <div class="has-text-centered" v-else>
          <p class="subtitle">No orders to display!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductInstance } from '@/api/types';
import { Options, Vue } from 'vue-class-component';

@Options({
  data() {
    return {
      showEditModal: false,
      editData: undefined,
      submitting: false,
      error: undefined,
    };
  },
  mounted() {
    this.resetData();
  },
  computed: {
    editModalClass() {
      return {
        'is-active': this.showEditModal,
      };
    },
    products() { return this.$store.state.products; },
    orders() { return this.$store.state.orders; },
  },
  methods: {
    format(number: number) {
      return Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(number);
    },
    deleteOrder(id: string) {
      this.$store.dispatch('deleteOrder', id);
    },
    resetData() {
      this.editData = {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image: '',
        id: null,
      };
    },
    openCreator() {
      this.resetData();
      this.openEditor();
    },
    editProduct(product: ProductInstance) {
      this.editData = {
        name: product.name ?? '',
        description: product.description ?? '',
        price: product.price ?? 0,
        quantity: product.quantity ?? 0,
        image: product.image ?? '',
        id: product.id,
      };
      this.openEditor();
    },
    async deleteProduct() {
      if (this.submitting) {
        return;
      }
      this.error = undefined;
      this.submitting = true;
      try {
        if (this.editData.id) {
          await this.$store.dispatch('deleteProduct', this.editData.id);
        }
        this.closeEditModal();
      } catch (e) {
        this.error = 'Failed to delete product';
      } finally {
        this.submitting = false;
      }
    },
    openEditor() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    async submit() {
      if (this.submitting) {
        return;
      }
      this.error = undefined;
      this.submitting = true;
      try {
        if (this.editData.id) {
          await this.$store.dispatch('updateProduct', this.editData);
        } else {
          await this.$store.dispatch('addProduct', this.editData);
        }
        this.closeEditModal();
      } catch (e) {
        this.error = 'Failed to commit change!';
      } finally {
        this.submitting = false;
      }
    },
  },
})
export default class Staff extends Vue {}
</script>
