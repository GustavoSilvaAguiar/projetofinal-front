import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

const apiCore = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
  /* headers: {
    authorization: `Bearer ${useAuthStore().token ? useAuthStore().token : ''}`
  } */
})

apiCore.interceptors.request.use(
  (config) => {
    console.log('entrou')
    const authStore = useAuthStore()
    console.log('easdasda::', authStore.token)
    const token = authStore.token
    console.log('entrou 2', token)
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default apiCore
