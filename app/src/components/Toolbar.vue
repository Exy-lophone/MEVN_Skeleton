<script setup>
import Textbox from './Textbox.vue'
import Dropdown from './Dropdown.vue'
import DownloadIco from '@/components/icons/DownloadIco.vue'
import TrashIco from '@/components/icons/TrashIco.vue'

import { search } from '@/search.js'

const txtbxSearch = {
    placeholder: 'Recherche...',
    width: 30
}
const sortby = {
    items: [
        {display:'Description',value:'description'},
        {display:'Catégorie',value:'category'},
        {display:'Quantité',value:'quantity'},
        {display:'Salle',value:'room'},
        {display:'Armoire',value:'closet'}
    ],
    prefixText: {show:true,text:'Trier par:'}
}
const orderby = {
    items: [
        {display:'Croissant',value:'ascending'},
        {display:'Decroissant',value:'descending'}
    ],
    prefixText: {show:true,text:'Ordre:'}
}
const roomFilter = {
    items: [
        {display:'Tout',value:'none'},
        {display:'B01',value:'B01'},
        {display:'A01',value:'A01'}
    ],
    prefixText: {show:true,text:'Salle:'}
}
const closetFilter = {
    items: [
        {display:'Tout',value:'none'},
        {display:'INF-B01-ARM01',value:'INF-B01-ARM01'},
        {display:'INF-B01-ARM02',value:'INF-B01-ARM02'},
        {display:'INF-B01-ARM03',value:'INF-B01-ARM03'},
        {display:'INF-B01-ARM04',value:'INF-B01-ARM04'}
    ],
    prefixText: {show:true,text:'Armoire:'}
}

</script>

<template>
    <div class="toolbar-content outline-shadow d-flex">
        <div class="sorting-elements d-flex">
            <Textbox v-bind="txtbxSearch"></Textbox>
            <Dropdown v-bind="sortby" @selected="x => search.sortBy = x"></Dropdown>
            <Dropdown v-bind="orderby" @selected="x => search.orderBy = x"></Dropdown>
            <Dropdown v-bind="roomFilter" @selected="x => search.roomFilter = x"></Dropdown>
            <Dropdown v-bind="closetFilter" @selected="x => search.closetFilter = x"></Dropdown>
        </div>
        <div class="sorting-interface d-flex">
            <button class="btn-blue btn-xl" @click="search.selectAll()">tout sélectionner</button>
            <div v-if="search.selectedIds.length > 0" class="sorting-interface-buttons d-flex">
                <button class="btn-blue btn">Modifier</button>
                <button class="btn-blue d-flex" style="width: 2.1875rem;"><DownloadIco></DownloadIco></button>
                <button class="btn-red d-flex" style="width: 2.1875rem;"><TrashIco></TrashIco></button>
            </div>
            <p class="font-size-body font-bold">{{ search.results }} résultat(s)</p>
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