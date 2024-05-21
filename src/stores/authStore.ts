import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IUser {
  id: number
  nome: string
}

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const token = ref()
    const user = ref<IUser>({} as IUser)

    function addToken(newToken: string) {
      token.value = newToken
    }

    function addUser(newUser: IUser) {
      user.value.id = newUser.id
      user.value.nome = newUser.nome
    }

    return { token, addToken, addUser, user }
  },
  {
    persist: {
      key: 'authStore',
      storage: localStorage
    }
  }
)
