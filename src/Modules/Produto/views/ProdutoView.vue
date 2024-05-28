<template>
  <div>
    <ButtonsComponent prependIcon="mdi-plus" color="primary" :onclick="modalHandle"
      >Adicionar Produto</ButtonsComponent
    >
    <div class="filterWrap">
      <TextField
        compact
        v-model="filter.nome"
        title="Pesquisar Produto"
        variant="outlined"
      ></TextField>
      <TextField
        type="number"
        v-model="filter.venda_maior"
        title="Preço de venda maior que:"
        variant="outlined"
      ></TextField>
      <TextField
        type="number"
        v-model="filter.venda_menor"
        title="Preço de venda menor que:"
        variant="outlined"
      ></TextField>
      <TextField
        type="number"
        v-model="filter.custo_maior"
        title="Preço de custo maior que:"
        variant="outlined"
      ></TextField>
      <TextField
        type="number"
        v-model="filter.custo_menor"
        title="Preço de custo menor que:"
        variant="outlined"
      ></TextField>
      <SelectField
        v-model="filter.marca"
        label="Marca"
        :itens="marcas"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <SelectField
        v-model="filter.categoria"
        label="Categoria"
        :itens="categorias"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <div>
        <ButtonsComponent prependIcon="mdi-filter" color="primary" :onclick="getProdutos"
          >Aplicar filtros</ButtonsComponent
        >
        <ButtonsComponent prependIcon="mdi-filter-off" :onclick="clearFilter" color="primary"
          >Limpar filtros</ButtonsComponent
        >
      </div>
    </div>
    <TableComponent
      v-if="loading"
      :pagination-data="response"
      :colunas="colunas"
      :data="produtos"
      @change-page="changePage"
      @edit-action="editProduto"
    ></TableComponent>
  </div>
  <LoadingComponent class="loading" v-if="!loading"></LoadingComponent>

  <ModalComponent :title="payload.id ? 'Editar Produto' : 'Adicionar Produto'" ref="modal">
    <div>
      <TextField compact v-model="payload.nome" title="Nome" variant="outlined" />
      <TextField compact v-model="payload.descricao" title="Descrição" variant="outlined" />
      <TextField compact v-model="payload.preco_custo" title="Preço de custo" variant="outlined" />
      <TextField compact v-model="payload.preco_venda" title="Preço de venda" variant="outlined" />
      <TextField
        compact
        v-model="payload.und_medida"
        title="Unidade de medida"
        variant="outlined"
      />
      <SelectField
        v-model="payload.idmarca"
        label="Marca"
        :itens="marcas"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <SelectField
        v-model="payload.idcategoria"
        label="Categoria"
        :itens="categorias"
        item-title="nome"
        item-value="id"
        variant="outlined"
      />
      <ButtonsComponent
        :prependIcon="payload.id ? 'mdi-pencil' : 'mdi-plus'"
        color="primary"
        :onclick="payload.id ? putProduto : postProduto"
        >{{ payload.id ? 'Editar Produto' : 'Adicionar Produto' }}</ButtonsComponent
      >
    </div>
  </ModalComponent>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import produtoService from '../Services/produtoService'
import TableComponent from '@/components/table/TableComponent.vue'
import TextField from '@/components/inputs/textField.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import ButtonsComponent from '@/components/buttons/ButtonsComponent.vue'
import SelectField from '@/components/inputs/selectField.vue'
import MarcaService from '@/services/Marca/MarcaService'
import categoriaService from '@/services/Categoria/categoriaService'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import type { IProduto } from '../Interfaces/IProduto'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'

const produtos = ref()
const response = ref()
const service = produtoService
const serviceMarca = MarcaService
const serviceCategoria = categoriaService
const loading = ref<boolean>(false)
const modal = ref()
const toast = useToast()
const useRouter = useRoute()

//filtros
interface IFiltro {
  nome: string
  custo_maior: string
  custo_menor: string
  venda_maior: string
  venda_menor: string
  marca: string | number
  categoria: string | number
  page: number
}
const filter = ref<IFiltro>({} as IFiltro)
const marcas = ref()
const categorias = ref()

const payload = ref<IProduto>({} as IProduto)

const colunas = ref<{ title: string; field: string; type: 'string' | 'date' | 'money' }[]>([
  {
    title: 'Produto',
    field: 'nome',
    type: 'string'
  },
  {
    title: 'Descrição',
    field: 'descricao',
    type: 'string'
  },
  {
    title: 'Preço Venda',
    field: 'preco_venda',
    type: 'money'
  },
  {
    title: 'Preço Custo',
    field: 'preco_custo',
    type: 'money'
  },
  {
    title: 'Marca',
    field: 'marca',
    type: 'string'
  },
  {
    title: 'Categoria',
    field: 'categoria',
    type: 'string'
  },
  {
    title: 'Unidade de medida',
    field: 'und_medida',
    type: 'string'
  },
  {
    title: 'Data de cadastro',
    field: 'data_cadastro',
    type: 'date'
  },
  {
    title: 'Ações',
    field: 'action',
    type: 'string'
  }
])

onMounted(async () => {
  useRouter.query.id ? (filter.value.categoria = useRouter.query.id.toString()) : ''
  await getProdutos()
  marcas.value = await serviceMarca.getMarcas()
  categorias.value = await serviceCategoria.getCategoria()

  loading.value = true
})

const getProdutos = async () => {
  loading.value = false
  response.value = await service.getProdutos(filter.value)
  produtos.value = response.value.data
  loading.value = true
}

const clearFilter = () => {
  filter.value = {} as IFiltro
  getProdutos()
}

const changePage = (newPage: number) => {
  filter.value.page = newPage
  getProdutos()
}

const editProduto = (id: number) => {
  modalHandle()
  payload.value = { ...produtos.value.find((produto: IProduto) => produto.id === id) }
}

const modalHandle = () => {
  clearPayload()
  modal.value.modalHandle()
}

const postProduto = async () => {
  await service
    .postProduto(payload.value)
    .then((response) => {
      console.log('resposta do post: ', response)
      toast.success('Produto criado com sucesso')
    })
    .finally(() => {
      clearPayload()
    })
}

const putProduto = async () => {
  console.log('editar')
  await service
    .putProduto(payload.value)
    .then(() => {
      toast.success('Produto editado com sucesso')
    })
    .finally(() => {
      clearPayload()
    })
}

const clearPayload = () => {
  payload.value = {} as IProduto
}
</script>
<style lang="scss" scoped>
.loading {
  margin-top: 100px;
}

.filterWrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  padding: 20px;
}
</style>
