<template>
  <div class="cadastroWrap">
    <FormCadastro @create-user="createUser" :cidades="cidades" />
  </div>
</template>
<script setup lang="ts">
import type { ICadastro } from '@/Interfaces/User/ICadastro'
import FormCadastro from '@/components/formCadastro/FormCadastro.vue'
import cidadeService from '@/services/Cidade/cidadeService'
import userService from '@/services/User/userService'
import { useAuthStore } from '@/stores/authStore'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const serviceCidades = cidadeService
const service = userService
const toast = useToast()
const router = useRouter()

const cidades = ref()

onBeforeMount(() => {
  !useAuthStore().token ? '' : useRouter().push('/categoria')
})

onMounted(async () => {
  await serviceCidades.getCidades().then((response) => {
    cidades.value = response
  })
})

const createUser = async (payload: ICadastro) => {
  await service.createUser(payload).then(() => {
    toast.success('Sucesso ao criar um novo usuário')
    router.push('/login')
  })
}
</script>
<style lang="scss" scoped>
.cadastroWrap {
  background-color: $primary;
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>
