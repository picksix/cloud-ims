<template>
  <Navbar/>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from './components/Navbar.vue';
import '@/assets/theme.scss';

@Options({
  components: { Navbar },
})
export default class Staff extends Vue {}
</script>
