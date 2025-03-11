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

<style lang="scss" scoped>
  @import url(./ButtonBase.scss);
</style>
