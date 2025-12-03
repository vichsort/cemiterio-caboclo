<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="hero-container">
    <div class="content-wrapper">
      <h1 class="title">
        Um campo santo<br>
        no IFC Concórdia
      </h1>
      
      <h2 class="subtitle">
        O cemitério caboclo se encontra no coração do 
        <a href="#" class="link">Instituto Federal Catarinense - Campus Concórdia ↗</a>
      </h2>

      <p class="description">
        Um espaço único que preserva a cultura e história, e oferece uma experiência inesquecível de conexão com o passado, presente e futuro.
      </p>

      <div class="actions">
        <BaseButton variant="primary">Veja a galeria</BaseButton>
        <span class="separator">|</span>
        <BaseButton variant="secondary">Saiba mais</BaseButton>
      </div>

      <img src="/images/inicio/0.jpg" alt="Imagem da entrada do cemitério caboclo" class="image-placeholder" />
    </div>
  </section>
</template>

<style scoped>
.hero-container {
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
  background-color: var(--color-white);
}

.content-wrapper {
  max-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.title {
  font-size: 3.5rem;
  color: var(--color-green);
  line-height: 1.1;
  margin: 0;
}

.subtitle {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  max-width: 600px;
}

.link {
  color: var(--color-green);
  text-decoration: none;
}

.description {
  font-size: 0.8rem;
  max-width: 650px;
  margin: 0;
  line-height: 1.4;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.separator {
  color: #ccc;
}

.image-placeholder {
  margin-top: 2rem;
  width: 100%;
  height: 400px;
  background-color: var(--color-green);
  border-radius: 20px;
}
</style>