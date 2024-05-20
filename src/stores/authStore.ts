import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref()

  function addToken(newToken: string) {
    console.log('addtoken', newToken)
    token.value = newToken
  }

  return { token, addToken }
})
