<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  eager: { type: Boolean, default: false }
})

const isLoaded = ref(false)

const onImageLoad = () => {
  isLoaded.value = true
}
</script>

<template>
  <div class="image-wrapper" :class="{ 'loaded': isLoaded }">
    <img 
      :src="src" 
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      @load="onImageLoad"
      class="base-img"
    />
    
    <div v-if="!isLoaded" class="skeleton"></div>
  </div>
</template>

<style scoped>
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
}

.base-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.loaded .base-img {
  opacity: 1;
}

.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  z-index: 1;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>