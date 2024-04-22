<script setup>
import { ref, watch } from 'vue';
import Arrow from '@/components/Arrow.vue'

const emit = defineEmits(['vmodel','leftArrowClicked','rightArrowClicked'])
const props = defineProps([
    'value',
    'type',
    'centerTxt',
    'readonly',
    'placeholder',
    'textColor',
    'leftArrow',
    'rightArrow',
    'prefixText',
    'width'
])
const value = ref(props.value)
const type = ref(props.type)
const centerTxt = ref(props.centerTxt)
const readonly = ref(props.readonly)
const placeholder = ref(props.placeholder)
const textColor = ref(props.textColor)
const leftArrow = ref(props.leftArrow)
const rightArrow = ref(props.rightArrow)
const prefixText = ref(props.prefixText)
const width = ref(props.width)

//Set default values
if(!value.value) value.value = ''
if(!type.value) type.value = 'text'
// if(!centerTxt.value) centerTxt.value = false
// if(!readonly.value) readonly.value = false
if(!placeholder.value) placeholder.value = ''
if(!textColor.value) textColor.value = 'var(--color-text)'
if(!leftArrow.value) leftArrow.value = {show:false,direction:'down'}
if(!rightArrow.value) rightArrow.value = {show:false,direction:'down'}
if(!prefixText.value) prefixText.value = {show:false,text:''}
if(!width.value) width.value = 10
const input = ref(props.value)
watch(input,() => {
    emit('vmodel',input.value)
})
</script>

<template>
    <div class="textbox inner-shadow d-flex">
        <Arrow v-if="leftArrow.show" :direction="leftArrow.direction" @click="emit('leftArrowClicked',true)"></Arrow>
        <p v-if="prefixText.show">{{ prefixText.text }}</p>
        <p :style="{color: textColor}" v-if="readonly">{{ input }}</p>
        <input v-else 
            class="font-size-body textbox-value" 
            :class="{centerTxt: centerTxt}" 
            :style="{color: textColor, width: width+'ch'}" 
            :placeholder="placeholder" 
            :type="type" 
            v-model="input"
            @keyup.enter="$emit('submit',input)"
        >
        <Arrow v-if="rightArrow.show" :direction="rightArrow.direction" @click="emit('rightArrowClicked',false)"></Arrow>
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