<template>
<div class="modal" :class="errorModalClass" >
  <div class="modal-background" @click="closeError"></div>
  <div class="modal-content">
    <div class="box">
      <h1 class="title is-1">Error</h1>
      Sorry, but your purchase failed.
      <br>
      <br>
      <button class="button" @click="closeError">OK</button>
    </div>
  </div>
</div>
<div v-if="product">
  <p class="titleName">{{product.name}}</p>
  <div class="productMain">
    <div class="productImage" id="prod">
      <div class="imgDiv">
        <img :src="product.image" alt="smileyFace">
      </div>
    </div>
    <div class="productDesc" id="prod">
        <h1 class="productName">{{product.name}}</h1>
        <form action="POST">
            <div class="description">
                <label for="describe">Product Description</label>
                <div class="prodDescInfo">
                    <p>{{product.description}}</p>
                </div>
            </div>
            <hr>
            <div class="stockCount" v-if="product.quantity > 0">
                <label for="quantcount">In Stock</label>
                <p><strong>{{product.quantity}}</strong> available</p>
            </div>
            <div class="stockCount" v-else>
                <label for="quantcount" class="has-text-danger">Out of Stock!</label>
            </div>
            <div v-if="product.quantity > 0">
              <hr>
              <div class="quantity">
                <label for="prodQuantity">Product Quantity</label>
                <input type="number" name="quantity" class="input"
                  min="1" :max="product.quantity"
                  v-model="quantity" @change="quantityChange">
              </div>
            </div>
        </form>
        <div v-if="product.quantity > 0">
          <div class="productPrice">Price: {{formattedPrice}}</div>
          <div class="productPrice">Total: {{formattedTotal}}</div>
          <button class="cart-button" id="cartButton" @click="purchasePopup()">Buy Now</button>
        </div>
    </div>

  </div>
  <div class="orderpopup" :class="orderpopupClass">
        <img src="../IconImages/checkbox-circle-line.png">
        <form action="POST">
          <br>
          <label for="purchaseName">Name:</label>
          <input type="text" name="purchaseName" id="purchaseName" v-model="name"><br><br>
          <label for="ccn">CCN:</label>
          <input type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}"
          maxlength="19" placeholder="xxxx xxxx xxxx xxxx" v-model="ccn">
        </form>
        <button type="button" @click="buy()">Complete Purchase</button>
  </div>
  <div class="popup has-text-centered" :class="popupClass">
        <img src="../IconImages/checkbox-circle-line.png">
        <h2>Thank You!</h2>
        <p>Your purchase was successful! You will now be sent back to the store page.</p>
        <button type="button" @click="goToStore()">OK</button>
  </div>
</div>
</template>

<script lang="ts">
import { ProductInstance } from '@/api/types';
import { Options, Vue } from 'vue-class-component';

