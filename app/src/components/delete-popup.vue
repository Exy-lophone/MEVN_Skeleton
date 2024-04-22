<script setup>
import modal from '@/components/modal.vue'
import trash from '@/components/icons/TrashIco.vue'
import showDelete from '@/delete.js'
</script>

<template>
    <modal v-if="showDelete" @background-clicked="showDelete=false">
        <div class="delete-modal d-flex">
            <trash :width="63" :height="81" color="var(--color-error)"></trash>
            <p>Êtes-vous sûr(e) de vouloir<br>supprimer ces éléments</p>
            <div class="delete-modal-buttons d-flex">
                <button class="btn-lg btn-black" @click="showDelete = false">Annuler</button>
                <button class="btn-lg btn-red" @click="showDelete = false">Supprimer</button>
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