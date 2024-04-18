<script setup>
import Toolbar from '@/components/Toolbar.vue'
import ItemList from '@/components/ItemList.vue'

</script>

<template>
  <div class="main-content d-flex">
    <Toolbar></Toolbar>
    <ItemList></ItemList>
  </div>
</template>

<style scoped>
  .main-content {
    flex-direction: column;
    gap: 4rem;
    padding: 4rem 0;
  }
</style>

