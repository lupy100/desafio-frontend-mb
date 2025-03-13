<template>
  <div class="step-indicator">
    Etapa
    <strong data-testid="step-indicator__current" class="step-indicator__current">{{
      currentStep
    }}</strong>
    de {{ totalSteps }}
  </div>
</template>

<script setup>
  defineProps({
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  @import url(./StepIndicator.scss);
</style>
