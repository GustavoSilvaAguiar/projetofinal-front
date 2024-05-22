<template>
  <div class="tableWrap">
    <table>
      <thead>
        <tr>
          <th v-for="(coluna, index) in colunas" :key="index">{{ coluna.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="(coluna, index2) in colunas" :key="index2">
            <div
              v-if="
                coluna.field !== 'marca' &&
                coluna.field !== 'categoria' &&
                coluna.field !== 'action'
              "
            >
              {{ formatData(coluna.type, row[coluna.field]) }}
            </div>
            <div v-if="coluna.field === 'marca'">{{ row.marca.nome }}</div>
            <div v-if="coluna.field === 'categoria'">{{ row.categoria.nome }}</div>
            <div v-if="coluna.field === 'action'">
              <button @click="editarAction(row.id)">
                <v-icon size="small" icon="mdi-pencil" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <v-pagination
      v-model="page"
      :length="paginationData.last_page"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const Props = defineProps<{
  colunas: Array<{ title: string; field: string; type: 'string' | 'date' | 'money' }>
  actions?: string[]
  paginationData: any
  data: Array<{ [field: string]: any }>
}>()

const emit = defineEmits(['changePage', 'editAction'])

const page = ref(Props.paginationData.current_page)

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

function formatDateToBrazilian(dateString: string): string {
  const date = new Date(dateString)

  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Janeiro é 0!
  const year = date.getFullYear().toString()

  return `${day}/${month}/${year}`
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
</style>
