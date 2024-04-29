<script setup lang="ts">
import { RouterView } from 'vue-router'
import navbar from './components/navbar.vue'
import { categoryFetchObj } from '@/composables/useCategories'
import { closetFetchObj, type Closet } from '@/composables/useClosets'
import { roomFetchObj } from '@/composables/useRooms'
import deletePopup from '@/components/delete-popup.vue'
import modifyModal from '@/components/modify-modal.vue'
import { onMounted } from 'vue'
import { fetchItems } from './composables/useItems'

onMounted(() => {
  fetchItems()
  categoryFetchObj.load()
  closetFetchObj.load()
  roomFetchObj.load()
})
</script>

<template>
    <div v-if="!(categoryFetchObj.loading.value || closetFetchObj.loading.value || roomFetchObj.loading.value)">
        <modify-modal></modify-modal>
        <delete-popup></delete-popup>
    </div>
    <navbar></navbar>
    <RouterView></RouterView>
</template>