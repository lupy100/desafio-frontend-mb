<script setup>
  defineProps({
    text: {
      type: String,
      required: true,
      default: 'Continuar',
    },
    type: {
      type: String,
      default: 'button',
    },
  });
</script>

<template>
  <button class="button-base" :type="type">
    {{ text }}
  </button>
</template>

<style scoped>
  .button-base {
    border: 1px solid #f90;
    border-radius: 8px;
    padding: 8px 24px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
  }
</style>
