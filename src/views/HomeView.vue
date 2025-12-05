<script setup>
import HeroIntro from '@/components/sections/inicio/HeroIntro.vue'
import HistorySection from '@/components/sections/inicio/HistorySection.vue'
import GallerySection from '@/components/sections/inicio/PreviewGallerySection.vue'
import InfoSection from '@/components/sections/inicio/InfoSection.vue'
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