<script setup>
import { ref, computed } from 'vue'

const timelineEvents = [
  {
    year: '1912',
    title: 'O Início do Conflito',
    description: 'Contexto histórico inicial da região e os primeiros movimentos que levaram à consolidação do espaço sagrado.',
    image: '/green.png' 
  },
  {
    year: '1935',
    title: 'A Consagração do Solo',
    description: 'Momento em que o espaço foi oficialmente delimitado pela comunidade local como um campo santo.',
    image: '/green.png'
  },
  {
    year: '1960',
    title: 'Preservação Cultural',
    description: 'Início dos esforços para manter as tradições e a memória dos que ali repousam, resistindo ao tempo.',
    image: '/green.png'
  },
  {
    year: '2024',
    title: 'O Reencontro',
    description: 'O projeto de revitalização e reconhecimento histórico dentro do campus do IFC Concórdia.',
    image: '/green.png'
  }
]

const currentIndex = ref(0)

const isFirst = computed(() => currentIndex.value === 0)
const isLast = computed(() => currentIndex.value === timelineEvents.length - 1)

const nextSlide = () => {
  if (!isLast.value) currentIndex.value++
}

const prevSlide = () => {
  if (!isFirst.value) currentIndex.value--
}

const goToSlide = (index) => {
  currentIndex.value = index
}
</script>

<template>
  <section class="timeline-section">
    <div class="header-content">
      <h2 class="section-title">Linha do Tempo</h2>
      <p class="section-subtitle">A trajetória histórica do Cemitério Caboclo</p>
    </div>

    <div class="carousel-container">
      
      <button 
        @click="prevSlide" 
        class="nav-btn prev" 
        :disabled="isFirst"
        aria-label="Ver evento anterior"
      >
        ←
      </button>

      <div class="viewport">
        <div 
          class="track" 
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <article 
            v-for="(event, index) in timelineEvents" 
            :key="index" 
            class="card"
            :class="{ active: index === currentIndex }"
          >
            <div class="timeline-marker">
              <span class="line left"></span>
              <div class="dot">{{ event.year }}</div>
              <span class="line right"></span>
            </div>

            <div class="card-content">
              <div class="image-wrapper">
                <img :src="event.image" :alt="event.title" class="event-image" />
              </div>
              
              <div class="text-content">
                <h3 class="event-title">{{ event.title }}</h3>
                <p class="event-description">{{ event.description }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <button 
        @click="nextSlide" 
        class="nav-btn next" 
        :disabled="isLast"
        aria-label="Ver próximo evento"
      >
        →
      </button>
    </div>

    <div class="pagination">
      <button 
        v-for="(_, index) in timelineEvents" 
        :key="'dot-'+index"
        class="dot-btn"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Ir para slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  padding: 4rem 1rem;
  background-color: var(--color-off-white);
  color: var(--color-black);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-content {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-brown);
  margin: 0 0 1rem 0;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--color-green);
  font-weight: 700;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  gap: 1rem;
  position: relative;
}

.nav-btn {
  background-color: transparent;
  border: 2px solid var(--color-green);
  color: var(--color-green);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-btn:hover:not(:disabled) {
  background-color: var(--color-green);
  color: var(--color-white);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.viewport {
  overflow: hidden;
  width: 100%;

  max-width: 700px; 
}

.track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  width: 100%;
}

.card {
  min-width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-marker {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
}

.line {
  flex: 1;
  height: 2px;
  background-color: var(--color-green);
  opacity: 0.3;
}

.dot {
  background-color: var(--color-green);
  color: var(--color-white);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 900;
  font-size: 1.2rem;
  margin: 0 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card-content {
  background: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  width: 100%;
  text-align: left;
}

.image-wrapper {
  width: 100%;
  height: 300px;
  background-color: var(--color-green);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--color-green); 
}

.text-content {
  padding: 2rem;
}

.event-title {
  font-size: 1.5rem;
  color: var(--color-brown);
  margin: 0 0 1rem 0;
}

.event-description {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: #555;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
}

.dot-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot-btn.active {
  background-color: var(--color-green);
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .carousel-container {
    gap: 0.2rem;
  }
  
  .nav-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    position: absolute;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  .nav-btn.prev { left: 0; }
  .nav-btn.next { right: 0; }

  .text-content {
    padding: 1.5rem;
  }
  
  .timeline-marker {
    margin-bottom: 1rem;
  }
}
</style>