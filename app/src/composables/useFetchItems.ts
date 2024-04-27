import { ref, type Ref } from 'vue'
import { options } from './search'
import { z } from 'zod'


const ItemFetchParser = z.object({
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

export default function useFetchItems () {
    const url = "http://localhost:3000/items/options"
    const items: Ref<Item[]> = ref([])
    const loading: Ref<boolean> = ref(true)
    const error: Ref<unknown> = ref(null)

    async function fetchItems() {
        loading.value = false
        try {
            const result = await window.fetch(url,{
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

    return { items, error, loading, fetchItems }
}