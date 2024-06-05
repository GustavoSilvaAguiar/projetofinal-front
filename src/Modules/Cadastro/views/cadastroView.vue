<template>
  <div class="cadastroWrap">
    <FormCadastro @create-user="createUser" :edit="false" />
  </div>
</template>
<script setup lang="ts">
import type { ICadastro } from '@/Interfaces/User/ICadastro'
import FormCadastro from '@/components/formCadastro/FormCadastro.vue'
import userService from '@/services/User/userService'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const service = userService
const toast = useToast()
const router = useRouter()

const createUser = async (payload: ICadastro) => {
  await service.createUser(payload).then(() => {
    toast.success('Sucesso ao criar um novo usuário')
    router.push('/login')
  })
}
</script>
<style lang="scss" scoped></style>
