<script setup>
import BaseImage from '@/components/ui/BaseImage.vue'

defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  pdfUrl: { type: String, default: '' },
  docxUrl: { type: String, default: '' }
})
</script>

<template>
  <article class="export-card">
    
    <div class="card-preview">
      <BaseImage :src="image" :alt="title" />
    </div>

    <div class="card-content">
      
      <h3 class="card-title">{{ title }}</h3>

      <div class="action-bar">
        
        <a 
          v-if="pdfUrl" 
          :href="pdfUrl" 
          target="_blank" 
          download 
          class="action-btn pdf-btn"
        >
          <span class="icon">⬇</span> Baixar PDF
        </a>

        <a 
          v-if="docxUrl" 
          :href="docxUrl" 
          target="_blank" 
          download 
          class="action-btn docx-btn"
        >
          <span class="icon"></span> Baixar DOCX
        </a>

      </div>
    </div>
  </article>
</template>

<style scoped>
.export-card {
  background-color: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #eee;
  width: 100%;
}

.export-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border-color: var(--color-green);
}

.card-preview {
  width: 180px;
  flex-shrink: 0;
  background-color: #f4f4f4;
  position: relative;
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  margin: 0 0 1.5rem 0;
  color: var(--color-brown);
  font-family: var(--font-primary);
  font-size: 1.4rem;
  line-height: 1.3;
}

.action-bar {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  font-family: inherit;
}

.icon {
  font-size: 1.1rem;
}

.pdf-btn {
  background-color: var(--color-white);
  color: var(--color-green);
  border: 2px solid var(--color-green);
}

.pdf-btn:hover {
  background-color: var(--color-green);
  color: white;
}

.docx-btn {
  background-color: var(--color-white);
  color: #2196F3;
  border: 2px solid #2196F3;
}

.docx-btn:hover {
  background-color: #2196F3;
  color: white;
}

@media (max-width: 600px) {
  .export-card {
    flex-direction: column;
  }

  .card-preview {
    width: 100%;
    height: 160px;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .action-bar {
    flex-direction: column;
  }
  
  .action-btn {
    justify-content: center;
  }
}
</style>