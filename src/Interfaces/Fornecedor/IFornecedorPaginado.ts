import type { IFornecedor } from './IFornecedor'

export interface IFornecedorPaginado {
  current_page: number
  data: IFornecedor[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
  total: number
}
