<template>
  <div>
    <div class="filtroWrap">
      <TextField v-model="filtro.produto" title="Nome produto" variant="outlined" />
      <SelectField
        v-model="filtro.operacao"
        label="Operação"
        :itens="['entrada', 'saída']"
        variant="outlined"
      />
      <TextField
        v-model="filtro.data_cadastro_maior"
        type="date"
        title="Data de cadastro maior que:"
        variant="outlined"
      />
      <TextField
        v-model="filtro.data_cadastro_menor"
        type="date"
        title="Data de cadastro menor que:"
        variant="outlined"
      />
      <TextField
        v-model="filtro.data_validade_maior"
        type="date"
        title="Data de validade maior que:"
        variant="outlined"
      />
      <TextField
        v-model="filtro.data_validade_menor"
        type="date"
        title="Data de validade menor que:"
        variant="outlined"
      />
      <TextField v-model="filtro.lote" title="Lote" variant="outlined" />
      <SelectField
        v-model="filtro.fornecedor"
        label="Fornecedor"
        :itens="fornecedor"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <SelectField
        v-model="filtro.marca"
        label="Marca"
        :itens="marcas"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <ButtonsComponent @click="getEstoque" color="primary" prepend-icon="mdi-filter"
        >Aplicar filtros</ButtonsComponent
      >
      <ButtonsComponent @click="clearFilter" color="warning" prepend-icon="mdi-filter-off"
        >Limpar filtros</ButtonsComponent
      >
      <ButtonsComponent prependIcon="mdi-swap-vertical-bold" color="primary" :onclick="addEstoque"
        >Movimentar Estoque</ButtonsComponent
      >
    </div>
    <TableComponent
      v-if="!loading"
      :colunas="colunas"
      :pagination-data="estoque"
      :data="estoque.data"
      @change-page="changePage"
      @edit-action="editEstoque"
    />

    <LoadingComponent v-if="loading" />
  </div>

  <ModalComponent ref="modal" title="Movimentar estoque">
    <div class="modalWrap">
      <SelectField
        v-model="payload.idproduto"
        :readonly="change"
        label="Produto"
        :itens="produtos"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <SelectField
        v-model="payload.idfornecedor"
        :readonly="change"
        label="Fornecedor"
        :itens="fornecedor"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <SelectField
        v-model="payload.tipo_operacao"
        label="Operação"
        :itens="change ? ['entrada', 'saída'] : ['entrada']"
        variant="outlined"
      />
      <TextField
        v-model="payload.qtd_estoque"
        type="number"
        title="Quantidade movimentada"
        variant="outlined"
      />
      <TextField
        :readonly="change"
        v-model="payload.lcz_estoque"
        title="Localização no estoque"
        variant="outlined"
      />
      <TextField
        type="date"
        :readonly="change"
        v-model="payload.data_validade"
        title="Data de validade"
        variant="outlined"
      />
      <TextField :readonly="change" v-model="payload.lote" title="Lote" variant="outlined" />
      <TextField v-model="payload.observacao" title="Observação" variant="outlined" />
    </div>
    <ButtonsComponent
      :disabled="!validado"
      prependIcon="mdi-swap-vertical-bold"
      color="primary"
      :onclick="postEstoque"
      >Movimentar Estoque</ButtonsComponent
    >
  </ModalComponent>
</template>
<script setup lang="ts">
import type { IEstoqueFiltro } from '@/Interfaces/Estoque/IEstoqueFiltro'
import ButtonsComponent from '@/components/buttons/ButtonsComponent.vue'
import SelectField from '@/components/inputs/selectField.vue'
import TextField from '@/components/inputs/textField.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'
import estoqueService from '@/services/Estoque/estoqueService'
import fornecedorService from '@/services/Fornecedor/fornecedorService'
import MarcaService from '@/services/Marca/MarcaService'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import { onMounted, ref, watch } from 'vue'
import produtoService from '@/Modules/Produto/Services/produtoService'
import type { IEstoque } from '@/Interfaces/Estoque/IEstoque'
import { useToast } from 'vue-toastification'
import type { ITable } from '@/Interfaces/Table/ITable'
import helpers from '@/helpers/helpers'

const service = estoqueService
const serviceMarca = MarcaService
const serviceFornecedor = fornecedorService
const serviceProduto = produtoService

const modal = ref()

const estoque = ref()
const marcas = ref()
const fornecedor = ref()
const produtos = ref()

const loading = ref<boolean>(true)
const change = ref<boolean>(false)
const toast = useToast()
const validado = ref<boolean>(false)
const help = helpers

const filtro = ref<IEstoqueFiltro>({} as IEstoqueFiltro)

const payload = ref<IEstoque>({} as IEstoque)

const colunas = ref<ITable[]>([
  {
    title: 'Produto',
    field: 'produtoNome',
    type: 'string'
  },
  {
    title: 'Quantidade movimentada',
    field: 'qtd_estoque',
    type: 'string'
  },
  {
    title: 'Total em estoque',
    field: 'total_estoque',
    type: 'string'
  },
  {
    title: 'Operação',
    field: 'tipo_operacao',
    type: 'string'
  },
  {
    title: 'Data de cadastro',
    field: 'data',
    type: 'date'
  },
  {
    title: 'Data de validade',
    field: 'data_validade',
    type: 'date'
  },
  {
    title: 'Lote',
    field: 'lote',
    type: 'string'
  },
  {
    title: 'Fornecedor',
    field: 'fornecedorNome',
    type: 'string'
  },
  {
    title: 'Marca',
    field: 'marcaNome',
    type: 'string'
  },
  {
    title: 'Observações',
    field: 'observacao',
    type: 'string'
  },
  {
    title: 'Ações',
    field: 'action',
    type: 'string',
    subActions: { edit: true }
  }
])

onMounted(async () => {
  loading.value = true
  getEstoque()
  marcas.value = await serviceMarca.getMarcas()
  fornecedor.value = await serviceFornecedor.getFornecedor()
  produtos.value = await serviceProduto.getProdutosNoPagination()
  loading.value = false
})

watch(
  () => payload.value,
  () => {
    validado.value = help.validadorPayload(payload.value, [
      'idproduto',
      'idfornecedor',
      'qtd_estoque',
      'lcz_estoque',
      'data_validade',
      'lote',
      'tipo_operacao'
    ])
  },
  { deep: true }
)

const getEstoque = async () => {
  loading.value = true
  await service.getEstoque(filtro.value).then((response) => {
    estoque.value = response
    loading.value = false
  })
}
const changePage = (newPage: number) => {
  filtro.value.page = newPage
  getEstoque()
}

const clearFilter = () => {
  filtro.value = {} as IEstoqueFiltro
  getEstoque()
}

const postEstoque = async () => {
  if (
    payload.value.tipo_operacao === 'saída' &&
    payload.value.qtd_estoque > payload.value.total_estoque
  ) {
    toast.warning('Quantida a ser movimentada maior que o estoque atual')

    return null
  }
  await service.postEstoque(payload.value).then(() => {
    toast.success('Estoque movimentado')
  })
}

const editEstoque = (id: number) => {
  change.value = true
  payload.value = { ...estoque.value.data.find((estoque: IEstoque) => estoque.id === id) }
  modalHandle()
}

const addEstoque = () => {
  change.value = false
  payload.value = {} as IEstoque
  modalHandle()
}

const modalHandle = () => {
  modal.value.modalHandle()
}
</script>
<style lang="scss" scoped>
.filtroWrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  column-gap: 10px;
  padding: 40px;
}

.modalWrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;
}
</style>
