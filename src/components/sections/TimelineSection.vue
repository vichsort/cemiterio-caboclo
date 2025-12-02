<script setup>
import { ref, computed } from 'vue'

const timelineEvents = [
  {
    year: '1856',
    title: 'As Raízes',
    description: 'Nascimento de Miguel Domingos Soares Fragoso em Rio Negro (PR). O início da jornada daquele que se tornaria um líder militar, religioso e pioneiro da região.'
  },
  {
    year: '1874',
    title: 'Casamento',
    description: 'Casou-se em Rio Negro (PR), com Maria Vieira Machado, filha de Manuel Vieira Machado e de Anna do Rosário.'
  },
  {
    year: '1893',
    title: 'A Revolução Federalista',
    description: 'Aos 40 anos, adere à causa federalista. Como Major, lidera o batalhão de voluntários "Dr. Pacheco" e participa do histórico cerco da Lapa.'
  },
  {
    year: '1894',
    title: 'Comandante-em-Chefe',
    description: 'Eleito por seus pares para comandar o ataque à Lagoa Vermelha. Liderou a estratégica e difícil travessia do Rio Uruguai, protegendo a retaguarda das tropas, combatendo com os homens do coronel Manoel do Nascimento Vargas, nas barrancas do rio Uruguai. Segundo a Ordem do dia Revolucionária, 1897,  "[...] procedeu-se a eleição, dando o seguinte resultado: Coronel Fragoso, 11 votos; Coronel [Neponucemo da] Costa, dois votos; Tenente Coronel Magdalena, 1 voto"'
  },
  {
    year: '1895',
    title: 'Retirada',
    description: 'Fragoso, ciente do que aconteceu em Lapa (muitas mortes entre a população da cidade), abriu negociação para a rendição e o domínio revolucionário da vila. A demora de uma decisão força Fragoso a retirar os combatentes legalistas que se dispersaram pelas matas da região nas encostas do Rio Uruguai, próximo da região de Machadinho (RS). No mesmo ano, um tratado de paz que anistiava todos os feitos da guerra por parte dos que participaram desta foi assinado em Pelotas (RS)'
  },
  {
    year: '1900',
    title: 'O Pioneirismo',
    description: 'Estabelece-se nas margens do lajeado que hoje leva seu nome (Rio Fragoso), fundando o primeiro núcleo habitado do Alto Vale do Rio Uruguai Catarinense, que compusera-se de aproximadamente 40 pessoas.'
  },
  {
    year: '1902',
    title: 'Segundo casamento',
    description: 'Casou-se pela segunda vez, com Maria Ruthes Shmidt.'
  },
  {
    year: '1903',
    title: 'Localidade',
    description: 'Encontrava-se no atual distrito de Santo Antônio da Boa Vista (Concórdia).'
  },
  {
    year: '1909',
    title: 'Barra de Santa Cruz',
    description: 'Transfere-se para a barra do Lajeado Fragoso (Engenho Velho), conhecido antigamente como barra de Santa Cruz, onde viviam várias famílias que vieram de Rio Negro junto com Fragoso, cuidando da plantação e da criação do coronel.'
  },
  {
    year: '1910',
    title: 'Fé e Cura',
    description: 'Constrói uma capela dedicada à Nossa Senhora da Conceição que incendiou antes de estar totalmente construída. Atua como curandeiro (homeopata) e líder religioso. É neste período que teria tido contato com o monge José Maria. Nesta mesma época, demostrou-se pacífico e religioso, vindo a pregar a palavra de Deus e o uso de plantas medicinais para curar doentes, sendo muito estimado entre a população.'
  },
  {
    year: '1912',
    title: 'O Contestado',
    description: 'Francisco Soares Fragoso, filho do Coronel Domingos aparece como requerente de terras na barra do Rio Jacutinga e barra do Santa Cruz (atual Rio Fragoso). Citado no inquérito da Batalha do Irani como "General Fanático". Neste momento, o Coronel depõe contra José Maria, o qual abertamente acompanhava. Ali, nascem discussões a respeito de combates anteriores, onde criticava sua crença de "imunidade às balas" e sacrifícios.'
  },
  {
    year: '1912',
    title: 'A guerra do Contestado',
    description: 'A Batalha de Irani foi um dos primeiros e mais violentos confrontos da Guerra do Contestado, ocorrido em 22 de outubro de 1912 na fronteira entre Santa Catarina e Paraná. Tropas estaduais paranaenses atacaram os seguidores do "monge" José Maria, levando à morte do líder religioso e de muitos sertanejos, além de um comandante das tropas paranaenses. Este evento marca o início do conflito, que se prolongou até 1916 e foi motivado por disputas de terra e pobreza na região. '
  },
  {
    year: '1912',
    title: 'Os relatos',
    description: 'com 56 anos de idade, presta depoimento, apresentando-se como industrial, filho de Honório Soares Fragoso e residente na Jacutinga, alfabetizado. Em 23/11, o chefe de polícia do Paraná escreve ao governado paranaense falando de uma possível invasão cabocla à Palmas dirigidos por Miguel Fragoso. Os depoentes de tal inquérito são unânimes em afirmar que Miguel Fragoso não tomou parte no combate. Indiferente disto, Miguel Fragoso ganha uma má fama chegando a ser dele dito que José Maria era um homem bom, servindo de pretexto para os interesses de Fragoso e seus companheiros. Neste, inquérito, deliberadamente Miguel Fragoso tenta afastar-se do monge José Maria.'
  },
  {
    year: '1914',
    title: 'O Engenho Velho',
    description: 'Entre 1900 e 1914, o coronel Fragoso construiu um engenho na barra do riacho Santa Cruz (hoje, Fragosos) e uma rudimentar serraria de madeira, onde este encontrava o Rio Jacutinga. Este engenho rudimentar foi administrado pela família fragoso até o ano de 1913 quando é arrendado por José Fabrício das Neves.'
  },
  {
    year: '1914',
    title: 'O Legado: Cemitério Caboclo',
    description: 'Falece o Coronel Fragoso, atacado de hidropisia foi procurar melhoras na atual povoação de Fragoso, em casa de um cunhado, quando faleceu em meados de 1914. Seu enterro inaugura o cemitério, hoje Patrimônio Cultural de Concórdia. Foi este pequeno núcleo populacional composto pelas famílias Fragoso, Ruth Scmitt, Dos Passos, Grein, Palhano, Brum de Camargo, Amaral, Soares e outros que, ocupando essas terras, escreveram as mais remotas origens do município de Concórdia (SC).'
  }
]

