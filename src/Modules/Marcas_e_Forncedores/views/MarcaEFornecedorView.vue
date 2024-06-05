<template>
  <div class="tablesWrap">
    <div class="tabeWrap">
      <div class="filterWrap">
        <textField
          density="compact"
          v-model="marcaFilter.nome"
          title="Pesquisar Marcas"
          variant="outlined"
        />
        <ButtonsComponent prependIcon="mdi-filter" @click="getMarcasPaginado()"
          >Pesquisar</ButtonsComponent
        >
        <ButtonsComponent prependIcon="mdi-filter-off" color="warning" @click="clearMarcasFilter()"
          >Limpar Filtro</ButtonsComponent
        >
        <ButtonsComponent prependIcon="mdi-plus" color="primary" @click="createMarca()"
          >Cadastrar</ButtonsComponent
        >
      </div>
      <LoadingComponent v-if="loadingMarca" />
      <TableComponent
        v-if="!loadingMarca"
        :data="marcas.data"
        :pagination-data="marcas"
        :colunas="colunasMarca"
        @change-page="changeMarcaPage"
        @edit-action="editMarca"
      />
    </div>
    <div>
      <div class="filterWrap">
        <textField
          density="compact"
          v-model="fornecedoresFilter.nome"
          title="Pesquisar Fornecedores"
          variant="outlined"
        />
        <ButtonsComponent
          prependIcon="mdi-filter"
          color="primary"
          @click="getFornecedoresPaginado()"
          >Pesquisar</ButtonsComponent
        >
        <ButtonsComponent
          prependIcon="mdi-filter-off"
          color="warning"
          @click="clearFornecedoresFilter()"
          >Limpar Filtro</ButtonsComponent
        >
        <ButtonsComponent prependIcon="mdi-plus" color="primary" @click="modalFornecedorHandle()"
          >Cadastrar</ButtonsComponent
        >
      </div>
      <LoadingComponent v-if="loadingFornecedor" />
      <TableComponent
        v-if="!loadingFornecedor"
        :data="fornecedores.data"
        :pagination-data="fornecedores"
        :colunas="colunasFornecedores"
        @change-page="changeFornecedorPage"
        @edit-action="editFornecedor"
      />
    </div>
  </div>
  <ModalComponent ref="modalMarca" :title="edit ? 'Editar Marca' : 'Cadastrar Marca'">
    <textField style="min-width: 200px" title="Nome" v-model="payloadMarca.nome" />
    <ButtonsComponent
      block
      @click="edit ? putMarca() : postMarc()"
      :prependIcon="edit ? 'mdi-pencil' : 'mdi-plus'"
      color="primary"
      >{{ edit ? 'Editar' : 'Cadastrar' }}</ButtonsComponent
    >
  </ModalComponent>
  <ModalComponent
    ref="modalFornecedor"
    :title="edit ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'"
  >
    <textField style="min-width: 200px" v-model="payloadFornecedor.nome" title="Nome" />
    <textField style="min-width: 200px" v-model="payloadFornecedor.ddd" title="DDD" />
    <textField style="min-width: 200px" v-model="payloadFornecedor.telefone" title="Telefone" />
    <textField style="min-width: 200px" v-model="payloadFornecedor.email" title="Email" />
    <ButtonsComponent
      block
      @click="edit ? putFornececedor() : postFornecedor()"
      :prependIcon="edit ? 'mdi-pencil' : 'mdi-plus'"
      color="primary"
      >{{ edit ? 'Editar' : 'Cadastrar' }}</ButtonsComponent
    >
  </ModalComponent>
</template>
<script setup lang="ts">
import fornecedorService from '@/services/Fornecedor/fornecedorService'
import MarcaService from '@/services/Marca/MarcaService'
import TableComponent from '@/components/table/TableComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import textField from '@/components/inputs/textField.vue'
import ButtonsComponent from '@/components/buttons/ButtonsComponent.vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import { onMounted, ref } from 'vue'
import type { IFornecedorFiltro } from '@/Interfaces/Fornecedor/IFornecedorFiltro'
import type { IMarcaFiltro } from '@/Interfaces/Marca/IMarcaFiltro'
import type { IMarca } from '@/Interfaces/Marca/IMarca'
import { useToast } from 'vue-toastification'
import type { IMarcaPaginado } from '@/Interfaces/Marca/IMarcaPaginado'
import type { IFornecedorCadastro } from '@/Interfaces/Fornecedor/IFornecedorCadastro'
import type { IFornecedor } from '@/Interfaces/Fornecedor/IFornecedor'
import type { ITable } from '@/Interfaces/Table/ITable'

const loadingMarca = ref<boolean>(true)
const loadingFornecedor = ref<boolean>(true)
const edit = ref<boolean>(false)

