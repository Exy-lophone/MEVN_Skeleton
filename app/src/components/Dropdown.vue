<script setup>
import Textbox from './Textbox.vue';
import { ref } from 'vue';

const props = defineProps(['items','prefixText','textColor'])
const selectable = ref(props.items.filter((x,i) => i !== 0))
const selected = ref(props.items[0])
const show = ref(false)
const emit = defineEmits(['selected'])

const txtbx = {
    readonly: true,
    rightArrow: {show:true,direction:'down'}
}

if(!props.prefixText) txtbx.prefixText = {show:false,text:''}
else txtbx.prefixText = props.prefixText
if(!props.textColor) txtbx.textColor = 'var(--color-accent)'
else txtbx.textColor = props.textColor

function itemSelected(item, index) {
    selectable.value[index] = selected.value
    selected.value = item
    console.log(selectable.value)
    show.value = false
    emit('selected',item.value)
}
</script>

<template>
    <div class="drop-position" @mouseleave="show = false">
        <Textbox 
            v-bind="txtbx" 
            @right-arrow-clicked="show = true"
            :value="selected.display"
            :key="selected"
        ></Textbox>
        <div v-if="show" class="dropdown outline-shadow d-flex">
            <p 
                v-for="(item, index) in selectable" 
                :key="item.value" @click="itemSelected(item, index)"
            >{{ item.display }}</p>
        </div>
    </div>
</template>

<style scoped>
    .drop-position {
        position: relative;
    }
    .dropdown {
        position: absolute;
        top: 100%;
        z-index: 2;
        background-color: var(--color-background);
        box-sizing: border-box;
        width: 100%;
        flex-direction: column;
        align-items: start;
        border-radius: 0.5rem;
    }
    .dropdown p {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem 1rem;
        color: var(--color-accent);
    }
    .dropdown p:first-child {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }
    .dropdown p:last-child {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
    .dropdown p:hover {
        color: var(--color-background);
        background-color: var(--color-accent);
    }
</style>