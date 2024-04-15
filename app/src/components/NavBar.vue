<script setup>

</script>

<template>
    <nav class="outline-shadow">
        <div class="main-content d-flex">
            <h1 class="font-size-h1 font-bold">StockManagement</h1>
            <div class="links d-flex">
                <router-link to="/" class="font-size-body font-bold">Rechercher</router-link>
                <router-link to="/add" class="font-size-body font-bold">Ajouter</router-link>
                <button class="btn-sm btn btn-black">Logout</button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .main-content {
        max-width: 100vw;
        justify-content: space-between;
        padding: 2rem 4rem;
    }
    
    h1 {
        color: var(--color-accent);
    }

    .links {
        justify-content: space-between;
        gap: 2rem;
    }

    .router-link-active {
        color: var(--color-accent);
    }
</style>