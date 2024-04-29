import { createFetchObj, type FetchObj } from './useFetch'
import { z } from 'zod'

const BASE_URL = 'http://localhost:3000/categories'

export const CategoriesFetchParser = z.array(z.object({
    id: z.number(),
    name: z.string()
}))

export type Category = z.infer<typeof CategoriesFetchParser.element>

export const categoryFetchObj = createFetchObj<Category>({url: BASE_URL, req: {}, parser: CategoriesFetchParser})

