<script setup>
import { ref, computed } from 'vue'
import BaseImage from '@/components/ui/BaseImage.vue'

const props = defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  authors: { type: Array, required: true }, 
  resume: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  citationData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['open-cite-modal'])

const showResume = ref(false)

const toggleResume = () => {
  showResume.value = !showResume.value
}

const formattedAuthors = computed(() => {
  return props.authors.join('; ')
})
</script>

<template>
  <article class="article-card">
    
    <div class="card-preview">
      <BaseImage :src="image" :alt="title" />
    </div>

    <div class="card-content">
      
      <div class="card-header">
        <span class="publish-date">Publicado em: {{ date }}</span>
        <h3 class="article-title">{{ title }}</h3>
        <p class="article-authors">{{ formattedAuthors }}</p>
      </div>

      <div class="action-bar">
        
        <button 
          class="action-btn text-btn" 
          @click="toggleResume"
          :class="{ 'active': showResume }"
        >
          <span class="icon"></span> 
          {{ showResume ? 'Ocultar Resumo' : 'Ler Resumo' }}
        </button>

        <a :href="pdfUrl" target="_blank" class="action-btn download-btn">
          <span class="icon">⬇</span> Download PDF
        </a>

        <button 
          class="action-btn cite-btn" 
          @click="$emit('open-cite-modal', citationData)"
        >
          <span class="icon">❝</span> Citar
        </button>
      </div>

      <Transition name="expand">
        <div v-if="showResume" class="resume-container">
          <hr class="divider">
          <p class="resume-text">{{ resume }}</p>
        </div>
      </Transition>

    </div>
  </article>
</template>

<style scoped>
.article-card {
  background-color: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #eee;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border-color: var(--color-green);
}

.card-preview {
  width: 200px;
  flex-shrink: 0;
  background-color: #f4f4f4;
  position: relative;
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; 
}

.card-header {
  margin-bottom: 1rem;
}

.publish-date {
  font-size: 0.85rem;
  color: #888;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.article-title {
  margin: 0.5rem 0;
  color: var(--color-brown);
  font-family: var(--font-primary);
  font-size: 1.4rem;
  line-height: 1.3;
}

.article-authors {
  color: #666;
  font-size: 0.95rem;
  margin: 0;
  font-style: italic;
}

.action-bar {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: auto;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  font-family: inherit;
  white-space: nowrap;
  flex: 1 1 auto;
  max-width: 100%;
}

.icon {
  font-size: 1.1rem;
}

.text-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #555;
  padding-left: 0;
  flex-grow: 0; 
  margin-right: auto;
}

.text-btn:hover, .text-btn.active {
  color: var(--color-brown);
}

.download-btn {
  background-color: var(--color-green);
  color: white;
  border: 1px solid var(--color-green);
}

.download-btn:hover {
  background-color: #65a857;
  transform: translateY(-1px);
}

.cite-btn {
  background-color: transparent;
  border: 1px solid var(--color-brown);
  color: var(--color-brown);
}

.cite-btn:hover {
  background-color: var(--color-brown);
  color: white;
}

.resume-container {
  margin-top: 1rem;
  overflow: hidden;
  width: 100%;
}

.divider {
  border: 0;
  height: 1px;
  background-color: #eee;
  margin-bottom: 1rem;
}

.resume-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
  text-align: justify;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-out;
  max-height: 300px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .article-card {
    flex-direction: column;
  }

  .card-preview {
    width: 100%;
    height: 180px;
  }

  .action-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }
  
  .action-btn {
    padding-left: 1rem;
  }

  .text-btn {
    margin-right: 0;
    border: 1px solid #eee;
    justify-content: center;
  }
  
  .download-btn, .cite-btn {
    border: 1px solid var(--color-green);
  }
}
</style>