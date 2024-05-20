<template>
  <v-text-field :label="title" :variant="variant"></v-text-field>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  variant:
    | 'underlined'
    | 'filled'
    | 'outlined'
    | 'plain'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'
    | undefined
}>()
</script>

<style lang="scss" scoped></style>
