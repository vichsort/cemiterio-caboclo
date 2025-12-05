<script setup>
import BaseImage from '@/components/ui/BaseImage.vue'

// O card agora é "burro": só recebe dados e emite clique
defineProps({
  image: { type: String, required: true }, // Vai receber a URL da miniatura
  title: { type: String, required: true },
  description: { type: String, required: true }
})

// Define o evento que o pai vai ouvir
defineEmits(['open'])
</script>

<template>
  <article class="culture-card">
    <div class="image-wrapper">
      <BaseImage :src="image" :alt="title" />
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      
      <button @click="$emit('open')" class="btn-read-more">
        Ler história completa
      </button>
    </div>
  </article>
</template>

<style scoped>
.culture-card {
  background-color: var(--color-white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Garante altura igual no grid */
}

.culture-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.image-wrapper {
  width: 100%;
  height: 200px;
  background-color: #eee;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Empurra o botão para baixo se necessário */
}

.card-title {
  color: var(--color-brown);
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-family: var(--font-primary);
}

.card-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.btn-read-more {
  align-self: flex-start;
  background: none;
  border: 2px solid var(--color-green);
  color: var(--color-green);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-primary);
}

.btn-read-more:hover {
  background-color: var(--color-green);
  color: var(--color-white);
}
</style>