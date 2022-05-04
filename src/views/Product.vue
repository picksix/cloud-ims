<template>
<div>
  <p class="titleName">Product Name</p>
  <div class="productMain">
    <div class="productImage" id="prod">
        <img src="https://clipartmag.com/images/transparent-smiley-face-10.png" alt="smileyFace">
    </div>
    <div class="productDesc" id="prod">
        <h1 class="productName">Product Name</h1>
        <form action="POST">
            <div class="description">
                <label for="describe">Product Description</label>
                <div class="prodDescInfo">
                    <p>This product blah blah blah blah blah blah blah blah blah
                        blah blah blah
                    </p>
                </div>
            </div>
            <hr>
            <div class="stockCount">
                <label for="quantcount">In Stock</label>
                <p>36 available</p>
            </div>
            <hr>
            <div class="quantity">
                <label for="prodQuantity">Product Quantity</label>
                <select name="quantity" id="quant">
                    <option>Select Quantity</option>
                    <option v-for="i in 10" :key="i"> {{ i }} </option>
                </select>
            </div>
        </form>
        <div class="productPrice">Price: $</div>
        <button class="cart-button" id="cartButton" @click="buy()">Buy Now</button>
    </div>

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
import { Options, Vue } from 'vue-class-component';

@Options({
  data: () => ({
    popup: false,
  }),
  computed: {
    popupClass() {
      return {
        'open-popup': this.popup,
      };
    },
  },
  methods: {
    buy() {
      // TODO: call buy, if success, popup
      this.popup = true;
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
    background-color:rgb(255, 252, 248);
}

.productImage img {
    display: block;
    max-width: 50%;
    max-height:50%;
    width: auto;
    height: auto;
    float:right;
    padding-right: 25%;
    padding-top: 25%;
}

.productDesc {
    width: 40%;
    float: right;
    border-style: solid;
    border-color: orange;
    height: 550px;
    background-color:rgb(255, 252, 248);
}

.productName {
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular',
     'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 36px;
    font-style: bold;
    color: black;
}

.description {
    margin-top: 20px;
}
.prodDescInfo{
    max-width: 250px;
    max-height: 80px;
    float: right;
    margin-right: 25px;
    color: black;
    overflow: hidden;
}

.stockCount p {
    float: right;
    margin-right: 120px;
    text-align: center;
    color: black;
}

.quantity select{
    float: right;
    margin-right: 100px;
    margin-top: 5px;
    background: white;
    border-style: groove;
    border-color: black;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
}

label {
    color: black;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    margin-left: 10px;
}

.productPrice {
    color: black;
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

.popup {
    width: 400px;
    background: #fff;
    border-radius: 6px;
    border-style: solid;
    border-color: orange;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50% scale(0.1));
    text-align: center;
    padding: 0 30px 30px;
    color: #333;
    visibility: hidden;
    transition: transform .4s, top .4s;
}

.popup img{
    width: 100px;
    margin-top: -50px;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background: white;
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
    transform: translate(-50%, -50% scale(1));
}
</style>
