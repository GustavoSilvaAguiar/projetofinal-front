<template>
  <div class="btnWrap">
    
    <ButtonsComponent @click="handleCreate" color="primary" prepend-icon="mdi-plus"
      >Adicionar Categoria</ButtonsComponent
    >
    <ButtonsComponent @click="handleEdit" color="warning" prepend-icon="mdi-pencil-outline"
      >Editar Categoria</ButtonsComponent
    >
  </div>
  <div class="cardsWrap">
    <CardCategoria
      @click="router.push({ path: 'produto', query: { id: categoria.id } })"
      :data="categoria"
      v-for="(categoria, index) in categorias"
      :key="index"
    />
  </div>

  <ModalComponent :title="edit ? 'Editar Categoria' : 'Adicionar Categoria'" ref="modal">
    <div>
      <selectField
        v-if="edit"
        variant="outlined"
        label="Categoria"
        item-title="nome"
        item-value="id"
        :itens="categorias"
        v-model="payload.id"
      />
      <TextField title="nome" v-model="payload.nome" compact variant="outlined" />
      <FileField v-model="payload.img"></FileField>
      <ButtonsComponent
        v-if="!edit"
        prepend-icon="mdi-plus"
        color="primary"
        :onclick="createCategoria"
      >
        Adicionar categoria
      </ButtonsComponent>
      <ButtonsComponent v-if="edit" :onclick="editCategoria"> Editar categoria </ButtonsComponent>
    </div>
  </ModalComponent>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import categoriaService from '../../../services/Categoria/categoriaService'
import ButtonsComponent from '@/components/buttons/ButtonsComponent.vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import TextField from '@/components/inputs/textField.vue'
import FileField from '@/components/inputs/fileField.vue'
import CardCategoria from '../Components/CardCategoria.vue'
import type { ICategoria } from '@/Interfaces/Categoria/ICategoria'
import selectField from '@/components/inputs/selectField.vue'
import { useToast } from 'vue-toastification'
import router from '@/router'
import BarChart from '@/components/charts/BarChart.vue'


const modal = ref()

const payload = ref<ICategoria>({} as ICategoria)

const service = categoriaService

const edit = ref<boolean>(false)

const toast = useToast()

const categorias = ref<ICategoria[]>([] as ICategoria[])
onMounted(async () => {
  getCategoria()
})

watch(
  () => payload.value.id,
  () => {
    fillModal(payload.value.id)
  }
)

const fillModal = (id: number) => {
  const categoria = categorias.value.find(
    (categoria: ICategoria) => categoria.id === id
  ) as ICategoria
  payload.value.nome = categoria?.nome
  payload.value.idusuario = categoria?.idusuario
}

const getCategoria = async () => {
  await service.getCategoria().then((response) => {
    categorias.value = response
  })
}

const handleCreate = () => {
  edit.value = false
  payload.value = {} as ICategoria
  modalHandle()
}

const handleEdit = () => {
  edit.value = true
  payload.value = {} as ICategoria
  modalHandle()
}

const modalHandle = () => {
  modal.value.modalHandle()
}

const createCategoria = async () => {
  await service.postCategoria(payload.value).then((response: any) => {
    toast.success('Categoria criada com sucesso')
    getCategoria()
    modalHandle()
  })
}

const editCategoria = async () => {
  await service.putCategoria(payload.value).then(() => {
    toast.success('Categoria atualizada com sucesso')
    getCategoria()
    modalHandle()
  })
}
</script>
<style lang="scss" scoped>
.cardsWrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  padding: 40px;
}

.btnWrap {
  display: flex;
  column-gap: 10px;
  justify-content: flex-end;
  padding-top: 20px;
  padding-right: 40px;
}
</style>
