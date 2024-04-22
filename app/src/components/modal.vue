<template>
    <div class="modal-background d-flex" @click.self="$emit('background-clicked')">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .modal-background {
        background-color: rgba(0,0,0,0.4);
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 3;
        backdrop-filter: blur(2px);
    }
    .modal {
        background-color: var(--color-background);
        border-radius: 1rem;
    }
</style>