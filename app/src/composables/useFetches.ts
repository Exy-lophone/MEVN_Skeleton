import { ref, type Ref } from 'vue'
import { z } from 'zod'

export type FetchObj<DataType> = {
    data: Ref<DataType | null>,
    loading: Ref<Boolean>,
    error: Ref<unknown>,
    load: () => Promise<void>
}

export const createFetchObj = <DataType>(url: string, req: RequestInit, parser: z.ZodType<DataType>): FetchObj<DataType> => {
    return {
        data: ref(null),
        loading: ref(true),
        error: ref(null),
        load: async function () {
            this.loading.value = true
            try {
                const response = await fetch(url, req)
                const parsedJson = await response.json()
                this.data.value = parser.parse(parsedJson)
            } catch (err) {
                this.error.value = err
                console.log(err)
            } finally {
                this.loading.value = false
            }
        }
    }
}