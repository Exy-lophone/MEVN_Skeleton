<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import useFetchItems from '@/composables/useFetchItems'
import search from '@/search.js'

const { items, error, loading, fetchItems } = useFetchItems()
const itemlist = ref(null)

watch(items, () => {
    search.results.value = items.value.length
})

watch(search.selection, () => {
    search.ids.value = items.value
    .filter((x,i) => i >= search.selection.start && i <= search.selection.end)
})

watch(search.options, () => {
    fetchItems(
        search.options.sortBy,
        search.options.orderBy,
        search.options.roomFilter,
        search.options.closetFilter,
        search.options.research
    )
})

function keydownEventHandler(event) {
    if(event.key !== 'Escape') return
    search.clearSelection()
}

onMounted(() => {
    fetchItems(
        search.options.sortBy,
        search.options.orderBy,
        search.options.roomFilter,
        search.options.closetFilter,
        search.options.research
    )
    window.addEventListener('mouseup',search.stopSelection)
    window.addEventListener('keydown',keydownEventHandler)
})

onUnmounted(() => {
    window.removeEventListener('mouseup',search.stopSelection)
    window.removeEventListener('keydown',keydownEventHandler)
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
                selected: search.isIndexSelected(index), 
                'selected-top': index === search.selection.start, 
                'selected-bottom': index === search.selection.end 
            }" 
            @mousedown.left.prevent="search.initSelection(index)"
            @mouseenter="search.handleSelection(index)"
        >
            <p class="itemlist-description">{{ item.description }}</p>
            <p class="itemlist-quantity">{{ item.quantity }}</p>
            <p class="itemlist-category">{{ item.category }}</p>
            <p class="itemlist-room">{{ item.closet.room }}</p>
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