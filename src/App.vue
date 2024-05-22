<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">Aboutgsdfgsd</RouterLink>
      </nav>
    </div>
  </header> -->

  <div class="wrap">
    <RouterView />
  </div>
</template>

<style scoped>
.wrap {
  height: 100vh;
  width: 100vw;
}
</style>
