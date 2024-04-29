<script setup lang="ts">
import modal from '@/components/modal.vue'
import trash from '@/components/trashIcon.vue'
import modalMode from '@/composables/modals.js'
import { selectedItems, clearSelection } from '@/composables/useItems';
import { fetchItems } from '@/composables/useItems';
import type { FetchRequest } from '@/composables/useFetch';

function deleteItems () {
    const results = Promise.allSettled(selectedItems.value.map(x => fetch('http://localhost:3000/items/'+x.id,{method:'DELETE'})))
    console.log(results)
    fetchItems()
    clearSelection()
    modalMode.delete=false
}
</script>

<template>
    <modal v-if="modalMode.delete" @background-clicked="modalMode.delete=false">
        <div class="delete-modal d-flex">
            <trash :width="63" :height="81" color="var(--color-error)"></trash>
            <p>Êtes-vous sûr(e) de vouloir<br>supprimer ces éléments</p>
            <div class="delete-modal-buttons d-flex">
                <button class="btn-lg btn-black" @click="modalMode.delete = false">Annuler</button>
                <button class="btn-lg btn-red" @click="deleteItems()">Supprimer</button>
            </div>
        </div>
    </modal>
</template>

<style scoped>
    .delete-modal {
        flex-direction: column;
        padding: 2rem 1.5rem;
        gap: 2rem;
    }
    p {
        text-align: center;
    }
    .delete-modal-buttons {
        gap: 1rem
    }
</style>