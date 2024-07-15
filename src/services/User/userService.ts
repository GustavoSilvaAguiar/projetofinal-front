import type { ICadastro } from '@/Interfaces/User/ICadastro'
import { ref } from 'vue'
import apiCore from '../api'
import { useAuthStore } from '@/stores/authStore'

class UserService {
  protected baseURL = ref<string>('')
  protected userID = useAuthStore().user.id
  constructor() {
    this.baseURL.value = 'usuarios'
  }

  public createUser = async (payload: ICadastro) => {
    const { data } = await apiCore.post(`${this.baseURL.value}/endereco`, payload)

    return data
  }

  public getUser = async () => {
    const { data } = await apiCore.get(`${this.baseURL.value}/${this.userID}`)

    return data
  }

  public putUser = async (payload: ICadastro) => {
    const { data } = await apiCore.put(`${this.baseURL.value}/${this.userID}`, payload)

    return data
  }
}

export default new UserService()
