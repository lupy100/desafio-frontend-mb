<template>
  <div class="input-base" :class="{ 'input-error': errorMessage }">
    <label v-if="label" class="input-label">{{ label }} {{ required ? '*' : '' }}</label>
    <input
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder"
      class="input-field"
      @blur="$emit('blur')"
      :autocomplete="autocomplete"
      :name="name"
      :id="id"
      :required="required"
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
    required: {
      type: Boolean,
      default: false,
    },
  });

  defineEmits(['blur']);
</script>

<style lang="scss" scoped>
  @import url(./InputBase.scss);
</style>
