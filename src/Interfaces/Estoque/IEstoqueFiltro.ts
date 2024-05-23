export interface IEstoqueFiltro {
  produto: string
  operacao: 'entrada' | 'saída'
  lote: string
  fornecedor: string | number
  marca: string | number
  data_cadastro_maior: string | Date
  data_cadastro_menor: string | Date
  data_validade_maior: string | Date
  data_validade_menor: string | Date
  page: number
}
