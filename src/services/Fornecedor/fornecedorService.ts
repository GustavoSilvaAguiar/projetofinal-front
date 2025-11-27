import { ref } from 'vue'
import apiCore from '../api'
import type { IFornecedorFiltro } from '@/Interfaces/Fornecedor/IFornecedorFiltro'
import type { IFornecedorCadastro } from '@/Interfaces/Fornecedor/IFornecedorCadastro'
import { useAuthStore } from '@/stores/authStore'

class FornecedorService {
  protected baseURL = ref<string>('')
  protected auth = useAuthStore().user.id

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

  public postFornecedor = async (payload: IFornecedorCadastro) => {
    payload.idusuario = this.auth
    const { data } = await apiCore.post(this.baseURL.value, payload)

    return data
  }

  public putFornecedor = async (payload: IFornecedorCadastro) => {
    const { data } = await apiCore.put(this.baseURL.value, payload)

    return data
  }
}

export default new FornecedorService()
