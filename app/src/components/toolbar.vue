<script setup lang="ts">
import downloadIcon from './downloadIcon.vue'
import trashIcon from './trashIcon.vue'
import textbox, { type TextboxProps } from './textbox.vue'
import dropdown, { type DropdownProps } from './dropdown.vue'
import { selectedItems, options, selectAll, items } from '@/composables/useItems'
import modalMode from '../composables/modals'
import { rooms } from '@/composables/useRooms'
import { closets } from '@/composables/useClosets'

const search: TextboxProps = {
    placeholder: 'Rechercher...',
    width: 30
}

const sort: DropdownProps = {
    selected: {display:'Description',value:'description'},
    selectable: [
        {display:'Catégorie',value:'category'},
        {display:'Quantité',value:'quantity'},
        {display:'Salle',value:'room'},
        {display:'Armoire',value:'closet'}
    ],
    prefix: {show:true,text:'Trier par:'}
}

const order: DropdownProps = {
    selected: {display:'Croissant',value:'asc'},
    selectable: [
        {display:'Décroissant',value:'desc'},
    ],
    prefix: {show:true,text:'Ordre:'}
}

const room: DropdownProps = {
    selected: {display:'Tout'},
    selectable: [
        {display:'Tout'},
        ...rooms.value.map(x => ({display:x.name,value:x.name}))
    ],
    prefix: {show:true,text:'Salle:'}
}

const closet: DropdownProps = {
    selected: {display:'Tout'},
    selectable: [
        ...closets.value.map(x => ({display:x.name,value:x.name}))
    ],
    prefix: {show:true,text:'Armoire:'}
}
</script>

<template>
    <div class="toolbar-content outline-shadow d-flex">
        <div class="sorting-elements d-flex">
            <textbox v-bind="search" @vmodel="x => options.research = x"></textbox>
            <dropdown v-bind="sort" @selected="x => options.sort = x || 'description'"></dropdown>
            <dropdown v-bind="order" @selected="x => options.order = x || 'asc'"></dropdown>
            <dropdown v-bind="room" @selected="x => options.room = x"></dropdown>
            <dropdown v-bind="closet" @selected="x => options.closet = x"></dropdown>
        </div>
        <div class="sorting-interface d-flex">
            <button class="btn-blue btn-xl" @click="selectAll">tout sélectionner</button>
            <div v-if="selectedItems.length > 0" class="sorting-interface-buttons d-flex">
                <button class="btn-blue btn" @click="modalMode.modify=true">Modifier</button>
                <button class="btn-blue d-flex" style="width: 2.1875rem;"><downloadIcon></downloadIcon></button>
                <button class="btn-red d-flex" style="width: 2.1875rem;" @click="modalMode.delete=true"><trashIcon></trashIcon></button>
            </div>
            <p class="font-size-body font-bold">{{ items.length }} résultats(s)</p>
        </div>
    </div>
</template>

<style scoped>
    .toolbar-content {
        border-radius: 1rem;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem 2rem;
    }
    .sorting-elements {
        gap: 2rem;
    }
    .sorting-interface {
        width: 100%;
        justify-content: space-between;
    }
    .sorting-interface-buttons {
        gap: 1.5rem;
    }
</style>@/composables/useSearch