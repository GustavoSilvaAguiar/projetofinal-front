<template>
  <p>
    {{ title }}: <strong>{{ content || 'Não informado' }}</strong>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  content?: string
}>()
</script>

<style lang="scss" scoped></style>
