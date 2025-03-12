<template>
  <div class="person-info-step">
    <InputBase
      v-model="name"
      :label="nameLabel"
      :placeholder="namePlaceholder"
      @blur="validateField('name', name)"
      :error-message="errors.name"
      autocomplete="name"
      name="name"
      id="name"
      required
    />
    <InputBase
      v-model="document"
      :label="documentLabel"
      :placeholder="documentPlaceholder"
      @input="formatDocument"
      @blur="validateField('document', document)"
      :error-message="errors.document"
      type="tel"
      autocomplete="off"
      name="document"
      id="document"
      required
    />
    <InputBase
      v-model="initialDate"
      :label="dateLabel"
      placeholder="28/05/1999"
      type="tel"
      @input="formatDateNumber"
      @blur="validateField('initialDate', initialDate)"
      :error-message="errors.initialDate"
      autocomplete="off"
      name="initial-date"
      id="initial-date"
      required
    />
    <InputBase
      v-model="phoneNumber"
      label="Telefone"
      placeholder="(00) 00000-0000"
      @input="formatPhoneNumber"
      @blur="validateField('phoneNumber', phoneNumber)"
      :error-message="errors.phoneNumber"
      type="tel"
      autocomplete="tel"
      name="tel"
      id="tel"
      required
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import InputBase from '@/components/InputBase/InputBase.vue';
  import { formatCNPJ, formatCPF, formatDate, formatPhone } from '@mb/shared/utils/validations';

  const props = defineProps({ documentType: String, errors: Object, validateField: Function });

  const name = defineModel('name');
  const document = defineModel('document');
  const initialDate = defineModel('initial-date');
  const phoneNumber = defineModel('phone-number');

  const isPF = computed(() => props.documentType === 'pf');

  const nameLabel = computed(() => (isPF.value ? 'Nome completo' : 'Razão social'));
  const namePlaceholder = computed(() =>
    isPF.value ? 'João Silva' : 'Mercado Bitcoin Serviços Digitais LTDA'
  );

  const documentLabel = computed(() => (isPF.value ? 'CPF' : 'CNPJ'));
  const documentPlaceholder = computed(() =>
    isPF.value ? '000.000.000-00' : '00.000.000/0000-00'
  );

  const dateLabel = computed(() => (isPF.value ? 'Data de nascimento' : 'Data de abertura'));

  const formatPhoneNumber = () => {
    phoneNumber.value = formatPhone(phoneNumber.value);
  };

  const formatDateNumber = () => {
    initialDate.value = formatDate(initialDate.value);
  };

  const formatDocument = () => {
    const formattedValue = isPF.value ? formatCPF(document.value) : formatCNPJ(document.value);

    document.value = formattedValue;
  };
</script>

<style lang="scss" scoped>
  @import url(./PersonInfoStep.scss);
</style>
