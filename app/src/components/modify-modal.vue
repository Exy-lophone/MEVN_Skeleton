<script setup lang="ts">
import modal from './modal.vue'
import modalMode from '../composables/modals'
import { selectedItems } from '../composables/search'
import textbox from './textbox.vue'
import dropdown from './dropdown.vue'
import type { DropdownProps, TextboxProps } from '@/propsTypes'
import { z } from 'zod'

const categories: DropdownProps = {
    items: [
        {display:'Description',value:'description'},
        {display:'Catégorie',value:'category'},
        {display:'Quantité',value:'quantity'},
        {display:'Salle',value:'room'},
        {display:'Armoire',value:'closet'}
    ],
    color: 'var(--color-text-darklight)'
}

const rooms: DropdownProps = {
    items: [
        {display:'B01',value:'B01'},
        {display:'A01',value:'A01'},
    ],
    color: 'var(--color-text-darklight)'
}

const closets: DropdownProps = {
    items: [
        {display:'INF-B01-ARM1',value:'INF-B01-ARM1'},
        {display:'INF-B01-ARM2',value:'INF-B01-ARM2'},
        {display:'INF-B01-ARM3',value:'INF-B01-ARM3'},
        {display:'INF-B01-ARM4',value:'INF-B01-ARM4'}
    ],
    color: 'var(--color-text-darklight)'
}
</script>

<template>
    <modal v-if="modalMode.modify" @background-clicked="modalMode.modify = false">
        <div class="modify-modal-header d-flex">
            <p class="font-size-h5 font-bold">Modifier</p>
        </div>
        <div class="modify-modal-items">
            <div v-for="(item, index) in selectedItems" class="modify-modal-item d-flex">
                <p class="font-bold">{{ index + 1 }}.</p>
                <textbox :value="item.description"></textbox>
                <textbox 
                    :value="z.coerce.string().parse(item.quantity)" 
                    :width="4"
                    :center="true"
                    :left-arrow="{show:true,direction:'left'}"
                    :right-arrow="{show:true,direction:'right'}"
                    @vmodel="x => item.quantity = z.coerce.number().parse(x)"
                    @left-arrow-clicked="item.quantity--"
                    @right-arrow-clicked="item.quantity++"
                    :key="item.quantity"
                ></textbox>
                <dropdown v-bind="categories"></dropdown>
                <dropdown v-bind="rooms"></dropdown>
                <dropdown v-bind="closets"></dropdown>
            </div>
        </div>
        <div class="modify-modal-footer d-flex">
            <button class="btn-lg btn-black" @click="modalMode.modify = false">Annuler</button>
            <button class="btn-lg btn-blue" @click="modalMode.modify = false">Valider</button>
        </div>
    </modal>
</template>

<style scoped>
    .modify-modal-header {
        background-color: var(--color-text);
        color: var(--color-background);
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        padding: 1rem 0;
    }
    .modify-modal-footer {
        border-top: 1px solid var(--color-border);
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        gap: 2rem;
        padding: 1rem 0;
    }
    .modify-modal-item {
        gap: 2rem;
        padding: 1rem 2rem;
    }
</style>