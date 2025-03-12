<template>
  <div class="input-base">
    <!-- @todo: adicionar required e se for required colocar * -->
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder"
      class="input-field"
      :class="{ 'input-error': errorMessage }"
      @blur="$emit('blur')"
      :autocomplete="autocomplete"
    />
    <small v-if="errorMessage" class="error-message">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
  const inputValue = defineModel('modelValue');

  defineProps({
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
    },
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  });

  defineEmits(['blur']);
</script>

<style lang="scss" scoped>
  @import url(./InputBase.scss);
</style>
