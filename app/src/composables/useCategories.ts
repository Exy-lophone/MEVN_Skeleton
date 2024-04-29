import { ref, type Ref } from 'vue'
import { z } from 'zod'
import {createFetchObj} from './useFetch'

const BASE_URL = 'http://localhost:3000/categories'

const CategoriesFetchParser = z.object({
    id: z.number(),
    name: z.string()
})

export type Category = z.infer<typeof CategoriesFetchParser>

export const catgoryFetchObj = createFetchObj<Category>(BASE_URL,{},CategoriesFetchParser)