const marcas = ref<IMarcaPaginado>({} as IMarcaPaginado)
const fornecedores = ref()
const serviceMarcas = MarcaService
const serviceFornecedores = fornecedorService
const toast = useToast()

const fornecedoresFilter = ref<IFornecedorFiltro>({} as IFornecedorFiltro)
const marcaFilter = ref<IMarcaFiltro>({} as IMarcaFiltro)

const modalMarca = ref()
const modalFornecedor = ref()

const payloadMarca = ref<IMarca>({} as IMarca)
const payloadFornecedor = ref<IFornecedorCadastro>({} as IFornecedorCadastro)

onMounted(async () => {
  getMarcasPaginado()
  getFornecedoresPaginado()
})

const getMarcasPaginado = async () => {
  await serviceMarcas.getMarcasPaginado(marcaFilter.value).then((response) => {
    marcas.value = response
    loadingMarca.value = false
  })
}

const postFornecedor = async () => {
  await serviceFornecedores.postFornecedor(payloadFornecedor.value).then(() => {
    toast.success('Fornecedor cadastrado')
    getFornecedoresPaginado()
  })
}

const putFornececedor = async () => {
  await serviceFornecedores.putFornecedor(payloadFornecedor.value).then(() => {
    toast.success('Fornecedor editado')
    getFornecedoresPaginado()
  })
}

const postMarc = async () => {
  await serviceMarcas.postMarca(payloadMarca.value).then(() => {
    toast.success('Sucesso ao cadastrar marca')
  })
}

const putMarca = async () => {
  await serviceMarcas.putMarca(payloadMarca.value).then(() => {
    toast.success('Marca editada')
    getMarcasPaginado()
  })
}

const createMarca = () => {
  changeEditValue(false)
  payloadMarca.value = {} as IMarca
  modalHandle()
}

const editMarca = (id: number) => {
  modalHandle()
  changeEditValue(true)
  const marca = marcas.value.data.find((marca: IMarca) => marca.id === id)
  marca ? (payloadMarca.value = { ...marca }) : ''
}

const editFornecedor = (id: number) => {
  modalFornecedorHandle()
  changeEditValue(true)
  const fornecedor = fornecedores.value.data.find(
    (fornecedor: IFornecedorCadastro) => fornecedor.id === id
  )

  payloadFornecedor.value.id = fornecedor?.id
  payloadFornecedor.value.ddd = fornecedor.contato?.ddd
  payloadFornecedor.value.email = fornecedor.contato?.email
  payloadFornecedor.value.telefone = fornecedor.contato?.telefone
  payloadFornecedor.value.nome = fornecedor?.nome
  payloadFornecedor.value.idusuario = fornecedor?.idusuario
  payloadFornecedor.value.idcontato = fornecedor?.idcontato
}

const changeEditValue = (value: boolean) => {
  edit.value = value
}

const getFornecedoresPaginado = async () => {
  loadingFornecedor.value = true
  await serviceFornecedores.getFornecedorPaginado(fornecedoresFilter.value).then((response) => {
    fornecedores.value = response
    loadingFornecedor.value = false
  })
}

const clearFornecedoresFilter = () => {
  fornecedoresFilter.value = {} as IFornecedorFiltro
  getFornecedoresPaginado()
}

const changeFornecedorPage = (newPage: number) => {
  fornecedoresFilter.value.page = newPage
  getFornecedoresPaginado()
}

const clearMarcasFilter = () => {
  marcaFilter.value = {} as IMarcaFiltro
  getMarcasPaginado()
}

const changeMarcaPage = (newPage: number) => {
  marcaFilter.value.page = newPage
  getMarcasPaginado()
}

const modalHandle = () => {
  //clearPayload()
  modalMarca.value.modalHandle()
}

const modalFornecedorHandle = () => {
  modalFornecedor.value.modalHandle()
}

const colunasMarca = ref<ITable[]>([
  {
    title: 'Marcas',
    field: 'nome',
    type: 'string'
  },
  {
    title: 'Ações',
    field: 'action',
    type: 'string',
    subActions: {
      edit: true
    }
  }
])

const colunasFornecedores = ref<ITable[]>([
  {
    title: 'Fornecedores',
    field: 'nome',
    type: 'string'
  },
  {
    title: 'Telefone',
    field: 'contato.telefone',
    type: 'string'
  },
  {
    title: 'Email',
    field: 'contato.email',
    type: 'string'
  },
  {
    title: 'Ações',
    field: 'action',
    type: 'string',
    subActions: {
      edit: true
    }
  }
])
</script>
<style lang="scss" scoped>
.tablesWrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.filterWrap {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px 20px;

  ::v-deep .v-input__details {
    display: none;
  }
}
</style>
