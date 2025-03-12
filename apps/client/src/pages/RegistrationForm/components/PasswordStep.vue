<template>
  <div class="password-step">
    <InputBase v-model="password" label="Sua senha" />
    <small>Use pelo menos 8 caracteres, incluindo letras e números.</small>
  </div>
</template>

<script setup>
  import InputBase from '@/components/InputBase/InputBase.vue';

  const password = defineModel('password');
</script>

<style lang="scss" scoped>
  @import url(./PasswordStep.scss);
</style>
