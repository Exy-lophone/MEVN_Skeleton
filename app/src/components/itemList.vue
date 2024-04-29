<script setup lang="ts">
import {
    loading,
    error,
    items, 
    selection, 
    initSelection, 
    isIndexSelected, 
    handleSelection, 
    stopSelection, 
    clearSelection, 
} from '../composables/useItems'
import { onMounted, onUnmounted } from 'vue'


function keydownEventHandler(event: KeyboardEvent) {
    if(event.key !== 'Escape') return
    clearSelection()
}

onMounted(() => {
    window.addEventListener('mouseup', stopSelection)
    window.addEventListener('keydown', keydownEventHandler)
})

onUnmounted(() => {
    window.removeEventListener('mouseup', stopSelection)
    window.removeEventListener('keydown', keydownEventHandler)
})
</script>

<template>
    <div class="itemlist outline-shadow" ref="itemlist">
        <div class="itemlist-header d-flex">
            <p class="itemlist-description font-size-body font-bold">Description</p>
            <p class="itemlist-quantity font-size-body font-bold">Quantité</p>
            <p class="itemlist-category font-size-body font-bold">Catégorie</p>
            <p class="itemlist-room font-size-body font-bold">Salle</p>
            <p class="itemlist-closet font-size-body font-bold">Armoire</p>
        </div>
        <div v-if="loading" class="itemlist-loading d-flex font-size-h5">Loading...</div>
        <div
            v-else 
            v-for="(item, index) in items" 
            :key="item.description"
            :class="{
                'itemlist-item': true,
                'd-flex': true,
                selected: isIndexSelected(index), 
                'selected-top': index === selection.start, 
                'selected-bottom': index === selection.end 
            }" 
            @mousedown.left.prevent="initSelection(index)"
            @mouseenter="handleSelection(index)"
        >
            <p class="itemlist-description">{{ item.description }}</p>
            <p class="itemlist-quantity">{{ item.quantity }}</p>
            <p class="itemlist-category">{{ item.category.name }}</p>
            <p class="itemlist-room">{{ item.closet.room.name }}</p>
            <p class="itemlist-closet">{{ item.closet.name }}</p>
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

    .itemlist-loading {
        padding: 1rem;
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