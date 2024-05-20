<template>teste de view {{ categorias }}</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import categoriaService from '../Services/categoriaService'

const categorias = ref()
onMounted(async () => {
  categorias.value = await categoriaService.getCategoria()
})
</script>
<style lang="scss" scoped></style>
