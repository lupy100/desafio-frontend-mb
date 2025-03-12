<template>
  <div class="review-step">
    <WelcomeStep
      v-model:email="form.email"
      v-model:document-type="form.documentType"
      :errors="errors"
      :validate-field="validateField"
    />
    <PersonInfoStep
      v-model:name="form.name"
      v-model:document="form.document"
      v-model:initial-date="form.initialDate"
      v-model:phone-number="form.phoneNumber"
      :document-type="form.documentType"
      :errors="errors"
      :validate-field="validateField"
    />
    <PasswordStep
      v-model:password="form.password"
      :errors="errors"
      :validate-field="validateField"
    />
  </div>
</template>

<script setup>
  import WelcomeStep from './WelcomeStep.vue';
  import PersonInfoStep from './PersonInfoStep.vue';
  import PasswordStep from './PasswordStep.vue';

  defineProps({
    form: Object,
    errors: Object,
    validateField: Function,
  });
</script>

<style lang="scss" scoped>
  @import url(./ReviewStep.scss);
</style>
