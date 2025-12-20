import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TimelineView from '@/views/TimelineView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ------------------------------------------------ //
    // ------------------ MAIN VIEWS ------------------ //
    // ------------------------------------------------ //

    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: TimelineView
    },
    {
      path: '/culture',
      name: 'culture',
      component: () => import('@/views/CultureView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue')
    },

    // ------------------------------------------------ //
    // ----------------- 'MORE' VIEWS ----------------- //
    // ------------------------------------------------ //
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('@/views/ArticleView.vue')
    },

    // ------------------------------------------------ //
    // ---------------- ADDERALL VIEWS ---------------- //
    // ------------------------------------------------ //

    {
      path: '/:pathMatch(.*)*', 
      name: 'not-found',
      component: NotFoundView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router