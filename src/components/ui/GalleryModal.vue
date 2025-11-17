<script setup>
defineProps({
  isOpen: Boolean
})

defineEmits(['close'])
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="modal-backdrop" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  overflow: hidden;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>