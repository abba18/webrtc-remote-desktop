import axios from "axios"

const instance = axios.create({
    // https://jsonplaceholder.typicode.com/posts?_limit=5
    // baseURL: 'https://jsonplaceholder.typicode.com',
    baseURL: 'http://localhost',
    timeout: 10000,
})

instance.interceptors.response.use(
    response => {
        if (response.data.code === 0) {
            return Promise.resolve(response.data.data)
        } else {
            return Promise.reject(response.data)
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export const post = (url, req) => {
    return new Promise((resolve, reject) => {
        instance.post(url, req)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const get = (url, req = null) => {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: req
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}