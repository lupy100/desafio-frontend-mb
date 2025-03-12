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
      />
      <PersonInfoStep
        v-if="currentStep === 2"
        v-model:name="form.name"
        v-model:document="form.document"
        v-model:initial-date="form.initialDate"
        v-model:phone-number="form.phoneNumber"
        :document-type="form.documentType"
      />
      <PasswordStep v-if="currentStep === 3" v-model:password="form.password" />
      <ReviewStep v-if="currentStep === 4" :form="form" />
      <div style="display: flex; justify-content: space-around; margin-top: 20px">
        <ButtonBase v-if="currentStep > 1" @click="currentStep -= 1" variant="outlined"
          >Voltar</ButtonBase
        >
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

  const submitForm = async () => {
    if (currentStep.value < LAST_STEP) return (currentStep.value += 1);

    if (currentStep.value === LAST_STEP) {
      try {
        const data = await registerUser(form.value);
        // @todo: exibir esses dados em um modal?
        window.alert('Dados retornados pelo BE:\n' + JSON.stringify(data.data, null, 2));
        // @todo: depois que definir o formato limpar os dados
        // form.value = { name: '', email: '' };
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import url(./RegistrationForm.scss);
</style>
