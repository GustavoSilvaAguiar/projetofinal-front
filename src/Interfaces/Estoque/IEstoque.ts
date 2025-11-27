import type { IProduto } from '@/Modules/Produto/Interfaces/IProduto'

export interface IEstoque {
  idproduto: number
  idusuario: number
  idfornecedor: number
  observacao: string | null
  qtd_estoque: number
  lcz_estoque: string
  data_validade: string | Date
  total_estoque: number
  lote: string
  tipo_operacao: 'entrada' | 'saída'
  id: number
  produto: IProduto
  fornecedor: any
}
