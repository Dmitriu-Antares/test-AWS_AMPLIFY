import axios from 'axios'

class Api {
    private instance: any = null
    private config: any = {
        baseURL: __ENV__.apiPath,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    constructor() {
        this.activateMiddleware()
    }
    private activateMiddleware() {
        const instance = axios.create(this.config)
        instance.interceptors.request.use(config => {
            if(localStorage.getItem('token') !== null) {
                config.headers = {
                    Authorization: localStorage.getItem('token')
                }
            }
            return config
        })
        instance.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                return Promise.reject(error)
            },
        )
        this.instance = instance
    }
    private returnResponse(res) {
        return res && res.data
    }
    get(path: string) {
        return this.instance.get(path).then(this.returnResponse)
    }
    post(path: string, data: any) {
        return this.instance.post(path, data).then(this.returnResponse)
    }
}
const api = new Api()

export default api
