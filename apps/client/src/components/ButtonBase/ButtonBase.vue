<template>
  <button :class="['button-base', variant]" :type="type" :disabled="disabled">
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
    },
  });
</script>

<style lang="scss" scoped>
  @import url(./ButtonBase.scss);
</style>
