import apiCore from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

class AuthService {
  protected baseURL = ref<string>('')
  //protected token = useAuthStore()
  constructor() {
    this.baseURL.value = 'login'
  }

  public login = async (login: string, senha: string) => {
    const { data } = await apiCore.post(this.baseURL.value, {
      login: login,
      senha: senha,
      device_name: 'Front teste'
    })
    const authStore = useAuthStore()

    authStore.addToken(data.token)

    return data
  }
}

export default new AuthService()
