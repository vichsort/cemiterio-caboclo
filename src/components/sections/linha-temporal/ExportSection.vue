<script setup>
import { ref, onMounted } from 'vue'
import ExportCard from '@/components/ui/ExportCard.vue'

// Estado dos dados
const exportItems = ref([])
const isLoading = ref(true)

// Busca os dados do JSON
const fetchData = async () => {
  try {
    const response = await fetch('/contents/export-timeline.json')
    if (!response.ok) throw new Error('Erro ao carregar downloads')
    exportItems.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <section class="export-section">
    <div class="container">
      
      <div class="header">
        <h2 class="section-title">Materiais para Download</h2>
        <p class="section-subtitle">
          Leve a história com você. Baixe a linha do tempo completa ou materiais de apoio.
        </p>
      </div>

      <div v-if="!isLoading && exportItems.length > 0" class="export-grid">
        <ExportCard 
          v-for="item in exportItems"
          :key="item.id"
          :image="item.image"
          :title="item.title"
          :pdf-url="item.pdfUrl"
          :docx-url="item.docxUrl"
        />
      </div>

      <div v-else-if="isLoading" class="loading-state">
        <p>Carregando materiais...</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.export-section {
  padding: 4rem 1rem;
  /* Uma cor levemente diferente para separar visualmente do slider anterior */
  background-color: var(--color-white); 
  border-top: 1px solid #eee;
}

.container {
  max-width: 1000px; /* Largura um pouco maior para caber 2 cards confortavelmente */
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-brown);
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  color: #666;
  font-size: 1.1rem;
}

/* --- GRID SYSTEM (2 Colunas) --- */
.export-grid {
  display: grid;
  /* Cria 2 colunas de tamanho igual */
  grid-template-columns: 1fr 1fr; 
  gap: 2rem;
  justify-items: center;
}

.loading-state {
  text-align: center;
  color: #999;
  padding: 2rem;
}

/* --- RESPONSIVIDADE --- */
@media (max-width: 768px) {
  .export-grid {
    /* Vira 1 coluna no mobile */
    grid-template-columns: 1fr; 
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>