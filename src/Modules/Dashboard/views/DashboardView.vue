<template>
  <div class="chartWrap">
    <LoadingComponent v-if="loading" />
    <BarChart v-if="!loading" :data="chartData" />
    <PieChart v-if="!loading2" :data="chartDataBestCategoria" />
  </div>
  <div class="button no-print">
    <ButtonsComponent @click="printWindow()" class="no-print" color="primary" icon="mdi-printer"></ButtonsComponent>
  </div>
</template>

<script setup lang="ts">
import ButtonsComponent from '@/components/buttons/ButtonsComponent.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import type { IDashboard, IDatasets } from '@/Interfaces/Dashboard/IDashboard'
import chartsService from '@/services/Charts/chartsService'
import { onMounted, ref } from 'vue'

const service = chartsService

const loading = ref<boolean>(true)
const loading2 = ref<boolean>(true)

const chartData = ref<IDashboard>({
  labels: [],
  datasets: []
})

const chartDataBestCategoria = ref<IDashboard>({
  labels: [],
  datasets: []
})

onMounted(async () => {
  loading.value = true
  await getBestSellers()
  await getBestCategorias()
})

const printWindow = () => {
  window.print()
}

const getBestCategorias = async () => {
  try {
    const response = await service.getBestCategorias()
    transformIndoChartDataBestCategorias(response)
    console.log('best categorai::', response)
    loading2.value = false
  } catch (error) {
    console.error('Error getBestCategorias: ', error)
  }
}

const getBestSellers = async () => {
  try {
    const response = await service.getBestSellers()
    transformIntoChartData(response)
    console.log('best chart::', response)
    loading.value = false
  } catch (error) {
    console.error('Error fetching best sellers:', error)
    loading.value = false
  }
}

const transformIndoChartDataBestCategorias = (
  data: { categoria_nome: string; total_vendas: string; categoria_id: number }[]
) => {
  const generateGreenShades = (numShades: number) => {
    const shades = []
    for (let i = 0; i < numShades; i++) {
      const shade = `hsl(${120}, ${100 - i * (100 / numShades)}%, 50%)`
      shades.push(shade)
    }
    return shades
  }

  const backgroundColors = generateGreenShades(data.length)

  chartDataBestCategoria.value.datasets[0] = {
    data: [],
    backgroundColor: backgroundColors
  }

  data.forEach((element) => {
    chartDataBestCategoria.value.labels.push(element.categoria_nome)
    chartDataBestCategoria.value.datasets[0].data.push(parseFloat(element.total_vendas))
  })
}

const transformIntoChartData = (data: { produto: string; valor: string }[]) => {
  const generateGreenShades = (numShades: number) => {
    const shades = []
    for (let i = 0; i < numShades; i++) {
      const shade = `hsl(${120}, ${100 - i * (100 / numShades)}%, 50%)`
      shades.push(shade)
    }
    return shades
  }

  const backgroundColors = generateGreenShades(data.length)

  chartData.value.datasets[0] = {
    label: 'Montante de venda',
    data: [],
    backgroundColor: backgroundColors
  }

  data.forEach((element) => {
    chartData.value.labels.push(element.produto)
    chartData.value.datasets[0].data.push(parseFloat(element.valor))
  })
}
</script>

<style lang="scss" scoped>
.chartWrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 50px;
  padding: 40px;
}

.button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  padding-right: 40px;
}
</style>
