import type { IMarca } from './IMarca'

export interface IMarcaPaginado {
  current_page: number
  data: IMarca[]
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
