import { ref } from 'vue'
import apiCore from '../api'
import type { IFornecedorFiltro } from '@/Interfaces/Fornecedor/IFornecedorFiltro'

class FornecedorService {
  protected baseURL = ref<string>('')

  constructor() {
    this.baseURL.value = 'fornecedores'
  }

  public getFornecedor = async () => {
    const { data } = await apiCore.get(this.baseURL.value)

    return data
  }

  public getFornecedorPaginado = async (filtro: IFornecedorFiltro) => {
    const { data } = await apiCore.get(`${this.baseURL.value}/paginado`, { params: filtro })

    return data
  }
}

export default new FornecedorService()
