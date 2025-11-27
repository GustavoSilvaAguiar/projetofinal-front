import { ref } from 'vue'
import apiCore from '../api'
import type { IEstoqueFiltro } from '@/Interfaces/Estoque/IEstoqueFiltro'
import type { IEstoque } from '@/Interfaces/Estoque/IEstoque'
import { useAuthStore } from '@/stores/authStore'

class EstoqueService {
  protected baseURL = ref<string>('')
  constructor() {
    this.baseURL.value = 'estoque'
  }

  public getEstoque = async (filtro: IEstoqueFiltro) => {
    const { data } = await apiCore.get(this.baseURL.value, { params: filtro })

    return data
  }

  public postEstoque = async (payload: IEstoque) => {
    payload.idusuario = useAuthStore().user.id
    const { data } = await apiCore.post(this.baseURL.value, payload)

    return data
  }
}

export default new EstoqueService()
