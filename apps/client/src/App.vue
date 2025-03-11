<template>
  <div class="app">
    <main>
      <RegistrationForm />
    </main>
  </div>
</template>

<script setup>
  import RegistrationForm from './pages/RegistrationForm.vue';
</script>

<style scoped>
  .app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
