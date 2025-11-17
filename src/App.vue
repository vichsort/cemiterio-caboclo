<script setup>
import TheNavbar from '@/components/layout/navbar.vue'
import HeroIntro from '@/components/sections/HeroIntro.vue'
import HistorySection from '@/components/sections/HistorySection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import InfoSection from '@/components/sections/InfoSection.vue'
import TheFooter from '@/components/layout/footer.vue'
</script>

<template>
  <TheNavbar />
  <main class="main-content">
    <HeroIntro />
    <HistorySection />
    <GallerySection />
    <InfoSection />
  </main>
  <TheFooter />
</template>

<style scoped>
.main-content {
  padding-top: 100px; 
}
</style>