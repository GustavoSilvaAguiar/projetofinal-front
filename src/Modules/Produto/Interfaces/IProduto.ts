import type { ICategoria } from '@/Interfaces/Categoria/ICategoria'
import type { IMarca } from '@/Interfaces/Marca/IMarca'

export interface IProduto {
  nome: string
  descricao: string
  id: number
  idcategoria: number
  idmarca: number
  idusuario: number
  preco_custo: number
  preco_venda: number
  und_medida: string
  data_cadastro: Date
  marca?: IMarca
  categoria?: ICategoria
}
