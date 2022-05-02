<template>
<div>
  <h1 class="title is-1">Rowdy Store</h1>
  <div class="columns">
    <div class="column is-half">
      <div class="box">
        Welcome to the Rowdy Store!
        <div class="buttons is-right">
          <div class="button is-dark is-large" @click="viewStore">
            <span>Check it out</span>
            <span class="icon">
              <i class="fas fa-arrow-right"></i>
            </span>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  methods: {
    viewStore() {
      this.$router.push({
        name: 'store',
      });
    },
  },
})
export default class Home extends Vue {}
</script>
