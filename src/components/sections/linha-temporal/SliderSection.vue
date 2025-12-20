<script setup>
import { ref, onMounted } from 'vue'
import SliderCard from '@/components/ui/SliderCard.vue'

const timelineEvents = ref([])

const fetchData = async () => {
  try {
    const response = await fetch('/contents/timeline.json')
    if (!response.ok) throw new Error('Falha ao carregar dados')
    timelineEvents.value = await response.json()
  } catch (error) {
    console.error('Erro ao carregar timeline:', error)
  }
}

const scrollContainer = ref(null)
const activeIndex = ref(0)

const scrollToSlide = (index) => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const cardWidth = container.offsetWidth
  container.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
}

const nextSlide = () => {
  if (activeIndex.value < timelineEvents.value.length - 1) {
    scrollToSlide(activeIndex.value + 1)
  }
}

const prevSlide = () => {
  if (activeIndex.value > 0) {
    scrollToSlide(activeIndex.value - 1)
  }
}

const handleScroll = () => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const index = Math.round(container.scrollLeft / container.offsetWidth)
  
  if (index !== activeIndex.value) {
    activeIndex.value = index
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <section class="slider-section">
    <div class="container">
      
      <div class="header">
      <h2 class="section-title">Linha do Tempo</h2>
      <p class="section-subtitle">A trajetória histórica do Coronel Fragoso</p>
        <p class="swipe-hint">← Deslize para navegar →</p>
      </div>

      <div 
        v-if="timelineEvents.length > 0" 
        class="slider-track" 
        ref="scrollContainer"
        @scroll.passive="handleScroll"
      >
        <SliderCard 
          v-for="(event, index) in timelineEvents" 
          :key="index"
          :year="event.year"
          :title="event.title"
          :description="event.description"
        />
      </div>
      
      <div v-else class="loading-state">
        <p>Carregando linha do tempo...</p>
      </div>

      <div class="controls-area" v-if="timelineEvents.length > 0">
        <button 
          class="nav-btn prev" 
          @click="prevSlide" 
          :disabled="activeIndex === 0"
        >←</button>

        <div class="dots-container">
          <button 
            v-for="(_, index) in timelineEvents" 
            :key="index"
            class="dot"
            :class="{ active: index === activeIndex }"
            @click="scrollToSlide(index)"
          ></button>
        </div>

        <button 
          class="nav-btn next" 
          @click="nextSlide" 
          :disabled="activeIndex === timelineEvents.length - 1"
        >→</button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.slider-section {
  padding: 4rem 1rem;
  background-color: var(--color-off-white);
  display: flex;
  justify-content: center;
}

.container {
  max-width: 800px;
  width: 100%;
  overflow: hidden; 
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-brown);
  margin: 0;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--color-green);
  font-weight: 700;
}

.swipe-hint {
  display: none;
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.5rem;
  animation: pulse 2s infinite;
}

.loading-state {
  text-align: center;
  color: #888;
  padding: 3rem;
  font-style: italic;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.slider-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory; 
  scroll-behavior: smooth;
  gap: 0; 
  padding-bottom: 1rem;
  scrollbar-width: none;
}

.slider-track::-webkit-scrollbar { display: none; }

.controls-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.nav-btn {
  background: transparent;
  border: 2px solid var(--color-brown);
  color: var(--color-brown);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background-color: var(--color-brown);
  color: white;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.dots-container { display: flex; gap: 0.8rem; }

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background-color: var(--color-green);
  transform: scale(1.3);
}

@media (max-width: 768px) {
  .controls-area { display: none; }
  .swipe-hint { display: block; }
  .slider-section { padding: 2rem 1rem; }
}
</style>