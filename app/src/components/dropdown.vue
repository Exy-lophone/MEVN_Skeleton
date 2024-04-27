<script setup lang="ts">
import type { TextboxProps, DropdownProps } from '@/propsTypes'
import textbox from '@/components/textbox.vue'
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<DropdownProps>(), {
    prefix: () => ({show: false, text: ''}),
    center: false,
    color: 'var(--color-accent)'
})
const emit = defineEmits<{(e: 'selected', item?: string): void}>()
const selectable = ref(props.items.filter((x,i) => i !== 0))
const selected = ref(props.items[0])
const show = ref(false)
const txtbx: TextboxProps = {
    center: props.center,
    readonly: true,
    rightArrow: { show: true, direction: 'down' },
    color: props.color,
    prefix: props.prefix
}

function itemSelected(item: DropdownProps['items'][number], index: number) {
    selectable.value[index] = selected.value
    selected.value = item
    show.value = false
    emit('selected', item.value)
}

onMounted(() => {
    emit('selected', props.items[0].value)
})
</script>

<template>
    <div class="drop-position" @mouseleave="show = false">
        <textbox 
            v-bind="txtbx" 
            @right-arrow-clicked="show = true"
            :value="selected.display"
            :key="selected.display"
        ></textbox>
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