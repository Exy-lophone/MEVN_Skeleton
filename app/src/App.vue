<template>
  <NavBar v-if="router.currentRoute.value.name !== 'login'"/>
  <router-view/>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style>
html,body,h1,h2,h3,h4,h5,h6 {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Inter;
}
.main-content {
  max-width: 120rem;
  margin: auto;
}
.btn {
    align-self: center;
    background-color: black;
    outline: 2px solid black;
    border: none;
    padding: 0.5em 2em;
    border-radius: 0.5em;
    font-family: Inter;
    font-weight: bold;
    font-size: 1rem;
    transition: 0.2s;
    color: white;
}
.btn:hover {
    background-color: white;
    outline: 2px solid black;
    color: black;
}
.btn-reverse {
  color: black;
  background-color: white;
  outline: 2px solid black;
}
.btn-reverse:hover {
  color: white;
  background-color: black;
}
</style>
