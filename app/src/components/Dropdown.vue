<script setup>
    import { onMounted, ref } from 'vue';

    const props = defineProps(['show'])
    const element = ref(null)
    onMounted(() => {
        console.log(element.clientHeight)
    })
</script>

<template>
    <div class="drop-position">
        <slot name="element"></slot>
        <div v-if="show" class="dropdown outline-shadow d-flex">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .drop-position {
        position: relative;
    }
    .dropdown {
        position: absolute;
        z-index: 2;
        background-color: var(--color-background);
        top: 100%;
        box-sizing: border-box;
        width: 100%;
        flex-direction: column;
        border-radius: 0.5rem;
        gap: 1rem;
        padding: 1rem 0.5rem;
        color: var(--color-accent);
    }
</style>