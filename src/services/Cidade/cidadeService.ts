import { ref } from 'vue'
import apiCore from '../api'

class CidadeService {
  protected baseURL = ref<string>('')

  constructor() {
    this.baseURL.value = 'cidades'
  }

  public getCidades = async () => {
    const { data } = await apiCore.get(this.baseURL.value)

    return data
  }
}

export default new CidadeService()
