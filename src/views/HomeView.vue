<script setup>
import HeroIntro from '@/components/sections/HeroIntro.vue'
import HistorySection from '@/components/sections/HistorySection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import InfoSection from '@/components/sections/InfoSection.vue'
</script>

<template>
  <main class="main-content">
    <HeroIntro />
    <HistorySection />
    <GallerySection />
    <InfoSection />
  </main>
</template>

<style scoped>
.main-content {
  padding-top: 100px; 
}
</style>