const currentIndex = ref(0)

const isFirst = computed(() => currentIndex.value === 0)
const isLast = computed(() => currentIndex.value === timelineEvents.length - 1)

const nextSlide = () => {
  if (!isLast.value) currentIndex.value++
}

const prevSlide = () => {
  if (!isFirst.value) currentIndex.value--
}

const goToSlide = (index) => {
  currentIndex.value = index
}
</script>

<template>
  <section class="timeline-section">
    <div class="header-content">
      <h2 class="section-title">Linha do Tempo</h2>
      <p class="section-subtitle">A trajetória histórica do Cemitério Caboclo</p>
    </div>

    <div class="carousel-container">
      
      <button 
        @click="prevSlide" 
        class="nav-btn prev" 
        :disabled="isFirst"
        aria-label="Ver evento anterior"
      >
        ←
      </button>

      <div class="viewport">
        <div 
          class="track" 
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <article 
            v-for="(event, index) in timelineEvents" 
            :key="index" 
            class="card"
            :class="{ active: index === currentIndex }"
          >
            <div class="timeline-marker">
              <span class="line left"></span>
              <div class="dot">{{ event.year }}</div>
              <span class="line right"></span>
            </div>

            <div class="card-content">
              <div class="text-content">
                <h3 class="event-title">{{ event.title }}</h3>
                <p class="event-description">{{ event.description }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <button 
        @click="nextSlide" 
        class="nav-btn next" 
        :disabled="isLast"
        aria-label="Ver próximo evento"
      >
        →
      </button>
    </div>

    <div class="pagination">
      <button 
        v-for="(_, index) in timelineEvents" 
        :key="'dot-'+index"
        class="dot-btn"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Ir para slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  padding: 4rem 1rem;
  background-color: var(--color-off-white);
  color: var(--color-black);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-content {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-brown);
  margin: 0 0 1rem 0;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--color-green);
  font-weight: 700;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  gap: 1rem;
  position: relative;
}

.nav-btn {
  background-color: transparent;
  border: 2px solid var(--color-green);
  color: var(--color-green);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-btn:hover:not(:disabled) {
  background-color: var(--color-green);
  color: var(--color-white);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.viewport {
  overflow: hidden;
  width: 100%;

  max-width: 700px; 
}

.track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  width: 100%;
}

.card {
  min-width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-marker {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
}

.line {
  flex: 1;
  height: 2px;
  background-color: var(--color-green);
  opacity: 0.3;
}

.dot {
  background-color: var(--color-green);
  color: var(--color-white);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 900;
  font-size: 1.2rem;
  margin: 0 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card-content {
  background: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  width: 100%;
  text-align: left;
}

.text-content {
  padding: 2rem;
}

.event-title {
  font-size: 1.5rem;
  color: var(--color-brown);
  margin: 0 0 1rem 0;
}

.event-description {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: #555;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
}

.dot-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot-btn.active {
  background-color: var(--color-green);
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .carousel-container {
    gap: 0.2rem;
  }
  
  .nav-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    position: absolute;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  .nav-btn.prev { left: 0; }
  .nav-btn.next { right: 0; }

  .text-content {
    padding: 1.5rem;
  }
  
  .timeline-marker {
    margin-bottom: 1rem;
  }
}
</style>