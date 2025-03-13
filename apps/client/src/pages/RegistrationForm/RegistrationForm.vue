<template>
  <div class="registration-form">
    <StepIndicator :current-step="currentStep" :total-steps="LAST_STEP" />
    <h1 data-testid="registration-form__title" class="registration-form__title">{{ stepTitle }}</h1>

    <form data-testid="registration-form__form" @submit.prevent="submitForm">
      <Transition name="slide-fade" mode="out-in">
        <WelcomeStep
          v-if="currentStep === 1"
          v-model:email="form.email"
          v-model:document-type="form.documentType"
          :errors="errors"
          :validate-field="validateField"
        />
        <PersonInfoStep
          v-else-if="currentStep === 2"
          v-model:name="form.name"
          v-model:document="form.document"
          v-model:initial-date="form.initialDate"
          v-model:phone-number="form.phoneNumber"
          :document-type="form.documentType"
          :errors="errors"
          :validate-field="validateField"
        />
        <PasswordStep
          v-else-if="currentStep === 3"
          v-model:password="form.password"
          :errors="errors"
          :validate-field="validateField"
        />
        <ReviewStep
          v-else-if="currentStep === 4"
          :form="form"
          :errors="errors"
          :validate-field="validateField"
        />
      </Transition>

      <div class="registration-form__actions">
        <ButtonBase
          data-testid="registration-form__actions--back-button"
          v-if="currentStep > 1"
          @click="goBack"
          variant="outlined"
          >Voltar</ButtonBase
        >
        <ButtonBase data-testid="registration-form__actions--submit-button" type="submit"
          >Continuar</ButtonBase
        >
      </div>
    </form>
  </div>
</template>

<script setup>
  import { computed, ref, watch } from 'vue';
  import { registerUser } from '@/api/register';
  import ButtonBase from '@/components/ButtonBase/ButtonBase.vue';
  import StepIndicator from '@/components/StepIndicator/StepIndicator.vue';
  import WelcomeStep from './components/WelcomeStep/WelcomeStep.vue';
  import PersonInfoStep from './components/PersonInfoStep.vue';
  import PasswordStep from './components/PasswordStep/PasswordStep.vue';
  import ReviewStep from './components/ReviewStep.vue';
  import { useValidation } from '@/composables/useValidations';

  const setInitialState = () => ({
    email: '',
    documentType: 'pf',
    name: '',
    document: '',
    initialDate: '',
    phoneNumber: '',
    password: '',
  });

  const form = ref(setInitialState());

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

  const validateStepFields = () => {
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
    const currentStepFields = stepFields[currentStep.value];
    return validateAllFields(currentStepFields);
  };

  const handleSuccessfulRegistration = data => {
    alert(`Dados retornados pelo BE:\n${data.message}\n${JSON.stringify(data.data, null, 2)}`);
    //@todo: abrir uma modal de sucesso ia ser bom
    form.value = setInitialState();
    currentStep.value = 1;
  };

  const handleError = error => {
    const responseErrors = error.errors;
    if (!responseErrors) {
      return alert('Erro ao enviar formulário para o BE:\n Ligue para o suporte e informe o erro');
    }
    Object.entries(responseErrors).forEach(([field, message]) => {
      errors.value[field] = message;
    });
  };

  const submitForm = async () => {
    if (!validateStepFields()) return;

    if (currentStep.value < LAST_STEP) return (currentStep.value += 1);

    const formPayload = {
      ...form.value,
      document: form.value.document.replace(/\D/g, ''),
      phoneNumber: form.value.phoneNumber.replace(/\D/g, ''),
    };

    try {
      const data = await registerUser(formPayload);
      handleSuccessfulRegistration(data);
    } catch (error) {
      handleError(error);
    }
  };

  watch(
    () => form.value.documentType,
    () => {
      if (form.value.document) form.value.document = '';
    }
  );
</script>

<style lang="scss" scoped>
  @import url(./RegistrationForm.scss);
</style>
