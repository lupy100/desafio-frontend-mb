<template>
  <div class="registration-form">
    <StepIndicator :current-step="currentStep" :total-steps="LAST_STEP" />
    <!-- @todo: alterar conforme currentStep -->
    <h1>Seja bem vindo(a)</h1>

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
  import { ref } from 'vue';
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
    documentType: '',
    document: '',
    initialDate: '',
    phoneNumber: '',
    password: '',
  });

  const LAST_STEP = 4;
  const currentStep = ref(1);

  const { errors, validateField, validateAllFields } = useValidation();

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
        { field: 'phone', value: form.value.phoneNumber },
      ],
      3: [{ field: 'password', value: form.value.password }],
      4: [
        { field: 'email', value: form.value.email },
        { field: 'documentType', value: form.value.documentType },
        { field: 'name', value: form.value.name },
        { field: 'document', value: form.value.document },
        { field: 'initialDate', value: form.value.initialDate },
        { field: 'phone', value: form.value.phoneNumber },
        { field: 'password', value: form.value.password },
      ],
    };

    if (!validateAllFields(stepFields[currentStep.value])) return;

    if (currentStep.value < LAST_STEP) {
      currentStep.value += 1;
    } else {
      try {
        // @todo: mandar como raw pro BE const rawValue = value.replace(/\D/g, '');
        const data = await registerUser(form.value);
        window.alert('Dados retornados pelo BE:\n' + JSON.stringify(data.data, null, 2));
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import url(./RegistrationForm.scss);
</style>
