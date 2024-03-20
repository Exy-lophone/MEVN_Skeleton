<template>
    <div class="navbar">
        <div class="main-content">
            <div class="navbar-content">
                <h1>Logo</h1>
                <div class="navbar-links">
                    <router-link to="#">Link 1</router-link>
                    <router-link to="#">Link 2</router-link>
                    <router-link to="#">Link 3</router-link>
                    <button v-if="!isConnected" class="btn" @click="router.push('login')">Login</button>
                    <button v-else class="btn" @click="logout()">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const isConnected = computed(() => window.sessionStorage.getItem('token'))
const logout = () => {
    window.sessionStorage.removeItem('token')
}
</script>

<style>
.navbar {
    box-shadow: 0 1rem 1rem lightgray;
    margin-bottom: 4rem;
}
.navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 4rem;
    padding: 2rem 0;
}
.navbar-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}
.navbar a {
    color: black;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
}
.navbar a:hover {
    color: crimson;
}
</style>