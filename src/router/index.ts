import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authRoutes from '@/Modules/Auth/auth.routes'
import categoriaRoutes from '@/Modules/Categoria/categoria.routes'
import produtoRoutes from '@/Modules/Produto/produto.routes'
import estoqueRoutes from '@/Modules/Estoque/estoque.routes'
import marcasEFornecedoresRoutes from '@/Modules/Marcas_e_Forncedores/marcasEFornecedores.routes'
import configUserRoutes from '@/Modules/ConfigUser/configUser.routes'
import cadastroRoutes from '@/Modules/Cadastro/cadastro.routes'
import dashboardRoutes from '@/Modules/Dashboard/dasboard.routes'

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      ...categoriaRoutes,
      ...produtoRoutes,
      ...estoqueRoutes,
      ...marcasEFornecedoresRoutes,
      ...configUserRoutes,
      ...cadastroRoutes,
      ...dashboardRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
