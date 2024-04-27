<script setup lang="ts">
import type { ArrowProps, TextboxProps } from '@/propsTypes'
import arrow from '@/components/arrow.vue'
import { ref, watch } from 'vue'

type Emits = {
    (e: 'vmodel', input: string): void
    (e: 'left-arrow-clicked'): void
    (e: 'right-arrow-clicked'): void
    (e: 'submit', input: string): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<TextboxProps>(),{
    value: '',
    type: 'text',
    center: false,
    readonly: false,
    placeholder: '',
    color: 'var(--color-text)',
    leftArrow: () => ({ show: false, direction: 'down' }),
    rightArrow: () => ({ show: false, direction: 'down' }),
    prefix: () => ({ show: false, text: '' }),
    width: 10
})

const input = ref(props.value)

watch(input,() => {
    emit('vmodel',input.value)
})
</script>

<template>
    <div class="textbox inner-shadow d-flex">
        <arrow v-if="leftArrow.show" :direction="leftArrow.direction" @click="emit('left-arrow-clicked')"></arrow>
        <p v-if="prefix.show">{{ prefix.text }}</p>
        <p :style="{color}" v-if="readonly">{{ input }}</p>
        <input v-else 
            class="font-size-body textbox-value" 
            :class="{'textbox-center-txt': center}" 
            :style="{color, width: width+'ch'}" 
            :placeholder="placeholder" 
            :type="type" 
            v-model="input"
            @keyup.enter="emit('submit',input)"
        >
        <arrow v-if="rightArrow.show" :direction="rightArrow.direction" @click="emit('right-arrow-clicked')"></arrow>
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
    .textbox-center-txt{
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