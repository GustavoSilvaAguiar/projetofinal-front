<template>
  <div>
    <ButtonsComponent prependIcon="mdi-swap-vertical-bold" color="primary" :onclick="modalHandle"
      >Movimentar Estoque</ButtonsComponent
    >
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
      <ButtonsComponent @click="clearFilter" color="primary" prepend-icon="mdi-filter-off"
        >Limpar filtros</ButtonsComponent
      >
    </div>
    <TableComponent
      v-if="!loading"
      :colunas="colunas"
      :pagination-data="estoque"
      :data="estoque.data"
      @change-page="changePage"
      @edit-action="editProduto"
    />

    <LoadingComponent v-if="loading" />
  </div>

  <ModalComponent ref="modal" title="Movimentar estoque">
    <div class="modalWrap">
      <SelectField
        v-model="payload.idproduto"
        label="Produto"
        :itens="produtos"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <SelectField
        v-model="payload.idfornecedor"
        label="Fornecedor"
        :itens="fornecedor"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <SelectField
        v-model="payload.tipo_operacao"
        label="Operação"
        :itens="['entrada', 'saída']"
        variant="outlined"
      />
      <TextField
        v-model="payload.qtd_estoque"
        type="number"
        title="Quantidade movimentada"
        variant="outlined"
      />
      <TextField v-model="payload.lcz_estoque" title="Localização no estoque" variant="outlined" />
      <TextField
        type="date"
        v-model="payload.data_validade"
        title="Data de validade"
        variant="outlined"
      />
      <TextField v-model="payload.lote" title="Lote" variant="outlined" />
      <TextField v-model="payload.observacao" title="Observação" variant="outlined" />
    </div>
    <ButtonsComponent prependIcon="mdi-swap-vertical-bold" color="primary" :onclick="postEstoque"
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
import { onMounted, ref } from 'vue'
import produtoService from '@/Modules/Produto/Services/produtoService'
import type { IEstoque } from '@/Interfaces/Estoque/IEstoque'
import { useToast } from 'vue-toastification'

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

const filtro = ref<IEstoqueFiltro>({} as IEstoqueFiltro)

const payload = ref<IEstoque>({} as IEstoque)

const colunas = ref<{ title: string; field: string; type: 'string' | 'date' | 'money' }[]>([
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
  await service.postEstoque(payload.value).then((respnse) => {
    useToast().success('Estoque movimentado')
  })
}

const editProduto = (id: number) => {
  //modalHandle()
  //payload.value = { ...produtos.value.find((produto: IProduto) => produto.id === id) }
}

const modalHandle = () => {
  modal.value.modalHandle()
}
</script>
<style lang="scss" scoped>
.filtroWrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  padding: 20px;
}

.modalWrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;
}
</style>
