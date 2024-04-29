<script setup lang="ts">
import modal from './modal.vue'
import modalMode from '../composables/modals'
import { selectedItems, type Item } from '../composables/useItems'
import textbox, { type TextboxProps } from './textbox.vue'
import dropdown, { type DropdownProps } from './dropdown.vue'
import { categoryFetchObj } from '@/composables/useCategories'
import { closetFetchObj } from '@/composables/useClosets'
import { roomFetchObj } from '@/composables/useRooms'
import { z } from 'zod'

const dropDownColor = 'var(--color-text-darklight)';

function inputNbr (input: string, item: Item) {
    const result = z.coerce.number().safeParse(input)
    if(result.success) item.quantity = result.data
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
                    @vmodel="x => inputNbr(x, item)"
                    @left-arrow-clicked="item.quantity--"
                    @right-arrow-clicked="item.quantity++"
                    :key="item.quantity"
                ></textbox>
                <dropdown
                    :selected="{display:item.category.name,value:item.category.name}"
                    :selectable="categoryFetchObj.data.value.map(x => ({display:x.name,value:x.name})).filter(x => x.display !== item.category.name)"
                    :color="dropDownColor"
                ></dropdown>
                <dropdown
                    :selected="{display:item.closet.name,value:item.closet.name}"
                    :selectable="closetFetchObj.data.value.map(x => ({display:x.name,value:x.name})).filter(x => x.display !== item.closet.name)"
                    :color="dropDownColor"
                ></dropdown>
                <dropdown
                    :selected="{display:item.closet.room.name,value:item.closet.room.name}"
                    :selectable="roomFetchObj.data.value.map(x => ({display:x.name,value:x.name})).filter(x => x.display !== item.closet.room.name)"
                    :color="dropDownColor"
                ></dropdown>
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