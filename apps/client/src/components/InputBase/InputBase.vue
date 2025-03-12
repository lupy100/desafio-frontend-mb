<template>
  <div class="input-base">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input :type="type" v-model="inputValue" :placeholder="placeholder" class="input-field" />
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
  });
</script>
<style lang="scss" scoped>
  @import url(./InputBase.scss);
</style>
