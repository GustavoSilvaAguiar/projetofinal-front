<template>
  <v-dialog v-model="dialog" persistent>
    <div class="modal">
      <div class="modalCard">
        <div class="header">
          {{ title }}
          <v-btn
            @click="modalHandle"
            icon="mdi-close"
            size="x-small"
            variant="tonal"
            color="primary"
          />
        </div>
        <v-divider />
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const dialog = ref<boolean>(false)

const modalHandle = () => {
  dialog.value = !dialog.value
}

defineExpose({ modalHandle })
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.modalCard {
  background-color: $white;
  width: fit-content;
  padding: 20px;
  border-radius: 25px;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 5px 10px 10px;
  }
  .content {
    padding: 10px;
  }
}
</style>
