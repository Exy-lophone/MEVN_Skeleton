<script setup>
    import { onMounted, ref } from 'vue';

    const props = defineProps(['show', 'items'])
</script>

<template>
    <div class="drop-position">
        <slot></slot>
        <div v-if="show" class="dropdown outline-shadow d-flex">
            <p v-for="item in items" :key="item" @click="$emit('selected',item)">{{ item }}</p>
        </div>
    </div>
</template>

<style scoped>
    .drop-position {
        position: relative;
    }
    .dropdown {
        position: absolute;
        top: 100%;
        z-index: 2;
        background-color: var(--color-background);
        box-sizing: border-box;
        width: 100%;
        flex-direction: column;
        align-items: start;
        border-radius: 0.5rem;
    }
    .dropdown p {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem 1rem;
        color: var(--color-accent);
    }
    .dropdown p:first-child {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }
    .dropdown p:last-child {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
    .dropdown p:hover {
        color: var(--color-background);
        background-color: var(--color-accent);
    }
</style>