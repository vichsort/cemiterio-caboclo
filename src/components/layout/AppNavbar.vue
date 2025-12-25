<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const navLinks = [
  { text: 'Início', to: '/' },
  { text: 'Cultura', to: '/culture' },
  { text: 'Linha Temporal', to: '/timeline' },
  { text: 'Galeria', to: '/gallery' }
]

const dropdownLinks = [
  { text: 'Contato', to: '/contact' },
  { text: 'Artigos', to: '/article' }
]

const allMobileLinks = [...navLinks, ...dropdownLinks]
const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

const isMobileMenuOpen = ref(false)
const route = useRoute()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(route, () => {
  closeMobileMenu()
  isDropdownOpen.value = false
})

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar">
    <div class="container">
      
      <div class="logo-area">
        <router-link to="/" @click="closeMobileMenu">
          <img src="/src/assets/logo.png" alt="Logo Cemitério Caboclo" class="logo" />
        </router-link>
      </div>

      <nav class="desktop-nav">
        <div class="nav-links">
          <template v-for="(link, index) in navLinks" :key="index">
            <router-link 
              :to="link.to" 
              class="nav-item" 
              active-class="active"
            >
              {{ link.text }}
            </router-link>
            <span v-if="index < navLinks.length - 1" class="divider">|</span>
          </template>
        </div>

        <div class="actions-area" ref="dropdownRef">
          <button class="btn-more" @click.stop="toggleDropdown">
            Mais ▾
          </button>

          <Transition name="fade">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <ul>
                <li v-for="(item, index) in dropdownLinks" :key="index">
                  <router-link :to="item.to" @click="isDropdownOpen = false">
                    {{ item.text }}
                  </router-link>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </nav>

      <button class="hamburger-btn" @click.stop="toggleMobileMenu" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon-menu">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <Transition name="fade">
        <div v-if="isMobileMenuOpen" class="mobile-backdrop" @click="closeMobileMenu"></div>
      </Transition>

      <Transition name="slide-right">
        <aside v-if="isMobileMenuOpen" class="mobile-sidebar">
          <div class="sidebar-header">
            <span class="menu-title">Menu</span>
            <button class="close-btn" @click="closeMobileMenu">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav class="mobile-nav-list">
            <router-link 
              v-for="(link, index) in allMobileLinks" 
              :key="index"
              :to="link.to"
              class="mobile-link"
              active-class="active"
            >
              {{ link.text }}
            </router-link>
          </nav>

          <div class="sidebar-footer">
            <img src="/src/assets/logo.png" alt="Logo" class="footer-logo" />
          </div>
        </aside>
      </Transition>

    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--color-white);
  padding: 0.8rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0,0,0,0.03);
  box-sizing: border-box;
  height: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 50px;
  width: auto;
  cursor: pointer;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
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
  padding: 10px 24px;
  border-radius: 20px;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-more:hover {
  opacity: 0.9;
}

.dropdown-menu {
  position: absolute;
  text-align: center;
  top: 130%;
  right: 0;
  width: 180px;
  background-color: var(--color-white);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
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
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu a {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--color-brown);
  font-size: 0.95rem;
  transition: background 0.2s;
}

.dropdown-menu a:hover {
  background-color: #f9f9f9;
  color: var(--color-green);
}

.hamburger-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-green);
  cursor: pointer;
  padding: 5px;
}

.mobile-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  backdrop-filter: blur(2px);
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background-color: var(--color-white);
  z-index: 1002;
  box-shadow: -5px 0 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.menu-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-brown);
}

.close-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-link {
  font-size: 1.2rem;
  color: var(--color-brown);
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s;
  font-weight: 500;
}

.mobile-link.active {
  background-color: #f0f9ee;
  color: var(--color-green);
  font-weight: 700;
}

.sidebar-footer {
  margin-top: auto;
  text-align: center;
  opacity: 0.5;
}

.footer-logo {
  width: 80px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s ease-out; }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }

  .hamburger-btn {
    display: block;
  }
}
</style>