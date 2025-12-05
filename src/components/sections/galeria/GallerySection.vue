<script setup>
import { ref, computed } from 'vue'

// --- 1. IMPORTAÇÃO AUTOMÁTICA (A Mágica do Vite) ---
// Isso pega todas as imagens dentro de src/assets/gallery
// { eager: true } garante que elas já venham carregadas
const imagesGlob = import.meta.glob('@/assets/gallery/*.{png,jpg,jpeg,webp}', { eager: true })

// --- 2. PROCESSAMENTO DA LISTA ---
// Transformamos o objeto do Vite em um array limpo para nosso v-for
const galleryItems = computed(() => {
  return Object.keys(imagesGlob).map(path => {
    // Extrai o nome do arquivo do caminho completo
    const filenameWithExt = path.split('/').pop()
    
    // Remove a extensão (.jpg) para usar como título
    const titleRaw = filenameWithExt.split('.').slice(0, -1).join('.')
    
    // FORMATAÇÃO DO TÍTULO (Smart Caption)
    // 1. Troca underscores (_) e hifens (-) por espaços
    // 2. Tira caracteres estranhos se houver
    const formattedTitle = titleRaw
      .replace(/[_-]/g, ' ') // Troca _ e - por espaço
      .replace(/([A-Z])/g, ' $1') // (Opcional) Adiciona espaço antes de maiúsculas se estiver em camelCase
      .trim()

    return {
      path: imagesGlob[path].default, // O caminho final da imagem processada
      title: formattedTitle
    }
  })
})

// --- 3. CONTROLE DO MODAL ---
const isModalOpen = ref(false)
const selectedImage = ref(null)

const openModal = (item) => {
  selectedImage.value = item
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Bloqueia scroll do fundo
}

const closeModal = () => {
  isModalOpen.value = false
  selectedImage.value = null
  document.body.style.overflow = 'auto' // Libera scroll
}
</script>

<template>
  <section class="gallery-page">
    <div class="header-content">
      <h1 class="page-title">Galeria Histórica</h1>
      <p class="page-subtitle">Retratos de um tempo que moldou nossa identidade.</p>
    </div>

    <div class="gallery-grid">
      <div 
        v-for="(item, index) in galleryItems" 
        :key="index" 
        class="gallery-item"
        @click="openModal(item)"
      >
        <img :src="item.path" :alt="item.title" loading="lazy" />
        
        <div class="hover-info">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">×</button>
          
          <div class="modal-image-wrapper">
            <img :src="selectedImage.path" :alt="selectedImage.title" />
          </div>
          
          <div class="modal-caption">
            {{ selectedImage.title }}
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.gallery-page {
  padding: 4rem 1rem;
  background-color: var(--color-white);
  min-height: 100vh;
}

.header-content {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  color: var(--color-brown);
  margin-bottom: 0.5rem;
}

/* --- GRID SYSTEM --- */
.gallery-grid {
  display: grid;
  /* Desktop: 4 colunas */
  grid-template-columns: repeat(4, 1fr); 
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  position: relative;
  /* Garante que seja um quadrado perfeito */
  aspect-ratio: 1 / 1; 
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.03);
  z-index: 2; /* Fica levemente acima dos outros */
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Corta a imagem para preencher o quadrado */
  transition: filter 0.3s;
}

/* Efeito de Hover com texto */
.hover-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.9rem;
  font-weight: 700;
}

.gallery-item:hover .hover-info {
  opacity: 1;
}

/* --- MODAL --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9); /* Fundo bem escuro */
  z-index: 2000; /* Acima da Navbar */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-image-wrapper {
  max-height: 80vh; /* Deixa espaço para a legenda */
  display: flex;
}

.modal-image-wrapper img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.modal-caption {
  color: var(--color-white);
  margin-top: 1rem;
  font-size: 1.2rem;
  font-family: var(--font-primary);
  text-align: center;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
}

/* Animação do Modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- RESPONSIVIDADE --- */
@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr); /* Tablet */
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr); /* Celular grande */
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr; /* Mobile (1x1) como pedido */
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>