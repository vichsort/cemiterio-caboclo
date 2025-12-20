<script setup>
import { ref } from 'vue'
import ArticleCard from '@/components/ui/ArticleCard.vue'

const articles = [
  {
    id: 1,
    image: '/images/articles/portolan.png',
    title: 'Cemitério Caboclo: Resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC',
    date: '22/06/2022',
    authors: [
      'Ana Carolina Maltauro',
      'Stefanie Caroline Bevilaqua',
      'Alessandra Portolan'
    ],
    resume: '', // Conteúdo a ser preenchido futuramente
    pdfUrl: '/files/portolan.pdf',
    citations: {
      ABNT: 'MALTAURO, A. C.; BEVILAQUA, S. C.; PORTOLAN, A. Cemitério Caboclo: Resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC. Instituto Federal Catarinense, 2022.',
      APA: 'Maltauro, A. C., Bevilaqua, S. C., & Portolan, A. (2022). Cemitério Caboclo: Resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC.',
      BibTeX: '@misc{maltauro2022cemiterio, title={Cemitério Caboclo: Resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC}, author={Maltauro, Ana Carolina and Bevilaqua, Stefanie Caroline and Portolan, Alessandra}, year={2022}}'
    }
  },
  {
    id: 2,
    image: '/images/articles/silvia.png',
    title: 'Cemitério Caboclo: Resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC',
    date: '21/06/2022',
    authors: [
      'Ana Carolina Maltauro',
      'Gustavo Daniel Riffel König',
      'Sílvia Fernanda Souza Dalla Costa'
    ],
    resume: '', // Conteúdo a ser preenchido futuramente
    pdfUrl: '/files/silvia.pdf',
    citations: {
      ABNT: 'MALTAURO, A. C.; KÖNIG, G. D. R.; DALLA COSTA, S. F. S. Cemitério Caboclo: Resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC. Instituto Federal Catarinense, 2022.',
      APA: 'Maltauro, A. C., König, G. D. R., & Dalla Costa, S. F. S. (2022). Cemitério Caboclo: Resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC.',
      BibTeX: '@misc{maltauro2022cemiterio2, title={Cemitério Caboclo: Resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC}, author={Maltauro, Ana Carolina and König, Gustavo Daniel Riffel and Dalla Costa, Sílvia Fernanda Souza}, year={2022}}'
    }
  },
  {
    id: 3,
    image: '/images/articles/heitor.png',
    title: 'Site Web para a divulgação dos resultados do projeto Cemitério Caboclo',
    date: '14/01/2025',
    authors: [
      'Álvaro Afonso Schenatto',
      'Rômulo Nilson Horn',
      'Maurício Reisdoefer Pereira',
      'Caroline Guterres Silva',
      'Heitor Scalco Neto',
      'Maria Denise Bortolini'
    ],
    resume: '', // Conteúdo a ser preenchido futuramente
    pdfUrl: '/files/heitor.pdf',
    citations: {
      ABNT: 'SCHENATTO, Á. A. et al. Site Web para a divulgação dos resultados do projeto Cemitério Caboclo: resgate de fontes orais e documentais do início da colonização e da história de Concórdia - SC. 2025.',
      APA: 'Schenatto, Á. A., Horn, R. N., Pereira, M. R., Silva, C. G., Scalco Neto, H., & Bortolini, M. D. (2025). Site Web para a divulgação dos resultados do projeto Cemitério Caboclo.',
      BibTeX: '@misc{schenatto2025site, title={Site Web para a divulgação dos resultados do projeto Cemitério Caboclo}, author={Schenatto, Álvaro Afonso and others}, year={2025}}'
    }
  },
  {
    id: 4,
    image: '/images/articles/maria.png',
    title: 'Relatos sobre Caboclos: um exercício de narrativa histórica a respeito da população Cabocla de Fragosos',
    date: '06/12/2025',
    authors: [
      'Eloá Paola Martins Zanon',
      'Maria Denise Bortolini',
      'Sophia Helena Dahmer',
      'Vitor Marcelo Mignoni'
    ],
    resume: '', // Conteúdo a ser preenchido futuramente
    pdfUrl: '/files/maria.pdf',
    citations: {
      ABNT: 'ZANON, E. P. M.; BORTOLINI, M. D.; DAHMER, S. H.; MIGNONI, V. M. Relatos sobre Caboclos: um exercício de narrativa histórica a respeito da população Cabocla de Fragosos e da cidade de Concórdia nos primórdios da colonização. 2025.',
      APA: 'Zanon, E. P. M., Bortolini, M. D., Dahmer, S. H., & Mignoni, V. M. (2025). Relatos sobre Caboclos: um exercício de narrativa histórica a respeito da população Cabocla de Fragosos.',
      BibTeX: '@misc{zanon2025relatos, title={Relatos sobre Caboclos: um exercício de narrativa histórica a respeito da população Cabocla de Fragosos}, author={Zanon, Eloá Paola Martins and Bortolini, Maria Denise and Dahmer, Sophia Helena and Mignoni, Vitor Marcelo}, year={2025}}'
    }
  }
]

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
</script>

<template>
  <section class="articles-page">
    <div class="header-content">
      <h1 class="page-title">Produção Acadêmica</h1>
      <p class="page-subtitle">
        Artigos, teses e materiais educativos desenvolvidos sobre o Cemitério Caboclo e a região.
      </p>
    </div>

    <div class="articles-list">
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