<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import GalleryModal from '@/components/ui/GalleryModal.vue'

const images = ref([1, 2, 3, 4]) 
const selectedImage = ref(null)

const openModal = (img) => {
  selectedImage.value = img
}

const closeModal = () => {
  selectedImage.value = null
}
</script>

<template>
  <section class="gallery-section">
    <div class="container">
      <div class="header">
        <h2 class="title">Galeria de imagens</h2>
        <p class="subtitle">Conheça o que é contido na região do cemitério.</p>
      </div>

      <div class="grid">
        <div 
          v-for="(img, index) in images" 
          :key="index" 
          class="image-card"
          @click="openModal(img)"
        >
          </div>
      </div>

      <div class="actions">
        <BaseButton variant="primary">Ver tudo</BaseButton>
        <span class="separator">|</span>
        <BaseButton variant="secondary">Quero adicionar</BaseButton>
      </div>
    </div>

    <GalleryModal :is-open="!!selectedImage" @close="closeModal">
      <div class="large-image-placeholder" v-if="selectedImage">
        </div>
    </GalleryModal>
  </section>
</template>

<style scoped>
.gallery-section {
  background-color: var(--color-off-white);
  padding: 5rem 1rem;
  display: flex;
  justify-content: center;
}

.container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  color: var(--color-green);
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
}

.subtitle {
  color: var(--color-brown);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-bottom: 3rem;
}

.image-card {
  aspect-ratio: 1 / 1;
  background-color: var(--color-green);
  border-radius: 24px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.image-card:hover {
  transform: scale(1.02);
  opacity: 0.9;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.separator {
  color: #ccc;
  font-weight: 300;
}

.large-image-placeholder {
  width: 80vw;
  height: 80vh;
  background-color: var(--color-green);
  border-radius: 12px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .large-image-placeholder {
    width: 90vw;
    height: 50vh;
  }
}
</style>