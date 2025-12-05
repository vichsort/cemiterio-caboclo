<script setup>
import CultureCard from '@/components/ui/CultureCard.vue'

const cultureTopics = [
  {
    title: 'O Monge José Maria',
    image: '/images/a.jpg',
    description: 'A figura central da Guerra do Contestado, misturando fé, liderança e resistência.',
    content: 'José Maria de Santo Agostinho não era apenas um líder religioso, mas um organizador social. Ele pregava a igualdade, o fim da República dos coronéis e a criação de uma "Monarquia Celeste". Sua influência sobre a população cabocla foi decisiva para a organização das Cidades Santas.'
  },
  {
    title: 'A Erva-Mate',
    image: '/images/a.jpg',
    description: 'O ouro verde que moldou a economia e os costumes da região do Contestado.',
    content: 'A extração da erva-mate foi a base econômica de grandes companhias e motivo de disputas territoriais. Para o caboclo, porém, o chimarrão era e continua sendo um símbolo de hospitalidade, conversa e união comunitária em volta do fogo de chão.'
  },
  {
    title: 'Crenças e Benzeduras',
    image: '/images/a.jpg',
    description: 'O sincretismo religioso e a medicina popular que curava o corpo e a alma.',
    content: 'Em uma região esquecida pelo poder público e sem médicos, as benzedeiras e os monges eram a única esperança. O uso de ervas medicinais, rezas e rituais mesclava catolicismo popular com tradições indígenas, criando uma identidade espiritual única.'
  },
  {
    title: 'A Culinária Cabocla',
    image: '/images/a.jpg',
    description: 'Sabores simples e fortes, nascidos da terra e do tropeirismo.',
    content: 'Feijão tropeiro, arroz de carreteiro, paçoca de pinhão e quirera. A culinária da região é marcada pela necessidade de alimentos calóricos e duráveis para as longas jornadas, utilizando ingredientes abundantes na mata de araucárias.'
  }
]
</script>

<template>
  <section class="culture-page">
    <div class="header-content">
      <h1 class="page-title">Cultura e Tradição</h1>
      <p class="page-subtitle">
        Conheça os pilares que sustentam a história e a identidade do povo caboclo.
      </p>
    </div>

    <div class="cards-grid">
      <CultureCard 
        v-for="(topic, index) in cultureTopics"
        :key="index"
        :image="topic.image"
        :title="topic.title"
        :description="topic.description"
        :content="topic.content"
      />
    </div>
  </section>
</template>

<style scoped>
.culture-page {
  padding-top: 100px; 
}

.culture-page {
  padding: 4rem 1rem;
  background-color: var(--color-off-white);
  min-height: 100vh;
}

.header-content {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.page-title {
  font-size: 3rem;
  color: var(--color-brown);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.5;
}

.cards-grid {
  display: grid;
  /* Grid Mágico: Cria colunas automaticamente com no mínimo 300px */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Ajuste para mobile */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .culture-page {
    padding: 2rem 1rem;
  }
}
</style>