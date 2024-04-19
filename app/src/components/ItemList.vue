<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { search } from '@/search.js'

const items = ref(Array(20).fill(1).map((x, i) => 
    ({id:i,description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00'})
))

search.results = items.value.length;

const itemlist = ref(null)

function initSelection(index) {
    search.selection.mode = true
    search.selection.init = index
    search.selection.start = index
    search.selection.end = index
    setSelectedIds()
}

function stopSelection(event) {
    if(event.button !== 0) return
    search.selection.mode = false
}

function handleSelection(index) {
    if(!search.selection.mode) return
    if(index >= search.selection.init) {
        search.selection.start = search.selection.init
        search.selection.end = index
    } else {
        search.selection.end = search.selection.init
        search.selection.start = index
    }
    setSelectedIds()
}

function setSelectedIds() {
    search.selectedIds = items.value.filter((x,i) => i >= search.selection.start && i <= search.selection.end).map(x => x.id)
}

onMounted(() => window.addEventListener('mouseup',stopSelection))
onUnmounted(() => window.removeEventListener('mouseup',stopSelection))
</script>

<template>
    <p>{{ search }}</p>
    <div class="itemlist outline-shadow" ref="itemlist">
        <div class="itemlist-header d-flex">
            <p class="itemlist-description font-size-body font-bold">Description</p>
            <p class="itemlist-quantity font-size-body font-bold">Quantité</p>
            <p class="itemlist-category font-size-body font-bold">Catégorie</p>
            <p class="itemlist-room font-size-body font-bold">Salle</p>
            <p class="itemlist-closet font-size-body font-bold">Armoire</p>
        </div>
        <div 
            v-for="(item, index) in items" 
            :key="item.description"
            :class="{
                'itemlist-item': true,
                'd-flex': true,
                selected: index >= search.selection.start && index <= search.selection.end, 
                'selected-top': index === search.selection.start, 
                'selected-bottom': index === search.selection.end 
            }" 
            @mousedown.left.prevent="initSelection(index)"
            @mouseenter="handleSelection(index)"
        >
            <p class="itemlist-description">{{ item.description }}</p>
            <p class="itemlist-quantity">{{ item.quantity }}</p>
            <p class="itemlist-category">{{ item.category }}</p>
            <p class="itemlist-room">{{ item.room }}</p>
            <p class="itemlist-closet">{{ item.closet }}</p>
        </div>
    </div>
</template>

<style scoped>
    .itemlist {
        border-radius: 1rem;
    }

    .itemlist p {
        text-align: center;
    }

    .itemlist-header {
        background-color: var(--color-text);
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        color: var(--color-background);
        padding: 1rem;
        gap: 1rem;
        position: sticky;
        top: 0;
    }

    .itemlist-item {
        padding: 1rem;
        gap: 1rem;
        color: var(--color-text-darklight);
    }
    .itemlist-item:last-child {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    .itemlist-description {
        width: 13rem;
    }
    .itemlist-quantity {
        width: 5rem;
    }
    .itemlist-category {
        width: 10rem;
    }
    .itemlist-room {
        width: 3rem;
    }
    .itemlist-closet {
        width: 9rem;
    }

    .selected-top {
        border-top: 2px dashed var(--color-accent);
    }
    .selected {
        background-color: var(--color-selected);
        border-left: 2px dashed var(--color-accent);
        border-right: 2px dashed var(--color-accent);
    }
    .selected-bottom {
        border-bottom: 2px dashed var(--color-accent);
    }
</style>