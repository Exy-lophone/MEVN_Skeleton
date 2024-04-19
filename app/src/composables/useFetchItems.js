import { ref } from "vue"

const baseUrl = "http://localhost:3000/items"

export default function useFetchItems () {
    const items = ref(null)
    const loading = ref(true)
    const error = ref(null)

    async function fetchItems() {
        try {
            const result = await fetch(baseUrl+'/50')
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