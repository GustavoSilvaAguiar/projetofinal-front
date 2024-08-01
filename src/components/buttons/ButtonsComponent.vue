<template>
  <v-btn :icon="icon" :prepend-icon="prependIcon" :append-icon="appendIcon" :variant="variant" :color="color">
    <slot></slot>
    <v-icon v-if="icon" :icon="icon" />
  </v-btn>
</template>
<script setup lang="ts">
defineProps<{
  prependIcon?: string
  appendIcon?: string
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain' | undefined
  color?: string
  icon?: string
}>()
</script>
