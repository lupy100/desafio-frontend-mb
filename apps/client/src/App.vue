<template>
  <div class="app">
    <div class="box">
      <HelloWorld msg="Teste" />
      <HelloWorld />
    </div>
  </div>
</template>

<script setup>
  import HelloWorld from './components/HelloWorld.vue';
</script>

<style scoped>
  .app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .box {
    background-color: dimgray;
    padding: 20px;
  }
</style>
