<template>
  <v-form class="formWrap" fast-fail @submit.prevent="submit">
    <TitleView title="Usuário" />
    <div class="contentWrap">
      <TextField v-model="payload.nome" title="Nome" :rules="[rules.required]" />
      <TextField v-model="payload.cpf" title="CPF" />
      <TextField v-model="payload.login" title="Login" />
      <TextField v-model="payload.senha" title="Senha" type="password" />
    </div>

    <TitleView title="Endereço" />
    <div class="contentWrap">
      <TextField v-model="payload.bairro" title="Bairro" />
      <TextField v-model="payload.rua" title="Rua" />
      <TextField v-model="payload.numero" title="Número" />
      <TextField v-model="payload.cep" title="CEP" />
      <SelectField
        v-model="payload.idcidade"
        variant="outlined"
        :itens="cidades"
        item-title="nome"
        item-value="id"
        label="Cidades"
      />
    </div>

    <TitleView title="Contato" />
    <div class="contentWrap">
      <TextField v-model="payload.ddd" title="DDD" style="max-width: 100px" counter-value="2" />
      <TextField v-model="payload.telefone" title="Telefone" />
      <TextField v-model="payload.email" title="Email" />
    </div>

    <ButtonsComponent :disabled="!validado" color="primary" type="submit" block>{{
      edit ? 'Editar' : 'Cadastrar'
    }}</ButtonsComponent>
  </v-form>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import SelectField from '../inputs/selectField.vue'
import TextField from '../inputs/textField.vue'
import TitleView from '../infoComponents/TitleView.vue'
import ButtonsComponent from '../buttons/ButtonsComponent.vue'
import type { ICadastro } from '@/Interfaces/User/ICadastro'
import cidadeService from '@/services/Cidade/cidadeService'
import userService from '@/services/User/userService'
import helpers from '@/helpers/helpers'

const props = defineProps<{
  edit: boolean
}>()

const serviceUser = userService
const serviceCidade = cidadeService
const cidades = ref()
const help = helpers
const validado = ref<boolean>(true)
const payload = ref<ICadastro>({} as ICadastro)

onMounted(async () => {
  cidades.value = await serviceCidade.getCidades()
  if (props.edit) {
    await serviceUser.getUser().then((response: any) => {
      const { endereco, contato, ...rest } = response
      payload.value = { ...rest, ...endereco, ...contato }
    })
  }
})

watch(
  () => payload.value,
  () => {
    validado.value = help.validadorPayload(
      payload.value,
      [
        'nome',
        'cpf',
        'bairro',
        'rua',
        'login',
        'senha',
        'numero',
        'cep',
        'idcidade',
        'telefone',
        'ddd'
      ],
      ['email']
    )
  },
  { deep: true }
)

const emit = defineEmits(['createUser', 'editUser'])

const submit = () => {
  !props.edit ? emit('createUser', payload.value) : emit('editUser', payload.value)
}

const rules = ref({
  required: (value: any) => !!value || 'Obrigatório'
})
</script>
<style lang="scss" scoped>
.formWrap {
  background-color: $white;
  padding: 40px;
  margin: 50px;
  border-radius: 20px;

  .contentWrap {
    display: flex;
    flex-wrap: nowrap;
    column-gap: 10px;
  }
}
</style>
