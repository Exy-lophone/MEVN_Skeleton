<script setup>
</script>

<template>
    <div class="dropdown outline-shadow d-flex">
        <slot></slot>
    </div>
</template>

<style scoped>
    .dropdown {
        position: absolute;
        top: 160px;
        flex-direction: column;
        align-items: start;
        border-radius: 0.5rem;
        gap: 1rem;
        padding: 1rem 0.5rem;
        color: var(--color-accent);
    }
</style>