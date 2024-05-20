import apiCore from '@/services/api'
import { ref } from 'vue'

class CategoriaService {
  protected baseURL = ref<string>('')

  constructor() {
    this.baseURL.value = 'categorias'
  }

  public getCategoria = async () => {
    const { data } = await apiCore.get(this.baseURL.value)

    return data
  }
}

export default new CategoriaService()
