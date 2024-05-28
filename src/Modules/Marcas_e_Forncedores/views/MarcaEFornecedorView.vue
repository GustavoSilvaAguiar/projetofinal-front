<template>
  <div class="tablesWrap">
    <div class="tabeWrap">
      <textField title="Pesquisar Marcas" variant="outlined" />
      <ButtonsComponent>Pesquisar Marca</ButtonsComponent>
      <LoadingComponent v-if="loadingMarca" />
      <TableComponent
        v-if="!loadingMarca"
        :data="marcas.data"
        :pagination-data="marcas"
        :colunas="colunasMarca"
      />
    </div>
    <div>
      <textField
        v-model="fornecedoresFilter.nome"
        title="Pesquisar Fornecedores"
        variant="outlined"
      />
      <ButtonsComponent @click="getFornecedoresPaginado()">Pesquisar Fornecedor</ButtonsComponent>
      <LoadingComponent v-if="loadingFornecedor" />
      <TableComponent
        v-if="!loadingFornecedor"
        :data="fornecedores.data"
        :pagination-data="fornecedores"
        :colunas="colunasFornecedores"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import fornecedorService from '@/services/Fornecedor/fornecedorService'
import MarcaService from '@/services/Marca/MarcaService'
import TableComponent from '@/components/table/TableComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import textField from '@/components/inputs/textField.vue'
import ButtonsComponent from '@/components/buttons/ButtonsComponent.vue'
import { onMounted, ref } from 'vue'
import type { IFornecedorFiltro } from '@/Interfaces/Fornecedor/IFornecedorFiltro'

const loadingMarca = ref<boolean>(true)
const loadingFornecedor = ref<boolean>(true)

const marcas = ref()
const fornecedores = ref()
const serviceMarcas = MarcaService
const serviceFornecedores = fornecedorService

const fornecedoresFilter = ref<IFornecedorFiltro>({} as IFornecedorFiltro)

onMounted(async () => {
  getMarcasPaginado()
  getFornecedoresPaginado()
})

const getMarcasPaginado = async () => {
  await serviceMarcas.getMarcasPaginado().then((response) => {
    marcas.value = response
    loadingMarca.value = false
  })
}

const getFornecedoresPaginado = async () => {
  loadingFornecedor.value = true
  console.log('asasdas', fornecedoresFilter.value.nome)
  await serviceFornecedores.getFornecedorPaginado(fornecedoresFilter.value).then((response) => {
    fornecedores.value = response
    loadingFornecedor.value = false
  })
}

const colunasMarca = ref<{ title: string; field: string; type: 'string' | 'date' | 'money' }[]>([
  {
    title: 'Marcas',
    field: 'nome',
    type: 'string'
  },
  {
    title: 'Ações',
    field: 'action',
    type: 'string'
  }
])

const colunasFornecedores = ref<
  { title: string; field: string; type: 'string' | 'date' | 'money' }[]
>([
  {
    title: 'Fornecedores',
    field: 'nome',
    type: 'string'
  },
  {
    title: 'Ações',
    field: 'action',
    type: 'string'
  }
])
</script>
<style lang="scss" scoped>
.tablesWrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
