import { ref, type Ref } from 'vue'
import { z } from 'zod'

const BASE_URL = 'http://localhost:3000/rooms'
const RoomsFetchParser = z.object({
    id: z.number(),
    name: z.string()
})
export type Rooms = z.infer<typeof RoomsFetchParser>
export const rooms: Ref<Rooms[]> = ref([])
export const loading: Ref<boolean> = ref(true)
export const error: Ref<unknown> = ref(null)
export const fetchRooms = async () => {
    loading.value = true
    try {
        const result = await fetch(BASE_URL)
        const data = await result.json()
        rooms.value = RoomsFetchParser.array().parse(data)
    } catch (err) {
        error.value = err
        console.log(err)
    } finally {
        loading.value = false
    }
}