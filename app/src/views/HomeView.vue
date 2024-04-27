<script setup lang="ts">
import toolbar from '@/components/toolbar.vue'
import itemList from '@/components/itemList.vue'
import { selection, options, clearSelection } from '@/composables/search'

</script>

<template>
  <div class="home-content d-flex" @click.self="clearSelection">
    <toolbar></toolbar>
    <item-list></item-list>
  </div>
</template>

<style scoped>
  .home-content {
    flex-direction: column;
    padding: 4rem 0;
    gap: 4rem;
  }
</style>