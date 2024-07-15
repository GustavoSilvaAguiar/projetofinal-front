<template>
  <v-card>
    <v-layout class="teste">
      <v-navigation-drawer color="primary" :rail="rail" permanent @click="rail = false">
        <v-list-item :title="user" nav>
          <template v-slot:append>
            <v-btn
              :icon="!rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider opacity="30%"></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home"
            to="categoria"
            title="Categorias"
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-food"
            to="produto"
            title="Produtos"
            value="account"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-home-silo"
            to="estoque"
            title="Estoque"
            value="estoque"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-domain"
            to="marca-e-fornecedores"
            title="Marcas e Fornecedores"
            value="marca-e-fornecedores"
          ></v-list-item>

          <v-divider thickness="2" opacity="30%" style="margin-bottom: 5px"></v-divider>
          <v-list-item
            prepend-icon="mdi-account-cog"
            to="conta-config"
            title="Configuração de conta"
            value="configuracao-de-conta"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple-plus"
            to="cadastro"
            title="Cadastro de conta"
            value="cadastro-de-conta"
          ></v-list-item>
          <v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout" value="logout">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="contentWrap">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup lang="ts">
import authService from '@/services/Auth/authService'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const rail = ref(true)
const serviceAuth = authService
const user = useAuthStore().user.nome
const router = useRouter()

const logout = async () => {
  await serviceAuth.logout().then(() => {
    useToast().warning('Você foi deslogado')
    useAuthStore().logout()
    router.push('/login')
  })
}
</script>
<style scoped lang="scss">
.v-card--variant-elevated {
  box-shadow: none;
}
</style>
