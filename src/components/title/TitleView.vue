<template>
  <div class="titleWrap">
    <h1>{{ title }}</h1>
    <v-divider opacity="100" color="primary" />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
<style scoped lang="scss">
.titleWrap {
  color: $primary;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
