<script setup>
import Textbox from '@/components/Textbox.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const username = ref('')
const password = ref('')

</script>

<template>
    <main class="d-flex">
        <form @submit.prevent class="outline-shadow d-flex">
            <h1 class="font-size-h2 font-bold">Connexion</h1>
            <div class="login-input d-flex">
                <label class="font-size-h6 font-bold">Nom d'utilisateur:</label>
                <Textbox placeholder="Nom d'utilisateur..." :width="30" @vmodel="x => username = x"></Textbox>
            </div>
            <div class="login-input d-flex">
                <label class="font-size-h6 font-bold">Mot de passse:</label>
                <Textbox type="password" placeholder="Mot de passe..." :width="30" @vmodel="x => password = x"></Textbox>
            </div>
            <button class="btn-blue btn-max" @click="router.push('/')">Se connecter</button>
        </form>
    </main>
</template>

<style scoped>
    main {
        width: 100vw;
        height: 100vh;
    }
    form {
        flex-direction: column;
        border-radius: 1rem;
        padding: 2rem 2rem;
        gap: 4rem;
    }
    .login-input {
        flex-direction: column;
        align-items: start;
        gap: 1rem;
    }
</style>