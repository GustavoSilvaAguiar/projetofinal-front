import type { IContatoCadastro } from '../Contato/IContato'
import type { IFornecedor } from './IFornecedor'

export interface IFornecedorCadastro extends IFornecedor, IContatoCadastro {}
