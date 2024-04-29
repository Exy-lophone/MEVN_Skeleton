<script setup lang="ts">
import { RouterView } from 'vue-router'
import navbar from './components/navbar.vue'
import { catgoryFetchObj } from '@/composables/useCategories'
import { closets, loading as cloLoading, fetchClosets } from '@/composables/useClosets'
import { rooms, loading as rooLoading,fetchRooms} from '@/composables/useRooms'
import deletePopup from '@/components/delete-popup.vue'
import modifyModal from '@/components/modify-modal.vue'
import { onMounted } from 'vue'

onMounted(() => {
  catgoryFetchObj.load()
  fetchClosets()
  fetchRooms()
})
</script>

<template>
    <div v-if="!(catgoryFetchObj.loading || cloLoading || rooLoading)">
        <delete-popup></delete-popup>
        <modify-modal></modify-modal>
    </div>
    <navbar></navbar>
    <p>{{ catgoryFetchObj.data }}</p>
    <RouterView></RouterView>
</template>