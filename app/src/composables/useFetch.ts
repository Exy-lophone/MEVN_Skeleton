import { ref, type Ref } from 'vue'
import { z } from 'zod'

export type FetchRequest<DataType> = {
    url: string,
    req: RequestInit,
    parser: z.ZodArray<z.ZodType<DataType>>
}

export type FetchObj<DataType> = {
    data: Ref<DataType[]>,
    loading: Ref<Boolean>,
    error: Ref<unknown>,
    load: () => Promise<void>
}

export type CreateFetchObj = <DataType>(
    fetchRequest: FetchRequest<DataType>
) => FetchObj<DataType>

export const createFetchObj: CreateFetchObj = (fetchRequest) => {
    return {
        data: ref([]),
        loading: ref(true),
        error: ref(null),
        load: async function () {
            this.loading.value = true
            try {
                const response = await fetch(fetchRequest.url, fetchRequest.req)
                const json = await response.json()
                if(!(json instanceof Array)) {
                    const parsed = fetchRequest.parser.element.parse(json)
                    this.data.value = [parsed]
                } else {
                    this.data.value = fetchRequest.parser.parse(json)
                }
            } catch (err) {
                this.error.value = err
                console.log(err)
            } finally {
                this.loading.value = false
            }
        }
    }
}

export type CreateManyFetchObj = <DataType>(
    requests: FetchRequest<DataType>[]
) => FetchObj<DataType>[]

export const createManyFetchObj: CreateManyFetchObj = (requests) => {
    const fetchObjects = requests.map(x => createFetchObj(x))
    fetchObjects.map(x => x.load())
    return fetchObjects
}
