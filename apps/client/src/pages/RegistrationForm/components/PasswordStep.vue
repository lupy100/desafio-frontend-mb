<template>
  <div class="password-step">
    <InputBase
      v-model="password"
      label="Sua senha"
      type="password"
      @blur="validateField('password', password)"
      :error-message="errors.password"
      autocomplete="password"
      name="password"
      id="password"
    />
  </div>
</template>

<script setup>
  import InputBase from '@/components/InputBase/InputBase.vue';

  const password = defineModel('password');

  defineProps({
    errors: Object,
    validateField: Function,
  });
</script>

<style lang="scss" scoped>
  @import url(./PasswordStep.scss);
</style>
