import { ref } from "vue"

const baseUrl = "http://localhost:3000/items"
const limit = 50

export default function useFetchItems () {
    const items = ref(null)
    const loading = ref(true)
    const error = ref(null)

    async function fetchItems(sortBy,orderBy,roomFilter,closetFilter,research) {
        loading.value = false
        try {
            const url = `${baseUrl}/${limit}-${sortBy}-${orderBy}-${roomFilter}-${closetFilter}-${research}`
            const result = await fetch(url)
            items.value = await result.json()
        } catch (err) {
            error.value = err
            console.log(err)
        } finally {
            loading.value = false
        }
    }

    return { items, error, loading, fetchItems }
}