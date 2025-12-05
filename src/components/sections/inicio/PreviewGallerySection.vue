<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseImage from '@/components/ui/BaseImage.vue'

const router = useRouter()

const imagesGlob = import.meta.glob('@/assets/gallery/*.{png,jpg,jpeg,webp}', { eager: true })

const previewImages = computed(() => {
  return Object.keys(imagesGlob)
    .slice(0, 4) 
    .map(path => {
       return imagesGlob[path].default
    })
})

const selectedImage = ref(null)

const openModal = (imgSrc) => {
  selectedImage.value = imgSrc
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedImage.value = null
  document.body.style.overflow = 'auto'
}

const goToGallery = () => {
  router.push('/gallery')
}

const goToContact = () => {
  router.push('') 
}
</script>

<template>
  <section class="gallery-preview-section">
    <div class="container">
      
      <div class="header">
        <h2 class="title">Galeria Histórica</h2>
        <p class="subtitle">Um vislumbre das memórias preservadas em nosso campo santo.</p>
      </div>

      <div class="grid">
        <div 
          v-for="(imgSrc, index) in previewImages" 
          :key="index" 
          class="image-card"
          @click="openModal(imgSrc)"
        >
          <BaseImage :src="imgSrc" alt="Prévia da galeria" />
          
        </div>
      </div>

      <div class="actions">
        <BaseButton variant="primary" @click="goToGallery">
          Ver galeria completa
        </BaseButton>
        
        <span class="separator">|</span>
        
        <BaseButton variant="secondary" @click="goToContact">
          Quero contribuir
        </BaseButton>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="selectedImage" class="modal-backdrop" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeModal">×</button>
          <img :src="selectedImage" alt="Visualização ampliada" />
        </div>
      </div>
    </Transition>

  </section>
</template>

<style scoped>
.gallery-preview-section {
  background-color: var(--color-off-white);
  padding: 6rem 1rem;
  position: relative;
}

.gallery-preview-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background-color: var(--color-green);
  opacity: 0.3;
  border-radius: 2px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
}

.title {
  color: var(--color-green);
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  font-weight: 900;
}

.subtitle {
  color: var(--color-brown);
  font-size: 1.1rem;
  line-height: 1.5;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 3rem;
}

.image-card {
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  background-color: #e0e0e0;
}

.image-card :deep(img) {
  transition: transform 0.4s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-card:hover :deep(img) {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon {
  font-size: 2rem;
  color: white;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.image-card:hover .overlay {
  opacity: 1;
}

.image-card:hover .icon {
  transform: translateY(0);
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.separator {
  color: #ccc;
  font-size: 1.5rem;
  font-weight: 300;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.modal-content img {
  max-width: 100%;
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
}

.close-btn {
  position: absolute;
  top: -40px;
  right: -10px;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- RESPONSIVE --- */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
    max-width: 300px;
  }

  .gallery-preview-section {
    padding: 4rem 1rem;
  }
  
  .separator {
    display: none;
  }
  
  .actions {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>