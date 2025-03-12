<template>
  <div class="review-step">
    <WelcomeStep v-model:email="form.email" v-model:document-type="form.documentType" />
    <PersonInfoStep
      v-model:name="form.name"
      v-model:document="form.document"
      v-model:initial-date="form.initialDate"
      v-model:phone-number="form.phoneNumber"
      :document-type="form.documentType"
    />
    <PasswordStep v-model:password="form.password" />
  </div>
</template>

<script setup>
  import WelcomeStep from './WelcomeStep.vue';
  import PersonInfoStep from './PersonInfoStep.vue';
  import PasswordStep from './PasswordStep.vue';

  defineProps({
    form: Object,
  });
</script>

<style lang="scss" scoped>
  @import url(./ReviewStep.scss);
</style>
