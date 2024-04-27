<script setup lang="ts">
import downloadIcon from './downloadIcon.vue'
import trashIcon from './trashIcon.vue'
import textbox from './textbox.vue'
import dropdown from './dropdown.vue'
import { selectedItems, options, results, selectAll } from '@/composables/search'
import type { DropdownProps, TextboxProps } from '@/propsTypes'
import modalMode from '../composables/modals'

const search: TextboxProps = {
    placeholder: 'Rechercher...',
    width: 30
}

const sort: DropdownProps = {
    items: [
        {display:'Description',value:'description'},
        {display:'Catégorie',value:'category'},
        {display:'Quantité',value:'quantity'},
        {display:'Salle',value:'room'},
        {display:'Armoire',value:'closet'}
    ],
    prefix: {show:true,text:'Trier par:'}
}

const order: DropdownProps = {
    items: [
        {display:'Croissant',value:'asc'},
        {display:'Décroissant',value:'desc'},
    ],
    prefix: {show:true,text:'Ordre:'}
}

const room: DropdownProps = {
    items: [
        {display:'Tout'},
        {display:'B01',value:'B01'},
        {display:'A01',value:'A01'},
    ],
    prefix: {show:true,text:'Salle:'}
}

const closet: DropdownProps = {
    items: [
        {display:'Tout'},
        {display:'INF-B01-ARM1',value:'INF-B01-ARM1'},
        {display:'INF-B01-ARM2',value:'INF-B01-ARM2'},
        {display:'INF-B01-ARM3',value:'INF-B01-ARM3'},
        {display:'INF-B01-ARM4',value:'INF-B01-ARM4'}
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
            <p class="font-size-body font-bold">{{ results }} résultats(s)</p>
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
</style>