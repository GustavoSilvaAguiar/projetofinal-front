export interface IDashboard {
  labels: string[]
  datasets: IDatasets[]
}
export interface IDatasets {
  label?: string
  data: number[]
  backgroundColor?: string[]
}
