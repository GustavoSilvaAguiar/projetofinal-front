<template>
  <ButtonsComponent @click="modalHandle" color="primary" variant="tonal" prepend-icon="mdi-plus"
    >Adicionar Categoria</ButtonsComponent
  >
  <ButtonsComponent variant="tonal" prepend-icon="mdi-pencil-outline"
    >Editar Categoria</ButtonsComponent
  >
  <div v-for="(categoria, index) in categorias" :key="index">{{ categoria }}</div>
  <ModalComponent title="Adicionar Categoria" ref="modal">
    <div>
      <TextField title="nome" v-model="nomeCategoria" compact variant="outlined" />
      <FileField v-model="imgCategoria"></FileField>
      <ButtonsComponent :onclick="createCategoria">Adicionar Categoria</ButtonsComponent>
    </div>
  </ModalComponent>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import categoriaService from '../../../services/Categoria/categoriaService'
import ButtonsComponent from '@/components/buttons/ButtonsComponent.vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import TextField from '@/components/inputs/textField.vue'
import FileField from '@/components/inputs/fileField.vue'
import type { ICategoria } from '../Interfaces/ICategoria'
import { useAuthStore } from '@/stores/authStore'

const modal = ref()

const nomeCategoria = ref<string>('')
const imgCategoria = ref<File>()

const service = categoriaService

const categorias = ref()
onMounted(async () => {
  categorias.value = await categoriaService.getCategoria()
})

const modalHandle = () => {
  modal.value.modalHandle()
}

const createCategoria = async () => {
  const payload: ICategoria = {
    nome: nomeCategoria.value,
    img: imgCategoria.value,
    idusuario: useAuthStore().user.id
  }
  await service.postCategoria(payload)
}
</script>
<style lang="scss" scoped></style>
