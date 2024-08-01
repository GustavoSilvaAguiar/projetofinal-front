<template>
  <div class="chartwrap">
    <TitleView title="Relaçao volume de vendas em 6 meses: Categorias"/>
    <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js'
import TitleView from '../infoComponents/TitleView.vue';

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  data: ChartData<'pie', number[], unknown>
}>()

/* const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12], backgroundColor: ['#77CEFF', '#0079AF'] }]
}) */

const chartData = ref<ChartData<'pie', number[], unknown>>(props.data)
const chartOptions = ref({
  responsive: true
})
</script>
<style lang="scss" scoped>
.chartwrap {
  width: 100%;
  height: 100%;
}
</style>
