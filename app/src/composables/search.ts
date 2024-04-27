import type { Ref } from 'vue'
import { ref, reactive, readonly } from 'vue'
import type { Item } from '../composables/useFetchItems'

type Options = {
    research?: string,
    sort: string,
    order: string,
    room?: string,
    closet?: string
}

type Selection = {
    mode: boolean,
    init: number,
    start: number,
    end: number
}

export const options: Options = reactive({
    research: '',
    sort: '',
    order: '',
    room: '',
    closet: '',
})

export const selection: Selection = reactive({
    mode: false,
    init: -1,
    start: -1,
    end: -1
})

export const results: Ref<number> = ref(0)
export const selectedItems: Ref<Item[]> = ref([])

export function initSelection (index: number) {
    selection.mode = true
    selection.init = index
    selection.start = index
    selection.end = index
}

export function stopSelection () {
    selection.mode = false
}

export function clearSelection () {
    selection.mode = false
    selection.init = -1
    selection.start = -1
    selection.end = -1
    selectedItems.value = []
}

export function handleSelection (index: number) {
    if(!selection.mode) return
    if(index >= selection.init) {
        selection.start = selection.init
        selection.end = index
    } else {
        selection.end = selection.init
        selection.start = index
    }
}

export function isIndexSelected (index: number) {
    return index >= selection.start && index <=selection.end
}

export function selectAll () {
    selection.init = 0
    selection.start = 0
    selection.end = results.value - 1
}

export type {
    Options,
    Selection
}