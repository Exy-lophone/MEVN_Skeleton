<script setup>
import Textbox from './Textbox.vue'
import Dropdown from './Dropdown.vue'
import { ref } from 'vue'

const showCategoryDrop = ref(false)
const showOrderDrop = ref(false)
const showRoomDrop = ref(false)
const showClosetDrop = ref(false)

const categoryItems = ref(['Description','Quantité','Salle','Armoire'])
const orderItems = ref(['Croissant','Decroissant'])
const roomItems = ref(['B01','A01'])
const closetItems = ref(['INF-B01-ARM01','INF-B01-ARM02','INF-B01-ARM03','INF-B01-ARM04',])

const txtbxSearch = ref({
    value: '',
    centerTxt: false,
    placeholder: 'Recherche...', 
    textColor: 'var(--color-text)', 
    leftArrow: {show:false,direction:'up'}, 
    rightArrow: {show:false,direction:'down'}, 
    prefixText: {show:false,text:'Trier par:'},
    width: 30
})
const txtbxCategory = {
    value: 'Catégorie',
    centerTxt: true,
    placeholder: '', 
    textColor: 'var(--color-accent)', 
    leftArrow: {show:false,direction:'up'}, 
    rightArrow: {show:true,direction:'down'}, 
    prefixText: {show:true,text:'Trier par:'},
    width: 8
}
const txtbxOrder = {
    value: 'Croissant',
    centerTxt: true,
    placeholder: '', 
    textColor: 'var(--color-accent)', 
    leftArrow: {show:false,direction:'up'}, 
    rightArrow: {show:true,direction:'down'}, 
    prefixText: {show:true,text:'Ordre:'},
    width: 8
}
const txtbxRoom = {
    value: 'B01',
    centerTxt: true,
    placeholder: '', 
    textColor: 'var(--color-accent)', 
    leftArrow: {show:false,direction:'up'}, 
    rightArrow: {show:true,direction:'down'}, 
    prefixText: {show:true,text:'Salle:'},
    width: 3
}
const txtbxCloset = ref({
    value: 'INF-B01-ARM01',
    centerTxt: true,
    placeholder: '', 
    textColor: 'var(--color-accent)', 
    leftArrow: {show:false,direction:'up'}, 
    rightArrow: {show:true,direction:'down'}, 
    prefixText: {show:true,text:'Armoire:'},
    width: 13
})

function categorySelected (item) {
    categoryItems.value = categoryItems.value.filter(x => x !== item)
    categoryItems.value.push(txtbxCategory.value)
    txtbxCategory.value = item
}
</script>

<template>
    <div class="toolbar-content outline-shadow d-flex">
        <div class="sorting-elements d-flex">
            <Textbox v-bind="txtbxSearch"></Textbox>
            <Dropdown :items="categoryItems" :show="showCategoryDrop" @mouseleave="showCategoryDrop = false" @selected="categorySelected">
                <Textbox v-bind="txtbxCategory" @right-arrow-clicked="showCategoryDrop = true" :key="txtbxCategory.value"></Textbox>
            </Dropdown>
            <Dropdown :items="orderItems" :show="showOrderDrop" @mouseleave="showOrderDrop = false">
                <Textbox v-bind="txtbxOrder" @right-arrow-clicked="showOrderDrop = true"></Textbox>
            </Dropdown>
            <Dropdown :items="roomItems" :show="showRoomDrop" @mouseleave="showRoomDrop = false">
                <Textbox v-bind="txtbxRoom" @right-arrow-clicked="showRoomDrop = true"></Textbox>
            </Dropdown>
            <Dropdown :items="closetItems" :show="showClosetDrop" @mouseleave="showClosetDrop = false">
                <Textbox v-bind="txtbxCloset" @right-arrow-clicked="showClosetDrop = true"></Textbox>
            </Dropdown>
        </div>
        <div class="sorting-interface d-flex">
            <button class="btn-blue btn-xl">tout sélectionner</button>
            <p class="font-size-body font-bold">0 résultat(s)</p>
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
</style>