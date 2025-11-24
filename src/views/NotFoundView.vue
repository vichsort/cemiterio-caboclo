<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <section class="not-found-container">
    <div class="content">
      <h1 class="error-code">404</h1>
      <h2 class="title">Caminho não encontrado</h2>
      <p class="description">
        Parece que você tentou acessar uma trilha que não existe ou foi apagada pelo tempo.
        Volte para o início para reencontrar a história.
      </p>
      
      <div class="actions">
        <BaseButton variant="primary" @click="goHome">
          Voltar ao Início
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
  background-color: var(--color-off-white);
}

.content {
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  color: var(--color-green);
  opacity: 0.2;
  margin: 0;
  line-height: 1;
}

.title {
  font-size: 2rem;
  color: var(--color-brown);
  margin-top: -1rem;
  margin-bottom: 1rem;
}

.description {
  color: #555;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>