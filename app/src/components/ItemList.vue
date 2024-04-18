<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

    const items = ref([
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
        {description:'Câble Mini Display Port',quantity:1000,category:'Câble',room:'B01',closet:'INF-B01-ARM00',selected:false},
    ])
    const isLeftMousePressed = ref(false)
    function handleMousedown(event) {
        if(event.button === 0) isLeftMousePressed.value = true
    }
    function handleMouseup(event) {
        if(event.button === 0) isLeftMousePressed.value = false
    }
    onMounted(() => { 
        window.addEventListener('mousedown', handleMousedown)
        window.addEventListener('mouseup', handleMouseup)
    })
    onUnmounted(() => {
        window.removeEventListener('mousedown', handleMousedown)
        window.removeEventListener('mouseup', handleMouseup)
    })
</script>

<template>
    <div class="itemlist outline-shadow">
        <div class="itemlist-header d-flex">
            <p class="itemlist-description font-size-body font-bold">Description</p>
            <p class="itemlist-quantity font-size-body font-bold">Quantité</p>
            <p class="itemlist-category font-size-body font-bold">Catégorie</p>
            <p class="itemlist-room font-size-body font-bold">Salle</p>
            <p class="itemlist-closet font-size-body font-bold">Armoire</p>
        </div>
        <div 
            class="itemlist-item d-flex" 
            :class="{selected:item.selected}" 
            v-for="item in items" 
            :key="item.description"
            @mouseover="item.selected = isLeftMousePressed ? true : item.selected"
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

    .selected {
        background-color: var(--color-selected);
    }
</style>