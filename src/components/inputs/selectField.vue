<template>
  <v-autocomplete
    chips
    :label="label"
    :items="itens"
    :item-title="itemTitle"
    :item-value="itemValue"
    :multiple="multiple"
    :variant="variant"
    :item-props="itemProps"
  ></v-autocomplete>
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
  itemProps?: any
  itens: Array<{}>
}>()
</script>
<style lang="scss" scoped></style>
