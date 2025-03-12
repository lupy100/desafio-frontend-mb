<template>
  <div class="registration-form">
    <StepIndicator :current-step="currentStep" :total-steps="LAST_STEP" />
    <h1>Seja bem vindo(a)</h1>

    <form @submit.prevent="submitForm">
      <WelcomeStep
        v-if="currentStep === 1"
        v-model:email="form.email"
        v-model:document-type="form.documentType"
      />
      <ButtonBase type="submit">Continuar</ButtonBase>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { registerUser } from '@/api/register';
  import ButtonBase from '@/components/ButtonBase/ButtonBase.vue';
  import StepIndicator from '@/components/StepIndicator/StepIndicator.vue';
  import WelcomeStep from './components/WelcomeStep.vue';

  const form = ref({ name: '', email: '', documentType: '' });
  const LAST_STEP = 4;
  const currentStep = ref(1);

  const submitForm = async () => {
    if (currentStep.value < LAST_STEP) currentStep.value += 1;

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
