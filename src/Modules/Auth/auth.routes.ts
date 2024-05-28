export default [
  {
    path: '/login',
    component: () => import('./views/loginView.vue')
  },
  {
    path: '/cadastro',
    component: () => import('./views/cadastroView.vue')
  }
]
