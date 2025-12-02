<script setup>
</script>

<template>
  <section class="info-section">
    <div class="container">
      <div class="images-column">
        <div class="image-card"></div>
        <div class="image-card"></div>
      </div>

      <div class="content-column">
        <h2 class="title">Um pouco mais sobre</h2>
        
        <div class="text-block">
          <p>
            Para conhecer mais sobre a história desse local, professores, técnicos em educação e estudantes do IFC desenvolveram dois projetos buscando respostas para suas questões, resolvendo mistérios a respeito de diversos tópicos, como de histórias, relações e comunidades que compuseram este tão sacro campo.
          </p>
          <p>
            Esse Campo Santo é patrimônio tombado pelo município de Concórdia desde o ano de 2005.
          </p>
          <p>
            Hoje passa por um processo de revitalização almejando manter-se como um bem representativo da história de Fragosos e do município de Concórdia.
          </p>
          <p>
            Segundo os relatos dos entrevistados, o cemitério recebeu sepultamentos até aproximadamente o ano de 1946 e que lá havia em torno de 10 a 20 sepulturas, entre elas o túmulo do Coronel Fragoso que junto com algumas famílias se fixaram nas terras do bairro que hoje leva seu nome, no início do século XX e que tem sua história ligada à Guerra do Contestado.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-section {
  background-color: var(--color-white);
  padding: 5rem 1rem;
  display: flex;
  justify-content: center;
}

.container {
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.images-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.image-card {
  width: 100%;
  height: 280px;
  background-color: var(--color-green);
  border-radius: 20px;
}

.title {
  color: var(--color-green);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.text-block p {
  color: var(--color-brown);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.text-block p:last-child {
  margin-bottom: 0;
}

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .images-column {
    order: 2;
    flex-direction: row;
  }
  
  .image-card {
    height: 200px;
  }
}

@media (max-width: 600px) {
  .images-column {
    flex-direction: column;
  }
}
</style>