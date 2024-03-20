import { ref } from "vue"

/**
 * 
 * @param {String} url - url to fetch
 * @param {String} method - GET | POST | PATCH | DELETE
 * @param {Object} body - request body
 * @param {String} jwt - JsonWebToken for auth
 * @returns 
 */
export const useFetch = (url, method, body, jwt) => {
    const data = ref(null)
    const error = ref(false)
    const loading = ref(true)
    const request = {}

    //Set the request
    request['headers'] = {'Content-Type': 'application/json'}
    if(method) request['method'] = method
    if(body) request['body'] = JSON.stringify(body)
    if(jwt) request['headers']['Authorization'] = 'bearer ' + jwt

    console.log(request);

    //Execute fetch
    (async () => {
        try {
            const response = await fetch(url, request)
            if(!response.ok) throw Error('no data available')
            data.value = await response.json()
            console.log(data.value)
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        } finally {
            loading.value = false
        }
    })();

    return { data, error, loading }
}