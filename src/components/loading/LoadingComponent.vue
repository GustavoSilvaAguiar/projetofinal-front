<template>
  <div class="loadingWrap">
    <v-progress-circular color="primary" indeterminate :size="85" :width="9"></v-progress-circular>
  </div>
</template>
<style scoped lang="scss">
.loadingWrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
