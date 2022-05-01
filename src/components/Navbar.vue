<template>
  <nav class="navbar is-dark is-bold is-unselectable">
    <div class="navbar-brand">
      <a class="navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">

      </div>
      <div class="navbar-end">
        <router-link to="staff" class="navbar-item">Staff</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {},
})
export default class Navbar extends Vue {

}
</script>
