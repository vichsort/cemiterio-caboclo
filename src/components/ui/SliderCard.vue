<script setup>
import { ref, onMounted, nextTick } from 'vue'

defineProps({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
})

const contentRef = ref(null)
const isExpanded = ref(false)
const showReadMore = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(async () => {
  await nextTick()
  if (contentRef.value) {
    if (contentRef.value.scrollHeight > contentRef.value.clientHeight) {
      showReadMore.value = true
    }
  }
})
</script>

<template>
  <article class="slider-card">
    <div class="card-header">
      <span class="year-badge">{{ year }}</span>
      <div class="line"></div>
    </div>

    <div 
      class="text-container" 
      ref="contentRef"
      :class="{ 'collapsed': !isExpanded && showReadMore }"
    >
      <h3 class="title">{{ title }}</h3>
      <div class="description-wrapper">
        <p class="description">{{ description }}</p>
      </div>
    </div>

    <div v-if="showReadMore" class="expand-actions">
      <button @click="toggleExpand" class="btn-expand">
        <span v-if="!isExpanded">Ler mais ↓</span>
        <span v-else>Ler menos ↑</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.slider-card {
  flex: 0 0 100%; 
  width: 100%;
  background-color: var(--color-white);
  border-radius: 24px;
  padding: 2.5rem;

  scroll-snap-align: center;
  
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: fit-content;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.year-badge {
  background-color: var(--color-green);
  color: white;
  font-weight: 900;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1.2rem;
}

.line {
  flex-grow: 1;
  height: 2px;
  background-color: #eee;
}

.text-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  position: relative;
  transition: max-height 0.4s ease;
  max-height: none; 
}

.text-container.collapsed {
  max-height: 40dvh; 
  -webkit-mask-image: linear-gradient(180deg, black 60%, transparent 100%);
  mask-image: linear-gradient(180deg, black 60%, transparent 100%);
}

.title {
  font-size: 2rem;
  color: var(--color-brown);
  margin: 0;
  font-family: var(--font-primary);
  line-height: 1.2;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
  white-space: pre-line;
}

.expand-actions {
  display: flex;
  justify-content: center;
  margin-top: -1rem;
  z-index: 10;
}

.btn-expand {
  background: white;
  border: 1px solid var(--color-green);
  color: var(--color-green);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 -10px 20px rgba(255,255,255,0.8);
  transition: all 0.2s;
}

.btn-expand:hover {
  background-color: var(--color-green);
  color: white;
}

@media (max-width: 768px) {
  .slider-card {
    padding: 1.5rem;
  }
  .title {
    font-size: 1.6rem;
  }
}
</style>