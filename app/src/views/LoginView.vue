<template>
    <div class="login-page">
        <div class="main-content">
            <p v-if="showError" class="error-txt">*Wrong credentials !</p> 
            <form class="login-form">
                <h1>{{ getTitleTxt }}</h1>
                <div class="login-section">
                    <label>Username:</label>
                    <input type="email" required v-model="username">
                </div>
                <div class="login-section">
                    <label>Password:</label>
                    <input type="password" required v-model="password">
                </div>
                <div class="login-section">
                    <button class="btn" @click="isLoginActive ? connect() : register()">{{ getBtnTxt }}</button>
                    <p>
                        <span @click="isLoginActive = true" :class="{'login-active': isLoginActive}">Login</span> 
                        | 
                        <span @click="isLoginActive = false" :class="{'login-active': !isLoginActive}">Register</span>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useFetch } from '@/composables/useFetch';
import { useRouter } from 'vue-router';

const username = defineModel('username')
const password = defineModel('password')
const isLoginActive = ref(true)
const getBtnTxt = computed(() => isLoginActive.value ? 'Connect' : 'Register')
const getTitleTxt = computed(() => isLoginActive.value ? 'Login' : 'Register')
const showError = ref(false)
const router = useRouter();

const connect = () => {
    const { data, error, loading } = useFetch('http://localhost:3000/auth/login','POST',{username: username.value, password: password.value})
    watch(loading, () => {
        if(!loading.value) {
            if(error.value) { showError.value = true; return; }
            window.sessionStorage.setItem('token', data.value.token)
            router.push('home')
        }
    })
}

const register = () => {
    const { data, error, loading } = useFetch('http://localhost:3000/auth/register','POST',{username: username.value, password: password.value})
    watch(loading, () => {
        if(!loading.value) {
            if(error.value) { showError.value = true; return; }
            window.sessionStorage.setItem('token', data.value.token)
            router.push('home')
        }
    })
}
</script>

<style>
.login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
}
.login-form {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 16rem;
    margin: auto;
}
.login-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
.login-section p {
    align-self: center;
}
.login-form label{
    font-weight: bold;
}
.login-form input{
    border: none;
    border-bottom: 1px solid rgb(194, 194, 194);
    font-size: 1.2rem;
    color: rgb(82, 82, 82);
}
.login-active {
    color: crimson;
}
.error-txt {
    color: #f9061a;
}
</style>