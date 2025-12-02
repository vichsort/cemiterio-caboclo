<script setup>
import { RouterLink } from 'vue-router'

const navLinks = [
  { text: 'Início', to: '/' },
  { text: 'Cultura', to: '/#cultura' },
  { text: 'Linha do tempo', to: '/timeline' },
  { text: 'Localização', to: '/#localizacao' }
]

const moreLinks = [
  { text: 'Fontes', to: '/fontes' },
  { text: 'Contato', to: '/contato' },
  { text: 'Projeto', to: '/projeto' }
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">
      
      <div class="identity-column">
        <div class="project-identity">
          <img src="/logo.png" alt="Logo Cemitério Caboclo" class="project-logo" />
          <div class="project-text">
            <h2 class="project-title">Cemitério Caboclo</h2>
            <p class="project-desc">
              O cemitério caboclo se encontra no coração do 
              <a href="https://concordia.ifc.edu.br/" target="_blank" rel="noopener noreferrer" class="ifc-link">
                Instituto Federal Catarinense - Campus Concórdia ↗
              </a>
            </p>
          </div>
        </div>

        <hr class="divider" />

        <div class="institution-identity">
          <img src="/ifc.png" alt="Instituto Federal Catarinense" class="ifc-logo" />
        </div>
      </div>

      <div class="navigation-column">
        
        <div class="nav-group">
          <h3 class="nav-title">Navegação</h3>
          <ul class="nav-list">
            <li v-for="(link, index) in navLinks" :key="index">
              <router-link 
                :to="link.to" 
                active-class="active"
              >
                {{ link.text }}
                <span class="arrow">↗</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-group">
          <h3 class="nav-title">Mais</h3>
          <ul class="nav-list">
            <li v-for="(link, index) in moreLinks" :key="index">
              <router-link 
                :to="link.to"
                active-class="active"
              >
                {{ link.text }}
                <span class="arrow">↗</span>
              </router-link>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #111111;
  color: var(--color-white);
  padding: 5rem 1rem;
  border-top: 1px solid #333;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
}

.project-identity {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.project-logo {
  width: 100px;
  height: auto;
}

.project-title {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.project-desc {
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  color: #ddd;
}

.ifc-link {
  color: var(--color-green);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s;
}

.ifc-link:hover {
  color: #9cdb8e;
}

.divider {
  border: 0;
  height: 1px;
  background-color: #444;
  margin: 2rem 0;
}

.institution-identity {
  opacity: 0.9;
}

.ifc-logo {
  max-width: 250px;
  height: auto;
  display: block;
}

.navigation-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.nav-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  border-bottom: 1px solid #444;
}

.nav-list a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.nav-list a:hover,
.nav-list a.active {
  color: var(--color-green);
}

.arrow {
  font-size: 0.8rem;
}

@media (max-width: 900px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .navigation-column {
    gap: 1rem;
  }
}

@media (max-width: 600px) {
  .project-identity {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .navigation-column {
    grid-template-columns: 1fr;
  }

  .ifc-logo {
    margin: 0 auto;
  }
}
</style>