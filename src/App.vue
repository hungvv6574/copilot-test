<template>
  <main class="app">
    <StartPage />
  </main>
</template>

<script setup lang="ts">
import StartPage from './pages/StartPage.vue'
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}

button {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #369970;
}
</style>
