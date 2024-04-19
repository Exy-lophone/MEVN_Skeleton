<script setup>
import Toolbar from '@/components/Toolbar.vue'
import ItemList from '@/components/ItemList.vue'
import search from '@/search'
</script>

<template>
  <div class="main-content d-flex" @click.self="search.clearSelection()">
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

