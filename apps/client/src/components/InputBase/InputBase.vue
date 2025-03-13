<template>
  <div class="input-base" :class="{ 'input-base--error': errorMessage }">
    <label v-if="label" data-testid="input-base__label" class="input-base__label">
      {{ label }} {{ required ? '*' : '' }}
    </label>
    <div class="input-base__wrapper">
      <input
        :data-testid="testId"
        :type="computedType"
        v-model="inputValue"
        :placeholder="placeholder"
        class="input-base__field"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        :autocomplete="autocomplete"
        :name="name"
        :id="id"
        :required="required"
        :autofocus="autofocus"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="input-base__toggle"
        data-testid="input-base__toggle"
        @click="togglePasswordVisibility"
      >
        <span v-if="isPasswordVisible">🙈</span>
        <span v-else>👁️</span>
      </button>
    </div>
    <small
      v-if="errorMessage"
      data-testid="input-base__error-message"
      class="input-base__error-message"
      >{{ errorMessage }}</small
    >
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const inputValue = defineModel('modelValue');
  defineEmits(['blur', 'focus']);

  const props = defineProps({
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    errorMessage: String,
    autocomplete: String,
    name: String,
    id: String,
    required: Boolean,
    autofocus: Boolean,
    testId: {
      type: String,
      default: 'input-base__field',
    },
  });

  const isPasswordVisible = ref(false);

  const computedType = computed(() => {
    if (props.type === 'password') return isPasswordVisible.value ? 'text' : 'password';

    return props.type;
  });

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };
</script>

<style lang="scss" scoped>
  @import url(./InputBase.scss);
</style>
