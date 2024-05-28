<template>
  <div class="backgroundlogin">
    <div class="img"></div>
    <div class="cardWrap">
      <v-form v-model="form" class="card">
        <textField title="Login" variant="outlined" v-model="login"></textField>
        <textField type="password" title="Senha" variant="outlined" v-model="senha"></textField>
        <v-btn variant="tonal" @click="doLogin()"> Login </v-btn>
        <v-btn variant="tonal" color="primary" @click="doLogin()"> Cadastrar </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import textField from '@/components/inputs/textField.vue'
import { onMounted, ref } from 'vue'
import authService from '../../../services/Auth/authService'
import { useRouter } from 'vue-router'

const form = ref(false)
const service = authService
const login = ref<string>('')
const senha = ref<string>('')
const router = useRouter()

const doLogin = async () => {
  await service.login(login.value, senha.value).then(() => {
    router.push('/')
  })
}
</script>

<style scoped lang="scss">
.backgroundlogin {
  background-color: $primary;
  height: 100%;
  display: flex;

  .img {
    width: 50%;
    background-image: url('https://www.empreendedoras.net/wp-content/uploads/2023/08/Como-melhorar-a-gestao-de-estoque-de-alimentos-e-bebidas.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .cardWrap {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .card {
      min-width: 300px;
      background-color: $white;
      border-radius: 25px;
      padding: 64px;
    }
  }
}
</style>
