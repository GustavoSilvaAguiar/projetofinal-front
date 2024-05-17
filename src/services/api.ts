import axios from 'axios'

const apiCore = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
})

export default apiCore
