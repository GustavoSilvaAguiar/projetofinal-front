<template>
  <v-select
    chips
    :label="label"
    :items="itens"
    :item-title="itemTitle"
    :item-value="itemValue"
    :multiple="multiple"
    :variant="variant"
  ></v-select>
</template>
<script setup lang="ts">
defineProps<{
  multiple?: boolean
  variant?:
    | 'underlined'
    | 'filled'
    | 'outlined'
    | 'plain'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'
    | undefined
  label: string
  itemTitle?: string
  itemValue?: string
  itens: Array<{}>
}>()
</script>
<style lang="scss" scoped></style>
