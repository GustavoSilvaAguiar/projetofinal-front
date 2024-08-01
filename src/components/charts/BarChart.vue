<template>
  <div class="chartwrap">
    <TitleView title="Relação 10 maiores montantes de venda em 6 meses: Produtos" />
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartData
} from 'chart.js'
import TitleView from '../infoComponents/TitleView.vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  data: ChartData<'bar', number[], unknown>
}>()

/* const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12], backgroundColor: ['#77CEFF', '#0079AF'] }]
}) */

const chartData = ref<ChartData<'bar', number[], unknown>>(props.data)
const chartOptions = ref({
  responsive: true
})
</script>
<style lang="scss" scoped>
.chartwrap {
  width:100%;
  height: 100%;
}
</style>
