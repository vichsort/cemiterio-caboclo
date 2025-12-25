<script setup>
import { ref, computed, onMounted } from 'vue'
import CultureCard from '@/components/ui/CultureCard.vue'

const thumbsGlob = import.meta.glob('@/assets/gallery/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  query: { w: 400, format: 'webp', q: 60 } 
})

const fullGlob = import.meta.glob('@/assets/gallery/*.{png,jpg,jpeg,webp}', { 
  eager: true, 
  query: '?url',
  import: 'default'
})

const getImages = (filename) => {
  if (!filename) return { thumb: null, full: null }

  const thumbKey = Object.keys(thumbsGlob).find(key => key.includes(filename))
  const fullKey = Object.keys(fullGlob).find(key => key.includes(filename))

  return {
    thumb: thumbKey ? thumbsGlob[thumbKey].default : null,
    full: fullKey ? fullGlob[fullKey] : null
  }
}

const cultureTopics = ref([])
const isLoading = ref(true)

const fetchData = async () => {
  try {
    const response = await fetch('/contents/culture.json')
    if (!response.ok) throw new Error('Erro ao carregar tópicos de cultura')
    cultureTopics.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const processedTopics = computed(() => {
  return cultureTopics.value.map(topic => {
    const images = getImages(topic.image)

    return {
      ...topic,
      thumbUrl: images.thumb || '/green.png',
      fullUrl: images.full || '/green.png'
    }
  })
})

const selectedTopic = ref(null)

const openModal = (topic) => {
  selectedTopic.value = topic
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedTopic.value = null
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <section class="culture-page">
    <div class="header-content">
      <h1 class="page-title">Cultura e Tradição</h1>
      <p class="page-subtitle">Conheça os pilares que sustentam a história e a identidade do povo caboclo.</p>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Carregando histórias...</p>
    </div>

    <div v-else class="cards-grid">
      <CultureCard v-for="(topic, index) in processedTopics" :key="index" :image="topic.thumbUrl" :title="topic.title"
        :description="topic.description" @open="openModal(topic)" />
    </div>

    <Transition name="fade">
      <div v-if="selectedTopic" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-container">
          <button class="close-btn" @click="closeModal">×</button>

          <div class="modal-header">
            <div class="modal-image-box">
              <img :src="selectedTopic.fullUrl" :alt="selectedTopic.title" />
            </div>
            <h2 class="modal-title">{{ selectedTopic.title }}</h2>
          </div>

          <div class="modal-body">
            <div class="text-content">
              <p v-for="(paragraph, index) in selectedTopic.content.split('\n\n')" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </section>
</template>

<style scoped>
.culture-page {
  padding: 4rem 1rem;
  background-color: var(--color-off-white);
  min-height: 100vh;
}

.header-content {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3rem;
  color: var(--color-brown);
}

.page-subtitle {
  color: #666;
}

.loading-state {
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 3rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-container {
  background-color: var(--color-white);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-black);
}

.modal-header {
  position: relative;
}

.modal-image-box {
  width: 100%;
  height: 300px;
  background-color: #eee;
}

.modal-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-title {
  padding: 1.5rem 2rem 0.5rem 2rem;
  margin: 0;
  font-size: 2rem;
  color: var(--color-brown);
  background-color: var(--color-white);
}

.modal-body {
  padding: 0 2rem 2rem 2rem;
  overflow-y: auto;
  flex-grow: 1;
}

.text-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
}

.text-content :deep(p) {
  margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-backdrop {
    padding: 0;
  }

  .modal-image-box {
    height: 200px;
  }

  .modal-title {
    font-size: 1.5rem;
    padding: 1rem 1rem 0.5rem 1rem;
  }

  .modal-body {
    padding: 0 1rem 1rem 1rem;
  }
}
</style>