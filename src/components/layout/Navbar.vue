<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const navLinks = [
  { text: 'Início', href: '#', active: true },
  { text: 'Cultura', href: '#' },
  { text: 'Linha Temporal', href: '#' },
  { text: 'Localização', href: '#' }
]

const dropdownLinks = [
  { text: 'Fontes', href: '#' },
  { text: 'Contato', href: '#' },
  { text: 'Projeto', href: '#' }
]

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <header class="navbar">
    <div class="container">
      
      <div class="logo-area">
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>

      <nav class="nav-links">
        <template v-for="(link, index) in navLinks" :key="index">
          <a 
            :href="link.href" 
            class="nav-item" 
            :class="{ active: link.active }"
          >
            {{ link.text }}
          </a>
          <span v-if="index < navLinks.length - 1" class="divider">|</span>
        </template>
      </nav>

      <div class="actions-area" ref="dropdownRef">
        <button class="btn-more" @click.stop="toggleDropdown">
          Mais
        </button>

        <Transition name="slide-fade">
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <ul>
              <li v-for="(item, index) in dropdownLinks" :key="index">
                <a :href="item.href">{{ item.text }}</a>
              </li>
            </ul>
          </div>
        </Transition>
      </div>

    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--color-white);
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0,0,0,0.03);
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 60px;
  width: auto;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-item {
  text-decoration: none;
  font-weight: 700;
  color: #9CCF91;
  transition: color 0.2s;
  font-size: 1rem;
}

.nav-item.active,
.nav-item:hover {
  color: var(--color-green);
}

.divider {
  color: var(--color-green);
  font-weight: 700;
  font-size: 1.2rem;
}

.actions-area {
  position: relative;
}

.btn-more {
  background-color: var(--color-green);
  color: var(--color-white);
  border: none;
  padding: 10px 0;
  width: 180px;
  border-radius: 20px;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
  text-align: center;
}

.btn-more:hover {
  opacity: 0.9;
}

.dropdown-menu {
  position: absolute;
  top: 120%;
  right: 0;
  width: 180px;
  background-color: var(--color-white);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border-radius: 12px;
  overflow: hidden;
  padding: 0.5rem 0;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  border-bottom: 1px solid #eee;
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu a {
  display: block;
  padding: 12px 0;
  text-decoration: none;
  color: var(--color-brown);
  font-size: 0.9rem;
  text-align: center;
  transition: background 0.2s;
}

.dropdown-menu a:hover {
  background-color: var(--color-off-white);
  color: var(--color-green);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>