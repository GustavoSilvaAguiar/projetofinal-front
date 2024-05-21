import { ref } from 'vue'
import apiCore from '../api'

class MarcaService {
  protected baseURL = ref<string>('')

  constructor() {
    this.baseURL.value = 'marcas'
  }

  public getMarcas = async () => {
    const { data } = await apiCore.get(this.baseURL.value)
    return data
  }
}

export default new MarcaService()
