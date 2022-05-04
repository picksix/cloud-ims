<template>
<div>
  <span class="shop-title">Rowdy Shop</span>
  <div class="main-shop">
    <div class="product-box" v-for="p in products" :key="p.name">
      <div class="product-item">
        <img :src="p.image" :alt="p.name">
      </div>
      <div class="product-info">
        <h3>{{p.name}}</h3>
        <button @click="select(p)">View</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  computed: {
    products() { return this.$store.state.products; },
  },
  methods: {
    select(product: Product) {
      this.$router.push({
        name: 'product',
        params: {
          id: product.id,
        },
      });
    },
  },
})
</script>

<style scoped>
.shop-title {
  font-weight: bold;
  font-size: 48px;
}

.main-shop {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, auto));
  gap: 50px 5px;
}

.product-item{
  width: 300px;
  height: 300px;
  border-style: solid;
  border-color: rgb(221, 175, 138);
  border-radius: 5px;
  float: left;
}

.product-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-style: solid;
  border-color: rgb(77, 115, 181);
  float: left;
  clear: left;
  border-radius: 5px;
  width: 300px;
  height: 75px;
  margin-top: 2px;
}

.product-info h3 {
  font-size: 20px;
  font-weight: normal;
  margin-left: 10px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.product-info button {
  font-size: 16px;
  float: right;
  margin-right: 10px;
  background: #ee9a55;
  border-radius: 999px;
  box-shadow: #2d67af 0 10px 20px -10px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,
  "Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,
  system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 8px 18px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;

}
</style>
