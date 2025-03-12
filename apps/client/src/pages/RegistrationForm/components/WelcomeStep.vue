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
    />
    <div class="welcome-step__document-type">
      <!-- @todo: Ao alterar precisa zerar o document -->
      <div class="welcome-step__radio">
        <input type="radio" id="pf" value="pf" v-model="documentType" />
        <label for="pf">Pessoa física</label>
      </div>

      <div class="welcome-step__radio">
        <input type="radio" id="pj" value="pj" v-model="documentType" />
        <label for="pj">Pessoa jurídica</label>
      </div>
    </div>
    <!-- @todo: Arrumar esse css -->
    <small v-if="errors.documentType && !documentType" style="color: red">{{
      errors.documentType
    }}</small>
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
