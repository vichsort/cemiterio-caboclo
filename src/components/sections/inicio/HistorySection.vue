<script setup>
</script>

<template>
  <section class="history-section">
    <div class="content-container">
      <div class="text-column">
        <h2 class="title">História e importância</h2>
        
        <div class="paragraphs">
          <p>
            O patrimônio cultural é significativo para a identidade social e para a memória comum de um grupo. É a presença do passado através da ação do pensamento, da memória. São lugares de memória, como se refere Pierre Nora aos espaços e “temporalidades que acabam por ser sacralizados em determinados grupos nas sociedades urbanas”. (PESAVENTO, 2002 p. 29)
          </p>
          <p>
            A história em comum passa a pertencer a cada geração que se segue. As memórias de cada indivíduo estão fortemente ligadas às construções que sinalizam um passado comum a todos.
          </p>
        </div>
      </div>

      <div class="image-column">
        <img src="/images/inicio/1.jpg" alt="Imagem de fora para dentro de túmulos do cemitério" class="image-placeholder" />
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