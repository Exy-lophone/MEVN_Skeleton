<script setup lang="ts">
import { RouterView } from 'vue-router'
import navbar from './components/navbar.vue'
import deletePopup from './components/delete-popup.vue'
import modifyModal from './components/modify-modal.vue'
</script>

<template>
    <modify-modal></modify-modal>
    <delete-popup></delete-popup>
    <navbar></navbar>
    <RouterView></RouterView>
</template>