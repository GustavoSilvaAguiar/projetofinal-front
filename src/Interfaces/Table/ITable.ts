export interface ITable {
  title: string
  field: string
  type: 'string' | 'date' | 'money'
  subActions?: {
    edit?: boolean
    details?: boolean
  }
}
