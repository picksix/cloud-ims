<template>
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
        <button class="button-6" role="button">Add to Cart</button>
    </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Product extends Vue {}
</script>

<style scoped>
.productMain {
    height: 350px;
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

.button-6 {
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
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.button-6:hover,
.button-6:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
  transform: translateY(-1px);
}

.button-6:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>
