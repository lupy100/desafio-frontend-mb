<template>
  <div class="person-info-step">
    <InputBase v-model="name" :label="nameLabel" :placeholder="namePlaceholder" />
    <InputBase v-model="document" :label="documentLabel" :placeholder="documentPlaceholder" />
    <InputBase v-model="initialDate" :label="dateLabel" placeholder="28/05/1999" />
    <InputBase v-model="phoneNumber" label="Telefone" placeholder="(00) 00000-0000" />
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import InputBase from '@/components/InputBase/InputBase.vue';

  const props = defineProps({ documentType: String });

  const name = defineModel('name');
  const document = defineModel('document');
  const initialDate = defineModel('initial-date');
  const phoneNumber = defineModel('phone-number');

  const isPF = computed(() => props.documentType === 'pf');

  const nameLabel = computed(() => (isPF.value ? 'Nome completo' : 'Razão social'));
  const namePlaceholder = computed(() =>
    isPF.value ? 'João Matheus Rodrigues Silva' : 'Mercado Bitcoin Serviços Digitais LTDA'
  );

  const documentLabel = computed(() => (isPF.value ? 'CPF' : 'CNPJ'));
  const documentPlaceholder = computed(() =>
    isPF.value ? '000.000.000-00' : '00.000.000/0000-00'
  );

  const dateLabel = computed(() => (isPF.value ? 'Data de nascimento' : 'Data de abertura'));
</script>

<style lang="scss" scoped>
  @import url(./PersonInfoStep.scss);
</style>
