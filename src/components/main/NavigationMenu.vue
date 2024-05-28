<template>
  <v-card>
    <v-layout class="teste">
      <!--  <v-app-bar color="#23A828" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar> -->

      <v-navigation-drawer color="primary" :rail="rail" permanent @click="rail = false">
        <!-- <v-list :items="items"></v-list> -->
        <v-list-item :title="user" nav>
          <template v-slot:append>
            <v-btn
              :icon="!rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>
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
        </v-list>

        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-account-cog"
            to="conta-config"
            title="Configuração de conta"
            value="configuracao-de-conta"
          ></v-list-item>
          <v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout" value="logout">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="contentWrap">
        <slot></slot>
        <!--  <v-card-text v-for="i in 100" :key="i">
          The navigation drawer will appear from the bottom on smaller size screens.
        </v-card-text> -->
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

const drawer = ref(true)
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
