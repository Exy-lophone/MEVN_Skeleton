import { createFetchObj, type FetchObj } from './useFetch'
import { z } from 'zod'

const BASE_URL = 'http://localhost:3000/rooms'

export const RoomsFetchParser = z.array(z.object({
    id: z.number(),
    name: z.string()
}))

export type Rooms = z.infer<typeof RoomsFetchParser>

export const roomFetchObj = createFetchObj({url:BASE_URL,req:{}, parser: RoomsFetchParser})