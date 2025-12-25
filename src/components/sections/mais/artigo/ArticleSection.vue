<script setup>
import { ref, onMounted } from 'vue'
import ArticleCard from '@/components/ui/ArticleCard.vue'

// Estado dos artigos
const articles = ref([])
const isLoading = ref(true)

// --- FETCH DATA ---
const fetchData = async () => {
  try {
    const response = await fetch('/contents/articles.json')
    if (!response.ok) throw new Error('Erro ao carregar artigos')
    articles.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// --- LOGICA MODAL DE CITAÇÃO ---
const isModalOpen = ref(false)
const activeCitationData = ref(null)
const activeTab = ref('ABNT')
const copyFeedback = ref(false)

const openCitationModal = (citationData) => {
  activeCitationData.value = citationData
  activeTab.value = 'ABNT'
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    activeCitationData.value = null
    copyFeedback.value = false
  }, 300)
  document.body.style.overflow = 'auto'
}

const copyToClipboard = async () => {
  if (!activeCitationData.value) return
  
  const textToCopy = activeCitationData.value[activeTab.value]
  
  try {
    await navigator.clipboard.writeText(textToCopy)
    copyFeedback.value = true
    setTimeout(() => copyFeedback.value = false, 2000)
  } catch (err) {
    console.error('Falha ao copiar', err)
  }
}

// Inicializa
onMounted(() => {
  fetchData()
})
</script>

<template>
  <section class="articles-page">
    <div class="header-content">
      <h1 class="page-title">Produção Acadêmica</h1>
      <p class="page-subtitle">
        Artigos, teses e materiais educativos desenvolvidos sobre o Cemitério Caboclo e a região.
      </p>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Carregando produções acadêmicas...</p>
    </div>

    <div v-else class="articles-list">
      <ArticleCard 
        v-for="article in articles"
        :key="article.id"
        :image="article.image"
        :title="article.title"
        :date="article.date"
        :authors="article.authors"
        :resume="article.resume"
        :pdf-url="article.pdfUrl"
        :citation-data="article.citations"
        @open-cite-modal="openCitationModal"
      />
    </div>

    <Transition name="fade">
      <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">×</button>
          
          <h2 class="modal-title">Citar este trabalho</h2>
          <p class="modal-desc">Selecione o formato desejado:</p>

          <div class="tabs-header">
            <button 
              v-for="(text, type) in activeCitationData" 
              :key="type"
              class="tab-btn"
              :class="{ active: activeTab === type }"
              @click="activeTab = type; copyFeedback = false"
            >
              {{ type }}
            </button>
          </div>

          <div class="citation-box">
            <p class="citation-text">
              {{ activeCitationData[activeTab] }}
            </p>
          </div>

          <button class="copy-btn" @click="copyToClipboard" :class="{ copied: copyFeedback }">
            <span v-if="!copyFeedback">Copiar Citação</span>
            <span v-else>Copiado!</span>
          </button>

        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.articles-page {
  padding: 4rem 1rem;
  background-color: var(--color-off-white);
  min-height: 100vh;
}

.header-content {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.page-title {
  font-size: 2.5rem;
  color: var(--color-brown);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #666;
  font-size: 1.1rem;
}

.articles-list {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-content {
  background-color: var(--color-white);
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.modal-title {
  color: var(--color-green);
  margin: 0 0 0.5rem 0;
}

.modal-desc {
  color: #666;
  margin-bottom: 1.5rem;
}

/* --- TABS SYSTEM --- */
.tabs-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0;
  border-bottom: 2px solid #eee;
}

.tab-btn {
  background: none;
  border: none;
  padding: 0.8rem 1.5rem;
  font-family: var(--font-primary);
  font-weight: 700;
  color: #888;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--color-green);
  background-color: #f9fdf9;
}

.tab-btn.active {
  color: var(--color-green);
  border-bottom: 2px solid var(--color-green);
}

.citation-box {
  background-color: #f4f4f4;
  padding: 1.5rem;
  border-radius: 0 8px 8px 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #eee;
}

.citation-text {
  font-family: 'Courier New', Courier, monospace;
  color: #333;
  margin: 0;
  line-height: 1.4;
  word-break: break-word;
  font-size: 0.9rem;
}

.copy-btn {
  align-self: flex-end;
  background-color: var(--color-brown);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.copy-btn:hover {
  background-color: #5a5046;
}

.copy-btn.copied {
  background-color: var(--color-green);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>