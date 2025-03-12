<template>
  <button :class="['button-base', `button-base--${variant}`]" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>
  defineProps({
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'flat',
      validator(value) {
        return ['flat', 'outlined'].includes(value);
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import url(./ButtonBase.scss);
</style>
