import { createFetchObj, type FetchObj } from './useFetch'
import { z } from 'zod'

const BASE_URL = 'http://localhost:3000/closets'

export const ClosetsFetchParser = z.array(z.object({
    id: z.number(),
    name: z.string(),
    fk_room: z.number()
}))

export type Closet = z.infer<typeof ClosetsFetchParser.element>

export const closetFetchObj = createFetchObj<Closet>({url:BASE_URL,req: {}, parser: ClosetsFetchParser})