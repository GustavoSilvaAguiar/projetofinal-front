import { ref } from 'vue'
import apiCore from '../api'
import type { IMarcaFiltro } from '@/Interfaces/Marca/IMarcaFiltro'
import type { IMarca } from '@/Interfaces/Marca/IMarca'
import { useAuthStore } from '@/stores/authStore'

class MarcaService {
  protected baseURL = ref<string>('')
  protected auth = useAuthStore().user.id

  constructor() {
    this.baseURL.value = 'marcas'
  }

  public getMarcas = async () => {
    const { data } = await apiCore.get(this.baseURL.value)
    return data
  }

  public getMarcasPaginado = async (filter?: IMarcaFiltro) => {
    const { data } = await apiCore.get(`${this.baseURL.value}Paginado`, { params: filter })
    return data
  }

  public postMarca = async (payload: IMarca) => {
    payload.idusuario = this.auth
    const { data } = await apiCore.post(this.baseURL.value, payload)

    return data
  }

  public putMarca = async (payload: IMarca) => {
    const { data } = await apiCore.put(this.baseURL.value, payload)

    return data
  }
}

export default new MarcaService()
