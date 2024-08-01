import { ref } from 'vue'
import apiCore from '../api'

class ChartsService {
  protected baseURL = ref<string>('')
  constructor() {
    this.baseURL.value = 'charts'
  }

  public getBestSellers = async () => {
    const { data } = await apiCore.get(`${this.baseURL.value}/mais-vendidos`)

    return data
  }

  public getBestCategorias = async () => {
    const { data } = await apiCore.get(`${this.baseURL.value}/mais-vendidos-categoria`)

    return data
  }
}

export default new ChartsService()
