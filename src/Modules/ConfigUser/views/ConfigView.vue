<template>
  <div>
    <FormCadastro @edit-user="editUser" :edit="true" />
  </div>
</template>

<script setup lang="ts">
import type { ICadastro } from '@/Interfaces/User/ICadastro'
import FormCadastro from '@/components/formCadastro/FormCadastro.vue'
import userService from '@/services/User/userService'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'vue-toastification'

const serviceUser = userService
const toast = useToast()
const userId = useAuthStore().user.id

const editUser = async (payload: ICadastro) => {
  payload.id = userId.toString()
  await serviceUser.putUser(payload).then(() => {
    toast.success('Sucesso ao editar')
  })
}
</script>

<style scoped lang="scss"></style>
