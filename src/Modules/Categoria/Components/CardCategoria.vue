<template>
  <div class="cardWrap">
    <div :style="`background-image: url(${data.img});`" class="background"></div>
    <!-- <img :src="data.img ? data.img : ''" /> -->
    {{ data.nome }}
  </div>
</template>
<script setup lang="ts">
import type { ICategoria } from '@/Interfaces/Categoria/ICategoria'

defineProps<{
  data: ICategoria
}>()
</script>
<style scoped lang="scss">
.cardWrap {
  background-color: $primary;
  border: 1px solid $primary;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 200px;
  color: white;

  .background {
    width: 100%;
    height: 100%;
    border-radius: 20px 20px 0px 0px;
    background-repeat: no-repeat;
    background-size: cover;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px 20px 0px 0px;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
