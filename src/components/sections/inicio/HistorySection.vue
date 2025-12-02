<script setup>
</script>

<template>
  <section class="history-section">
    <div class="content-container">
      <div class="text-column">
        <h2 class="title">História e importância</h2>
        
        <div class="paragraphs">
          <p>
            Este ambiente único foi preservado ao longo dos anos e representa um importante ecossistema local. Com características naturais distintivas, o local abriga uma rica biodiversidade.
          </p>
          <p>
            A área é reconhecida por sua importância ecológica e serve como refúgio para diversas espécies nativas, além de proporcionar um espaço de contemplação e aprendizado sobre a natureza.
          </p>
          <p>
            Através de iniciativas de preservação e conscientização, buscamos manter este patrimônio natural para as futuras gerações.
          </p>
        </div>
      </div>

      <div class="image-column">
        <div class="image-placeholder"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.history-section {
  background-color: var(--color-white);
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
}

.content-container {
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.title {
  color: var(--color-green);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.paragraphs p {
  color: var(--color-brown);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.paragraphs p:last-child {
  margin-bottom: 0;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background-color: var(--color-green);
  border-radius: 20px;
}

@media (max-width: 768px) {
  .content-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .image-placeholder {
    height: 300px;
  }
}
</style>