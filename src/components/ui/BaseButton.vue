<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  }
})
</script>

<template>
  <button :class="['base-button', variant]">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 10px 24px;
  border-radius: 50px;
  border: none;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.base-button:hover {
  opacity: 0.9;
}

.primary {
  background-color: var(--color-green);
  color: var(--color-white);
}

.secondary {
  background-color: var(--color-brown);
  color: var(--color-white);
}
</style>