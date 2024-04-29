import { reactive, ref, watch, type Ref } from "vue"
import { any, boolean, z, type TypeOf } from 'zod'
import { deepCopy } from "@/utils/CopyUtils"

const BASE_URL = 'http://localhost:3000/items/options'

export const ItemFetchParser = z.object({
    id: z.number(),
    description: z.string(),
    quantity: z.number(),
    category: z.object({
        id: z.number(),
        name: z.string()
    }),
    closet: z.object({
        id: z.number(),
        name: z.string(),
        room: z.object({
            id: z.number(),
            name: z.string()
        })
    })
})

export type Item = z.infer<typeof ItemFetchParser>

export type Options = {
    research?: string,
    sort: string,
    order: string,
    room?: string,
    closet?: string
}

export type Selection = {
    mode: boolean,
    init: number,
    start: number,
    end: number
}

export const items: Ref<Item[]> = ref([])

export const loading: Ref<boolean> = ref(true)

export const error: Ref<unknown> = ref(null)

export const selectedItems: Ref<Item[]> = ref([])

export const options: Options = reactive({
    research: '',
    sort: '',
    order: '',
    room: '',
    closet: ''
})

export const selection: Selection = reactive({
    mode: false,
    init: -1,
    start: -1,
    end: -1
})

export const fetchItems = async () => {
    loading.value = true
    try {
        const result = await window.fetch(BASE_URL, {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(options)
        })
        const data = await result.json()
        items.value = ItemFetchParser.array().parse(data)
    } catch (err) {
        error.value = err
        console.log(error.value)
    } finally {
        loading.value = false
    }
}

watch(options, () => {
    fetchItems()
})

function setSelectedItems() {
    selectedItems.value = deepCopy(items.value
        .filter((x,i) => i >= selection.start && i <= selection.end)
    )
}
export function initSelection (index: number) {
    selection.mode = true
    selection.init = index
    selection.start = index
    selection.end = index
    selectedItems.value = [deepCopy(items.value[index])]
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
    setSelectedItems()
}

export function isIndexSelected (index: number) {
    return index >= selection.start && index <=selection.end
}

export function selectAll () {
    selection.init = 0
    selection.start = 0
    selection.end = items.value.length - 1
    setSelectedItems()
}