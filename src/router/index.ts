import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../Modules/Auth/views/loginView.vue'
import authRoutes from '@/Modules/Auth/auth.routes'
import categoriaRoutes from '@/Modules/Categoria/categoria.routes'
import produtoRoutes from '@/Modules/Produto/produto.routes'

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [...categoriaRoutes, ...produtoRoutes]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
