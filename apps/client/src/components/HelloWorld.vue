<script setup>
  defineProps({
    msg: {
      type: String,
      required: true,
      default: 'Welcome',
    },
  });
</script>

<template>
  <div class="welcome">
    <h1 class="welcome green">{{ msg }}</h1>
  </div>
</template>

<style scoped>
  .welcome {
    text-align: center;

    &.green {
      color: #14dd89;
    }
  }
</style>
