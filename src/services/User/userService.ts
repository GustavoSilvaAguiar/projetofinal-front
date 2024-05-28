import type { ICadastro } from '@/Interfaces/User/ICadastro'
import { ref } from 'vue'
import apiCore from '../api'

class UserService {
  protected baseURL = ref<string>('')
  constructor() {
    this.baseURL.value = 'usuarios'
  }

  public createUser = async (payload: ICadastro) => {
    const { data } = await apiCore.post(`${this.baseURL.value}/endereco`, payload)

    return data
  }
}

export default new UserService()
