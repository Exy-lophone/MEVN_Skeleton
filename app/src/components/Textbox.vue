<script setup>
import { ref } from 'vue';
import Arrow from '@/components/Arrow.vue'

const props = defineProps(['value','centerTxt','placeholder','textColor','leftArrow', 'rightArrow', 'prefixText', 'width'])
const input = ref(props.value)
</script>

<template>
    <div class="textbox inner-shadow d-flex">
        <Arrow v-if="leftArrow.show" :direction="leftArrow.direction" @click="$emit('leftArrowClicked',true)"></Arrow>
        <p v-if="prefixText.show">{{ prefixText.text }}</p>
        <input class="font-size-body" :class="{centerTxt: centerTxt}" :style="{color: textColor, width: width+'ch'}" :placeholder="placeholder" type="text" v-model="input">
        <Arrow v-if="rightArrow.show" :direction="rightArrow.direction" @click="$emit('rightArrowClicked',false)"></Arrow>
    </div>
</template>

<style scoped>
    .textbox {
        background-color: var(--color-background-light);
        padding: 0.5em 1em;
        border-radius: 0.5em;
        gap: 1em;
        color: var(--color-text-darklight);
    }
    .centerTxt {
        text-align: center;
    }
    input {
        width: fit-content;
        background-color: var(--color-background-light);
    }
    input:focus {
        outline: none;
    }
</style>