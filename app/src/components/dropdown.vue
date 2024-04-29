<script setup lang="ts">
import textbox, { type TextboxProps } from '@/components/textbox.vue'
import { onMounted, ref, type Ref } from 'vue'
import { deepCopy } from '@/utils/CopyUtils'

export type DropDownItem = {
    display: string,
    value?: string
}

export type DropdownProps = {
    selected: DropDownItem,
    selectable: DropDownItem[],
    center?: boolean,
    prefix?: TextboxProps['prefix'],
    color?: string,
}

export type DropdownEmits = {
    (e: 'selected', item?: string): void
}

const props = withDefaults(defineProps<DropdownProps>(), {
    prefix: () => ({show: false, text: ''}),
    center: false,
    color: 'var(--color-accent)'
})

const emit = defineEmits<DropdownEmits>()
const selectable: Ref<DropDownItem[]> = ref(deepCopy(props.selectable))
const selected: Ref<DropDownItem> = ref(deepCopy(props.selected))

const show = ref(false)
const txtbx: TextboxProps = {
    center: props.center,
    readonly: true,
    rightArrow: { show: true, direction: 'down' },
    color: props.color,
    prefix: props.prefix
}

function itemSelected(item: DropDownItem, index: number) {
    selectable.value[index] = selected.value
    selected.value = item
    show.value = false
    emit('selected', item.value)
}

onMounted(() => {
    emit('selected', selected.value.value)
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