import { ref, type Ref } from 'vue'
import { z } from 'zod'

const BASE_URL = 'http://localhost:3000/closets'
const ClosetsFetchParser = z.object({
    id: z.number(),
    name: z.string(),
    fk_room: z.number()
})
export type Closet = z.infer<typeof ClosetsFetchParser>
export const closets: Ref<Closet[]> = ref([])
export const loading: Ref<boolean> = ref(true)
export const error: Ref<unknown> = ref(null)
export const fetchClosets = async () => {
    loading.value = true
    try {
        const result = await fetch(BASE_URL)
        const data = await result.json()
        closets.value = ClosetsFetchParser.array().parse(data)
    } catch (err) {
        error.value = err
        console.log(err)
    } finally {
        loading.value = false
    }
}