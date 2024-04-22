<script setup>
import Navbar from './components/Navbar.vue'
import deltePopup from '@/components/delete-popup.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter();
</script>

<template>
  <delte-popup></delte-popup>
  <Navbar v-if="router.currentRoute.value.name !== 'login'"></Navbar>
  <RouterView/>
</template>

<style scoped>
</style>
