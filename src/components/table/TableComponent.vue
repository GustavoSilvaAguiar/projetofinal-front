<template>
  <div class="tableWrap">
    <table>
      <thead>
        <tr>
          <th v-for="(coluna, index) in colunas" :key="index">{{ coluna.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="`${estoqueLow(row.total_estoque) ? 'estoqueLow' : ''} ${validateValidity(row.data_validade) ? 'validade' : ''} `"
          v-for="(row, index) in data"
          :key="index"
        >
          <td v-for="(coluna, index2) in colunas" :key="index2">
            <div
              v-if="
                coluna.field !== 'marca' &&
                coluna.field !== 'categoria' &&
                coluna.field !== 'action' &&
                coluna.field !== 'contato.telefone' &&
                coluna.field !== 'contato.email'
              "
            >
              {{ formatData(coluna.type, row[coluna.field]) }}
            </div>
            <div v-if="coluna.field === 'marca'">{{ row?.marca?.nome }}</div>
            <div v-if="coluna.field === 'categoria'">{{ row?.categoria?.nome }}</div>
            <div v-if="coluna.field === 'produtoNome'">{{ row?.produto?.nome }}</div>
            <div v-if="coluna.field === 'fornecedorNome'">{{ row?.fornecedor?.nome }}</div>
            <div v-if="coluna.field === 'marcaNome'">{{ row.produto?.marca?.nome }}</div>
            <div v-if="coluna.field === 'contato.telefone'">
              {{ `(${row?.contato?.ddd})${row.contato?.telefone}` }}
            </div>
            <div v-if="coluna.field === 'contato.email'">
              {{ row.contato?.email }}
            </div>
            <div v-if="coluna.field === 'action'" class="actions">
              <button v-if="coluna.subActions?.edit" @click="editarAction(row.id)">
                <v-icon size="small" icon="mdi-pencil" />
              </button>
              <button v-if="coluna.subActions?.details" @click="detail(row.id)">
                <v-icon size="small" icon="mdi-eye" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <v-pagination
      v-model="page"
      :length="paginationData?.last_page"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>
<script setup lang="ts">
import type { ITable } from '@/Interfaces/Table/ITable'
import { ref, watch } from 'vue'

const Props = defineProps<{
  colunas: Array<ITable>
  actions?: string[]
  paginationData?: any
  data: Array<{ [field: string]: any }>
}>()

const emit = defineEmits(['changePage', 'editAction', 'showDetail'])

const page = ref(Props.paginationData?.current_page)

watch(page, () => {
  emit('changePage', page.value)
})

const formatData = (type: string, data: any) => {
  switch (type) {
    case 'date':
      return formatDateToBrazilian(data)
    default:
      return data
  }
}

const editarAction = (id: string) => {
  emit('editAction', id)
}

const detail = (id: string) => {
  emit('showDetail', id)
}

function formatDateToBrazilian(dateString: string): string {
  const date = new Date(dateString)

  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Janeiro é 0!
  const year = date.getFullYear().toString()

  return `${day}/${month}/${year}`
}

function validateValidity(data: string) {
  let dataAtual = new Date()
  dataAtual.setHours(0, 0, 0, 0)

  const dataVencimento = new Date(data)

  return dataAtual > dataVencimento
}

const estoqueLow = (data: number) => {
  console.log('sdfasdf::', data)
  return data < 100
}
</script>
<style lang="scss" scoped>
.tableWrap {
  padding: 10px 40px 40px 40px;
  width: 100%;
  table {
    width: 100%;

    thead {
      border-radius: 10px 10px 0px 0px;
    }

    th {
      background-color: $primary;
      color: white;
      padding: 10px;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr:nth-child(odd) {
      background-color: #ffffff;
    }
    tr:hover {
      background-color: $primary;
      color: #ffffff;
    }
    td {
      padding: 3px;
    }
  }
}
.estoqueLow {
  background-color: #eef095 !important;
}
.estoqueLow:hover {
  color: orange !important;
}
.validade {
  background-color: #f8d7da !important;
}
.validade:hover {
  color: orangered !important;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
