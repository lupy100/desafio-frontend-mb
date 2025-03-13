<template>
  <div class="password-step">
    <InputBase
      test-id="password-step__password-input"
      v-model="password"
      label="Sua senha"
      type="password"
      @blur="validateField('password', password)"
      :error-message="errors.password"
      autocomplete="password"
      name="password"
      id="password"
      @focus="showPasswordRequirements = true"
      required
    />
    <Transition>
      <ul
        data-testid="password-step__requirements"
        v-if="showPasswordRequirements"
        class="password-step__requirements"
      >
        <li>- Deve conter no mínimo 8 caracteres</li>
        <li>- Deve conter no mínimo 1 letra maiúscula</li>
        <li>- Deve conter no mínimo 1 letra minúscula</li>
        <li>- Deve conter no mínimo 1 número</li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
  import InputBase from '@/components/InputBase/InputBase.vue';
  import { ref } from 'vue';

  const password = defineModel('password');

  const showPasswordRequirements = ref(false);

  defineProps({
    errors: Object,
    validateField: Function,
  });
</script>

<style lang="scss" scoped>
  @import url(./PasswordStep.scss);
</style>
