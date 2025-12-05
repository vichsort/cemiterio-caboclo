<script setup>
import { ref, computed } from 'vue'

const timelineEvents = [
  {
    year: '1856',
    title: 'As Raízes',
    description: 'Nascimento de Miguel Domingos Soares Fragoso em Rio Negro (PR). O início da jornada daquele que se tornaria um líder militar e pioneiro da região.'
  },
  {
    year: '1874',
    title: 'Casamento',
    description: 'Casou-se em Rio Negro (PR), com Maria Vieira Machado, filha de Manuel Vieira Machado e de Anna do Rosário.'
  },
  {
    year: '1893',
    title: 'Adere à causa federalista',
    description: 'Adere à causa federalista com seu batalhão de voluntários, durante a Revolução Federalista que convulsionou o sul do país em 1893, quando o Exército Libertador passa por Rio Negro. O, então, major da Guarda Nacional, contava com 40 anos. Participa do cerco da cidade da Lapa sob as ordens do general Laurentino Pinto Filho; Nomeado coronel comandante do recém-criado Batalhão dos Voluntários da vila do Rio Negro denominado “Dr. Pacheco”. Quando, Gumercindo Saraiva (líder da Revolução Constitucionalista), diante da impossibilidade de seguir para São Paulo, decide regressar ao RS, o coronel Fragoso acompanha a marcha como guarda avançada até Campos Novos.'
  },
  {
    year: '1894',
    title: 'Travessia no passo Dona Ana',
    description: 'Em campos Novos ficou protegendo a retaguarda das tropas até completarem a travessia do Rio Uruguai no passo de Dona Ana, onde atualmente fica a localidade de Praia Bonita, Capinzal (SC), confrontando com o município de Lagoa Vermelha (RS). Combate com os homens do coronel Manoel do Nascimento Vargas, nas barrancas do rio Uruguai. Fragoso e seus comandados, após resistirem a violentos combates, conseguem atravessar as águas turbulentas do Rio Uruguai. Após reagrupar seus homens sua presença é registrada em combates na Lagoa Vermelha (RS) em novembro de 1894. Neste mesmo mês, reorganiza seus homens e estava ativo na Revolução.'
  },
  {
    year: '1894',
    title: 'Sítio de Lagoa Vermelha',
    description: 'Sitia-se na vila de Lagoa Vermelha com a presença de vários Coronéis e ou Tenentes Coronéis, elegendo Fragoso como comandante-em-chefe pela grande maioria dos seus pares para organizar o ataque à Lagoa Vermelha. Nesse mesmo dia é dado a ordem de combate aos republicanos resistentes da Lagoa Vermelha. Fragoso, ciente do que aconteceu em Lapa (muitas mortes entre a população da cidade), abriu negociação para a rendição e o domínio revolucionário da vila. A demora da tomada de decisão dos comandados de Fragoso, a falta de munição e o reforço recebido pelos lagoenses ocasionou a retirada dos combatentes legalistas que se dispersaram pelas matas da região nas encostas do Rio Uruguai.'
  },
  {
    year: '1895',
    title: 'Tratado de Paz',
    description: 'Miguel Fragoso encontra-se acampado no Pinhal, Região costeira do Rio Uruguai, onde hoje encontra-se o município de Machadinho (RS), com uma força de mais ou menos trezentos homens sob seu comando, junto com, cel. Demétrio Ramos e cel. José Chicuta. Assina-se um tratado de paz que anistiava todos os feitos da guerra por parte dos que participaram desta, foi assinado em Pelotas (RS). Fragoso passa a procurar lugar seguro para iniciar uma nova etapa de sua vida. Acompanhado de um bom contingente, que compunham o seu corpo de combatentes.'
  },
  {
    year: '1900',
    title: 'Chegada em Irani',
    description: 'Fragoso retorna a Campos Novos, buscando abrigo no longínquo Faxinal dos Fabrício, local onde hoje encontra-se a cidade de Irani (SC), na época terras contestadas pelo Paraná e Santa Catarina. O coronel Fragoso, após esse episódio, acompanhado de um contingente de mais ou menos 40 pessoas se estabelece próximo a um lajeado que nos dias atuais leva seu nome: Rio Fragosos, estabelece residência formando ali o primeiro núcleo habitado do Alto Vale do Rio Uruguai Catarinense.'
  },
  {
    year: '1902',
    title: 'Segundo casamento',
    description: 'Casou-se pela segunda vez, com Maria Ruthes Shmidt.'
  },
  {
    year: '1903',
    title: 'Em Concórdia',
    description: 'Encontrava-se no atual distrito de Santo Antônio da Boa Vista (Concórdia).'
  },
  {
    year: '1909',
    title: 'Em Engenho Velho',
    description: 'Transfere-se para a barra do Lajeado Fragoso (Engenho Velho), conhecido antigamente como Barra de Santa Cruz. Pela região viviam várias famílias que vieram de Rio Negro junto com Fragoso, cuidando da plantação e da criação do coronel.'
  },
  {
    year: '1895/1912',
    title: 'O curandeiro',
    description: 'Mostrou-se pacífico e religioso, vindo a pregar a palavra de Deus e o uso de plantas medicinais para curar doentes, sendo muito estimado entre a população.'
  },
  {
    year: '1910',
    title: 'Contato com o monge José Maria',
    description: 'Mandou construir uma capelinha dedicada à Nossa Senhora da Conceição que incendiou antes de estar totalmente construída. Por volta de 1910 o monge José Maria (Guerra do Contestado) teria conhecido o coronel Fragoso com quem teria aprendido aspectos religiosos e homeopatia.'
  },
  {
    year: '1912',
    title: 'Os requerentes',
    description: 'Data do Jornal “A República” (SC), Francisco Soares Fragoso, filho do Coronel Domingos aparece como requerente de terras na barra do Rio Jacutinga, então pertencente  à comarca de Palmas (PR). Na edição seguinte, aparece anúncio semelhante: desta vez é o coronel Miguel Domingos Soares Fragoso que requer terras na barra do Santa Cruz (atual Rio Fragoso). Em 9/10 edição do Jornal “A República” as medições das terras de Francisco são aprovadas.'
  },
  {
    year: '1912',
    title: 'No Irani',
    description: 'A presença de Miguel Fragoso no Irani se deve ao fato de estar doente e buscar o monge José Maria para ver se obtinha medicamentos para si, relata quando inquirido. Fragoso teria pernoitado no acampamento de José Maria. Achava que o monge deveria brigar sozinho, deixando de sacrificar as famílias à sua volta. Em depoimento, Fragoso relata que segundo o monge seus seguidores não seriam atingidos pelas balas do inimigo, o que, por sua experiência de combate seria impossível. Essa discordância o teria afastado do monge.'
  },
  {
    year: '1912',
    title: 'No inquérito',
    description: 'O nome de Miguel Fragoso figura no inquérito aberto em Palmas para esclarecer o combate e fatos ocorridos no Irani, neste ano. Foi apontado como comandante dos caboclos, atuando ao lado de Fabrício das Neves. Com 56 anos de idade, presta depoimento, apresentando-se como industrial, filho de Honório Soares Fragoso e residente na Jacutinga, alfabetizado.'
  },
  {
    year: '1912',
    title: 'Invasão cabocla',
    description: 'O chefe de polícia do Paraná escreve ao governador paranaense falando de uma possível invasão cabocla à Palmas dirigidos por Miguel Fragoso - o que não ocorre.'
  },
  {
    year: '1912',
    title: 'No inquérito',
    description: 'Os depoentes de tal inquérito são unânimes em afirmar que Miguel Fragoso não tomou parte no combate. Na véspera do combate Fragoso teria dispersado parte de seus companheiros, porém, alguns  tomaram parte da luta ao lado do monge. Miguel Fragoso aparece no inquérito como um posseiro no lugar Engenho Velho, nas margens do Rio Uruguai, hoje município de Concórdia, figurando como uma espécie de general fanático do episódio conhecido como a espera do Banhado Grande. No inquérito, Miguel Fragoso tenta deliberadamente se afastar do monge citando nomes como o de José Fabrício das Neves e outros. Miguel Fragoso teve a proteção do coronel Domingos Soares e contou com a benevolência das autoridades federais, não sendo preso como outros participantes da Batalha do Irani.'
  },
  {
    year: '1914',
    title: 'O engenho',
    description: 'O coronel Fragoso construiu um engenho na barra do riacho Santa Cruz (hoje, Fragosos) e uma rudimentar serraria de madeira, onde este encontrava o Rio Jacutinga. Este engenho rudimentar foi administrado pela família fragoso até o ano de 1913 quando é arrendado por José Fabrício das Neves.'
  },
  {
    year: '1914',
    title: 'A morte do coronel',
    description: '"Atacado de hidropisia" foi procurar melhoras na atual povoação de Fragoso, em casa de um cunhado, quando faleceu em meados de 1914. Foi enterrado no cemitério recém aberto, assim por ele inaugurado (segundo frei Valentim Dambosi). Esse cemitério “caboclo” foi tombado como patrimônio Cultural do Município de Concórdia no ano de 2005, pela Comissão Técnica do Serviço do Patrimônio Histórico Artístico e Cultural do Município de Concórdia (SC) COTHESPAMC. Foi este pequeno núcleo populacional composto pelas famílias Fragoso, Ruth Scmitt, Dos Passos, Grein, Palhano, Brum de Camargo, Amaral, Soares e outros que, ocupando essas terras, escreveram as mais remotas origens do município de Concórdia (SC).'
  },
  
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
      <p class="section-subtitle">A trajetória histórica do Coronel Fragoso</p>
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