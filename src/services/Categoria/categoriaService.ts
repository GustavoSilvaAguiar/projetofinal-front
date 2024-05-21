import apiCore from '@/services/api'
import { ref } from 'vue'
import type { ICategoria } from '../../Modules/Categoria/Interfaces/ICategoria'

class CategoriaService {
  protected baseURL = ref<string>('')

  constructor() {
    this.baseURL.value = 'categorias'
  }

  public getCategoria = async () => {
    const { data } = await apiCore.get(this.baseURL.value)

    return data
  }

  public postCategoria = async (payload: ICategoria) => {
    const { data } = await apiCore.post(this.baseURL.value, payload)

    return data
  }
}

export default new CategoriaService()
