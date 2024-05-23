import apiCore from '@/services/api'
import { ref } from 'vue'
import type { IProdutoPaginado } from '../Interfaces/IProdutoPaginado'
import type { IProduto } from '../Interfaces/IProduto'
import { useAuthStore } from '@/stores/authStore'

class ProdutoService {
  protected baseURL = ref<string>('')

  constructor() {
    this.baseURL.value = 'produtos'
  }

  public getProdutos = async (filter?: any) => {
    const { data } = await apiCore.get<IProdutoPaginado>(this.baseURL.value, { params: filter })
    return data
  }

  public getProdutosNoPagination = async () => {
    const { data } = await apiCore.get(`${this.baseURL.value}/nopage`)
    return data
  }

  public postProduto = async (payload: IProduto) => {
    payload.idusuario = useAuthStore().user.id
    const { data } = await apiCore.post<IProduto>(this.baseURL.value, payload)

    return data
  }

  public putProduto = async (payload: IProduto) => {
    const { data } = await apiCore.put<IProduto>(this.baseURL.value, payload)

    return data
  }
}

export default new ProdutoService()
