<template>
  <v-text-field :type="type" :label="title" :variant="variant || 'outlined'"></v-text-field>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  type?: string
  variant?:
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
