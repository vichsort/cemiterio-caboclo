<script setup>
import { ref } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  }
})

const isOpen = ref(false)

const toggleCard = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <article class="card" :class="{ 'card-open': isOpen }">
    <div class="image-wrapper">
      <img :src="image" :alt="title" loading="lazy" />
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      
      <p class="card-description">
        {{ description }}
      </p>

      <Transition name="expand">
        <div v-if="isOpen" class="card-content">
          <hr class="divider">
          <p>{{ content }}</p>
        </div>
      </Transition>

      <button @click="toggleCard" class="btn-action">
        {{ isOpen ? 'Ler menos' : 'Ler mais' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  background-color: var(--color-white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: fit-content;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.image-wrapper {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background-color: var(--color-green);
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .image-wrapper img {
  transform: scale(1.05);
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: var(--font-primary);
  color: var(--color-brown);
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.card-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-content {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;
  padding-bottom: 1rem;
}

.divider {
  border: 0;
  height: 1px;
  background-color: #eee;
  margin: 0 0 1rem 0;
}

.btn-action {
  align-self: flex-start;
  background: none;
  border: 2px solid var(--color-green);
  color: var(--color-green);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-primary);
}

.btn-action:hover {
  background-color: var(--color-green);
  color: var(--color-white);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-out;
  max-height: 500px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-bottom: 0;
}
</style>