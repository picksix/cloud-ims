<template>
  <Navbar/>
  <section class="section" style="padding-top: 20px;">
    <router-view/>
  </section>
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
