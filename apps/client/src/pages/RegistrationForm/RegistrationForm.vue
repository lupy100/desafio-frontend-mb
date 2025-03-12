<template>
  <div class="registration-form">
    <StepIndicator :current-step="currentStep" :total-steps="LAST_STEP" />
    <h1>{{ stepTitle }}</h1>

    <form @submit.prevent="submitForm">
      <WelcomeStep
        v-if="currentStep === 1"
        v-model:email="form.email"
        v-model:document-type="form.documentType"
        :errors="errors"
        :validate-field="validateField"
      />
      <PersonInfoStep
        v-if="currentStep === 2"
        v-model:name="form.name"
        v-model:document="form.document"
        v-model:initial-date="form.initialDate"
        v-model:phone-number="form.phoneNumber"
        :document-type="form.documentType"
        :errors="errors"
        :validate-field="validateField"
      />
      <PasswordStep
        v-if="currentStep === 3"
        v-model:password="form.password"
        :errors="errors"
        :validate-field="validateField"
      />
      <ReviewStep
        v-if="currentStep === 4"
        :form="form"
        :errors="errors"
        :validate-field="validateField"
      />
      <div style="display: flex; justify-content: space-around; margin-top: 20px">
        <ButtonBase v-if="currentStep > 1" @click="goBack" variant="outlined">Voltar</ButtonBase>
        <ButtonBase type="submit">Continuar</ButtonBase>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { registerUser } from '@/api/register';
  import ButtonBase from '@/components/ButtonBase/ButtonBase.vue';
  import StepIndicator from '@/components/StepIndicator/StepIndicator.vue';
  import WelcomeStep from './components/WelcomeStep.vue';
  import PersonInfoStep from './components/PersonInfoStep.vue';
  import PasswordStep from './components/PasswordStep.vue';
  import ReviewStep from './components/ReviewStep.vue';
  import { useValidation } from '@/composables/useValidations';

  const form = ref({
    name: '',
    email: '',
    documentType: 'pf',
    document: '',
    initialDate: '',
    phoneNumber: '',
    password: '',
  });

  const LAST_STEP = 4;
  const currentStep = ref(1);

  const { errors, validateField, validateAllFields } = useValidation();

  const stepTitle = computed(() => {
    const titles = {
      1: 'Seja bem-vindo(a)',
      2: form.value.documentType === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica',
      3: 'Senha de acesso',
      4: 'Revise suas informações',
    };

    return titles[currentStep.value] || 'Seja bem-vindo(a)';
  });

  const goBack = () => {
    errors.value = {};
    currentStep.value -= 1;
  };

  const submitForm = async () => {
    const stepFields = {
      1: [
        { field: 'email', value: form.value.email },
        { field: 'documentType', value: form.value.documentType },
      ],
      2: [
        { field: 'name', value: form.value.name },
        { field: 'document', value: form.value.document },
        { field: 'initialDate', value: form.value.initialDate },
        { field: 'phoneNumber', value: form.value.phoneNumber },
      ],
      3: [{ field: 'password', value: form.value.password }],
      4: [
        { field: 'email', value: form.value.email },
        { field: 'documentType', value: form.value.documentType },
        { field: 'name', value: form.value.name },
        { field: 'document', value: form.value.document },
        { field: 'initialDate', value: form.value.initialDate },
        { field: 'phoneNumber', value: form.value.phoneNumber },
        { field: 'password', value: form.value.password },
      ],
    };

    if (!validateAllFields(stepFields[currentStep.value])) return;

    if (currentStep.value < LAST_STEP) return (currentStep.value += 1);

    const formPayload = {
      ...form.value,
      document: form.value.document.replace(/\D/g, ''),
      phoneNumber: form.value.phoneNumber.replace(/\D/g, ''),
    };
    try {
      const data = await registerUser(formPayload);
      console.log(data);
      // @todo: Abrir um modal com os dados retornados
      // @todo: Limpar o formulário
      window.alert(
        `Dados retornados pelo BE:\n${data.message}\n${JSON.stringify(data.data, null, 2)}`
      );
    } catch (error) {
      const responseErrors = error.errors;
      if (!responseErrors)
        return window.alert(
          'Erro ao enviar formulário para o BE:\n Ligue para o suporte e informe o erro'
        );
      Object.entries(responseErrors).forEach(([field, message]) => {
        return (errors.value[field] = message);
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import url(./RegistrationForm.scss);
</style>
