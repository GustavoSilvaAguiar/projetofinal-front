import { ref } from 'vue'
import apiCore from '../api'

class FornecedorService {
  protected baseURL = ref<string>('')

  constructor() {
    this.baseURL.value = 'fornecedores'
  }

  public getFornecedor = async () => {
    const { data } = await apiCore.get(this.baseURL.value)

    return data
  }
}

export default new FornecedorService()
