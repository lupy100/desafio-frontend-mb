<template>
  <div class="welcome-step">
    <InputBase
      v-model="email"
      label="Endereço de e-mail"
      placeholder="joao.silva@mb.com.br"
      @blur="validateField('email', email)"
      :error-message="errors.email"
      type="email"
      autocomplete="email"
      name="email"
      id="email"
      required
    />
    <div class="welcome-step__wrapper">
      <div class="welcome-step__document-type">
        <div class="welcome-step__radio">
          <input type="radio" id="pf" value="pf" v-model="documentType" />
          <label for="pf">Pessoa física</label>
        </div>

        <div class="welcome-step__radio">
          <input type="radio" id="pj" value="pj" v-model="documentType" />
          <label for="pj">Pessoa jurídica</label>
        </div>
      </div>
      <small class="error-message" v-if="errors.documentType && !documentType">{{
        errors.documentType
      }}</small>
    </div>
  </div>
</template>

<script setup>
  import InputBase from '@/components/InputBase/InputBase.vue';

  const email = defineModel('email');
  const documentType = defineModel('document-type');

  defineProps({
    errors: Object,
    validateField: Function,
  });
</script>

<style lang="scss" scoped>
  @import url(./WelcomeStep.scss);
</style>
