import apiCore from '@/services/api'
import { ref } from 'vue'
import type { ICategoria } from '@/Interfaces/Categoria/ICategoria'
import { useAuthStore } from '@/stores/authStore'

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
    payload.idusuario = useAuthStore().user.id
    const { data } = await apiCore.post(this.baseURL.value, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return data
  }

  public putCategoria = async (payload: ICategoria) => {
    payload.idusuario = useAuthStore().user.id

    const { data } = await apiCore.post(`${this.baseURL.value}/${payload.id}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return data
  }
}

export default new CategoriaService()