@Options({
  data: () => ({
    popup: false,
    orderpopup: false,
    quantity: 1,
    buying: false,
    err: false,
    name: '',
    ccn: '',
  }),
  computed: {
    errorModalClass(): string {
      return this.err ? 'is-active' : '';
    },
    popupClass() {
      return {
        'open-popup': this.popup,
      };
    },
    orderpopupClass() {
      return {
        'open-popup': this.orderpopup,
      };
    },
    product() {
      return this.$store.state.products.find(
        (product: ProductInstance) => product.id === this.$route.params.id,
      );
    },
    formattedPrice() {
      return this.format(this.product.price);
    },
    formattedTotal() {
      return this.format(this.product.price * this.quantity);
    },
  },
  methods: {
    format(number: number) {
      return Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(number);
    },
    quantityChange() {
      const p = this.product;
      if (!p) return;
      if (this.quantity > p.quantity) {
        this.quantity = p.quantity;
      }
    },
    closeError() {
      this.err = undefined;
    },
    closePurchasePopup() {
      this.orderpopup = false;
    },
    purchasePopup() {
      this.orderpopup = true;
    },
    async buy() {
      if (this.buying) return;
      this.buying = true;
      try {
        const success = await this.$store.dispatch('buyProduct', {
          id: this.product.id,
          quantity: this.quantity,
        });
        if (!success) {
          this.err = true;
        } else {
          this.popup = true;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.closePurchasePopup();
        this.buying = false;
      }
    },
    goToStore() {
      this.$router.push({
        name: 'store',
      });
    },
  },
})
export default class Product extends Vue {
  popup!: boolean
}
</script>

<style scoped>
.productMain {
    height: 800px;
}

.productImage {
    width: 55%;
    float: left;
    border-style: solid;
    border-color: orange;
    height: 800px;
    background-color:black;
}

 .productImage img {
    max-width: 50%;
    max-height:50%;
    align-self: center;
    width: auto;
    height: auto;
    margin: auto;
    display: flex;
}

.imgDiv {
  justify-content: center;
  margin-top: 12%;
  max-width: 720;
  max-height: 740;
}

.productDesc {
    width: 40%;
    float: right;
    border-style: solid;
    border-color: orange;
    height: 550px;
    background-color: black;
}

.productName {
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular',
     'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 36px;
    font-style: bold;
    color: white;
}

.description {
    margin-top: 20px;
}
.prodDescInfo{
    max-width: 250px;
    max-height: 80px;
    float: right;
    margin-right: 25px;
    color: white;
    overflow: hidden;
}

.stockCount p {
    float: right;
    margin-right: 120px;
    text-align: center;
    color: white;
}

.quantity input{
    float: right;
    margin-right: 135px;
    margin-top: 5px;
    background: white;
    border-style: groove;
    border-color: black;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
    font-weight: 600;
}

label {
    color: white;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    margin-left: 10px;
    font-weight: bold;
}

.productPrice {
    color: white;
    font-family: 'Courier New', Courier, monospace;
    font-size: 24px;
    font-weight: bold;
    text-align:left;
    margin-left: 10px;
}

.quantity, .description, .stockCount {
    height: 75px;
}

.cart-button {
  text-align: center;
  align-items: center;
  background-color: #f87721;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin-top: 20px;
  margin-left: 37%;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  transition: all 250ms;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.cart-button:hover,
.cart-button:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.cart-button:hover {
  transform: translateY(-1px);
}

.cart-button:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}

.orderpopup {
    width: 400px;
    background: rgb(35, 41, 59);
    border-radius: 6px;
    border-style: solid;
    border-color: orange;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.1);
    text-align: left;
    padding: 0 30px 30px;
    color: rgb(255, 255, 255);
    visibility: hidden;
    transition: transform .4s, top .4s;
}

.orderpopup img{
    width: 100px;
    margin-top: -50px;
    padding-left: 0;
    margin-left: 125px;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background: rgb(255, 255, 255);
}

.orderpop label {
  /* float: left; */
  text-align: left;
  margin-left: 10px;
}

.orderpopup button {
  width: 100%;
    margin-top: 50px;
    padding: 10px 0;
    background: #4a7cd9;
    color: white;
    border: 0;
    outline: none;
    font-size: 18px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.popup {
    width: 400px;
    background: rgb(35, 41, 59);
    border-radius: 6px;
    border-style: solid;
    border-color: orange;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.1);
    text-align: center;
    padding: 0 30px 30px;
    color: rgb(255, 255, 255);
    visibility: hidden;
    transition: transform .4s, top .4s;
}

.popup img{
    width: 100px;
    margin-top: -50px;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background: rgb(255, 255, 255);
}

.popup h2 {
    font-size: 26px;
    font-weight: 500;
    margin: 30px 0 10px;
}

.popup button {
    width: 100%;
    margin-top: 50px;
    padding: 10px 0;
    background: #4a7cd9;
    color: white;
    border: 0;
    outline: none;
    font-size: 18px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.open-popup {
    visibility: visible;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
}
</style>
