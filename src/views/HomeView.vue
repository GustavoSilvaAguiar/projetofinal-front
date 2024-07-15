<template>
  <NavigationMenu>
    <RouterView></RouterView>
  </NavigationMenu>
</template>
<script setup lang="ts">
import NavigationMenu from '@/components/main/NavigationMenu.vue'
import { useAuthStore } from '@/stores/authStore'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

onBeforeMount(() => {
  useAuthStore().token ? useRouter().push('/categoria') : useRouter().push('/login')
})
</script>
