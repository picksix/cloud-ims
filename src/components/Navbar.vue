<template>
  <nav class="navbar is-dark is-bold is-unselectable">
    <div class="navbar-brand">
      <a class="navbar-burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
    <div class="navbar-menu" :class="navbarStyle">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
      </div>
      <div class="navbar-end">
        <router-link to="/staff" class="navbar-item">Staff</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  data: () => ({
    showMenu: false,
  }),
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
  computed: {
    navbarStyle() {
      return { 'is-active': this.showMenu };
    },
  },
})
export default class Navbar extends Vue {

}
</script>
