<template><div>das hfghdf dasd</div></template>

<script setup lang="ts">
import apiCore from '@/services/api'
import { onMounted } from 'vue'

const makelogin = async () => {
  const response = await apiCore.post('login', {
    login: 'gustavo.teste@teste.com',
    senha: '987.456.184-88',
    device_name: 'Front teste'
  })
  return response.data.token
}

onMounted(async () => {
  console.log(await makelogin())
})
</script>

<style scoped lang="scss"></style>
