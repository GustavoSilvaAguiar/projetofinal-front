<template>
  <LoadingComponent v-if="loading" />
  <div v-if="!loading" class="modalWrap">
    <TitleView title="Produto" />
    <InfoView title="Nome" :content="produtoInfo.nome" />
    <InfoView title="Unidade de medida" :content="produtoInfo.und_medida" />
    <InfoView title="Preço de custo" :content="produtoInfo.preco_custo?.toString()" />
    <InfoView title="Preço de venda" :content="produtoInfo.preco_venda?.toString()" />
    <InfoView title="Descrição" :content="produtoInfo.descricao" />
    <InfoView title="Categoria" :content="produtoInfo.categoria?.nome" />
    <InfoView title="Marca" :content="produtoInfo.marca?.nome" />
    <br />
    <div v-if="createOrEdit">
      <TitleView title="Informação Nutricional" />
      <InfoView title="Porção" :content="infoNutricional?.porcao?.toString()" />
      <InfoView title="Unidade de medida" :content="infoNutricional?.unidade_medida" />
      <InfoView title="Calorias" :content="infoNutricional?.calorias" />
      <InfoView title="Gorduras totais" :content="infoNutricional?.gorduras" />
      <InfoView title="Carboidratos" :content="infoNutricional?.carboidratos" />
      <InfoView title="Proteínas" :content="infoNutricional?.proteinas" />
      <InfoView title="Ingredientes" :content="formatarCampo(infoNutricional?.ingredientes)" />
      <InfoView title="Alergênicos" :content="formatarCampo(infoNutricional?.alergenicos)" />
    </div>

    <div v-if="!createOrEdit">
      <TextField title="Porção" v-model="infoNutricional.porcao" />
      <TextField title="Unidade de medida" v-model="infoNutricional.unidade_medida" />
      <TextField title="Calorias" v-model="infoNutricional.calorias" />
      <TextField title="Gorduras totais" v-model="infoNutricional.gorduras" />
      <TextField title="Carboidratos" v-model="infoNutricional.carboidratos" />
      <TextField title="Proteínas" v-model="infoNutricional.proteinas" />
      <TextField title="Ingredientes" v-model="infoNutricional.ingredientes" />
      <TextField title="Alergênicos" v-model="infoNutricional.alergenicos" />
    </div>
    <ButtonsComponent
      color="warning"
      :disabled="!validado"
      v-if="!createOrEdit && infoNutricional.id"
      @click="addInfoNutricional"
      >Editar Informação Nutricional</ButtonsComponent
    >
    <ButtonsComponent
      v-if="infoNutricional.id && createOrEdit"
      @click="createOrEdit = !createOrEdit"
      color="primary"
      >Editar Informação Nutricional</ButtonsComponent
    >
    <ButtonsComponent
      :disabled="!validado"
      color="primary"
      v-if="!infoNutricional.id"
      @click="addInfoNutricional"
      >Adicionar Informação Nutricional</ButtonsComponent
    >
  </div>
</template>

<script setup lang="ts">
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import TitleView from '@/components/infoComponents/TitleView.vue'
import { onMounted, ref, watch } from 'vue'
import produtoService from '../Services/produtoService'
import InfoView from '@/components/infoComponents/InfoView.vue'
import type { IProduto } from '../Interfaces/IProduto'
import type { IInfoNutricional } from '../Interfaces/IInfoNutricional'
import ButtonsComponent from '@/components/buttons/ButtonsComponent.vue'
import TextField from '@/components/inputs/textField.vue'
import { useToast } from 'vue-toastification'
import helpers from '@/helpers/helpers'

const loading = ref<boolean>(true)
const serviceProduto = produtoService
const produtoInfo = ref<IProduto>({} as IProduto)
const infoNutricional = ref<IInfoNutricional>({} as IInfoNutricional)
const validado = ref<boolean>(false)
const help = helpers

const createOrEdit = ref<boolean>(false)

const props = defineProps<{
  id: string
}>()

onMounted(() => {
  getProdutoDetail(props.id)
})

watch(
  () => infoNutricional.value,
  () => {
    validado.value = help.validadorPayload(infoNutricional.value, [
      'porcao',
      'unidade_medida',
      'alergenicos',
      'ingredientes',
      'calorias',
      'gorduras',
      'carboidratos',
      'proteinas'
    ])
  },
  { deep: true }
)

const getProdutoDetail = async (id: string) => {
  await serviceProduto
    .getProdutoDetail(id)
    .then(async (response: any) => {
      produtoInfo.value = response
      await serviceProduto.getInfoNutricional(id).then((response: any) => {
        infoNutricional.value = response
        createOrEdit.value = true
        loading.value = false
      })
    })
    .finally(() => {
      loading.value = false
    })
}
const formatarCampo = (data?: string) => {
  return data?.replace(/["'{}[\]]/g, '').replace(/,(\S)/g, ', $1') || ''
}

const addInfoNutricional = async () => {
  infoNutricional.value.idproduto = parseInt(props.id)
  infoNutricional.value.alergenicos = infoNutricional.value.alergenicos
    ? `{${infoNutricional.value.alergenicos}}`
    : ''
  infoNutricional.value.ingredientes = `{${infoNutricional.value.ingredientes}}`
  infoNutricional.value.id
    ? await serviceProduto.putInfoNutricional(infoNutricional.value).then(() => {
        useToast().success('Informação nutricional atualizada')
      })
    : await serviceProduto.postInfoNutricional(infoNutricional.value).then(() => {
        useToast().success('Informação nutricional cadastrada')
      })
}
</script>

<style lang="scss" scoped>
.modalWrap {
  overflow: auto;
  max-height: 70vh;
}
</style>
