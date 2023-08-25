import axios from 'axios'

interface RequestProps {
  method: 'get' | 'post' | 'put' | 'delete'
  url?: string
  data?: any
  headers?: any
  [propsName: string]: any
}
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

request.interceptors.request.use(
  (config: any) => {
    if (config.url.indexOf('/login') !== -1) {
      delete config.headers.Authorization
    }
    return {
      ...config,
      headers: {
        ...config?.headers,
        // Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
      },
    }
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    if (error.response && error.response.status === 401) {
      // go to home
    }
    // if (!error.response || !error.status) {
    //   // network error
    //   return Promise.reject({ status: 429, message: 'Rate limit' })
    // }
    return Promise.reject(error.response)
  }
)

const api = (options: RequestProps) => {
  return request({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    responseType: 'json',
    ...options,
    headers: {
      ...options.headers,
    },
  })
}

export default api
