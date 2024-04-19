<script setup>
import Navbar from './components/Navbar.vue'
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
  <Navbar v-if="router.currentRoute.value.name !== 'login'"></Navbar>
  <RouterView/>
</template>

<style scoped>
</style>
