<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from '@/components/layout/AppNavbar.vue'
import TheFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="app-wrapper">
    <TheNavbar />

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <TheFooter />
  </div>
</template>

<style scoped>
.main-content {
  min-height: 80vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>