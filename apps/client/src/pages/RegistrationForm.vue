<template>
  <div class="registration-form">
    <StepIndicator :current-step="1" :total-steps="4" />
    <h1>Seja bem vindo(a)</h1>

    <form @submit.prevent="submitForm">
      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="form.name" required />
      <label for="name">Email:</label>
      <input type="email" id="email" v-model="form.email" required />
      <ButtonBase text="Enviar" type="submit" style="margin-top: 20px" />
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { registerUser } from '@/api/register';
  import ButtonBase from '@/components/ButtonBase/ButtonBase.vue';
  import StepIndicator from '@/components/StepIndicator/StepIndicator.vue';

  const form = ref({ name: '', email: '' });

  const submitForm = async () => {
    try {
      const data = await registerUser(form.value);
      // @todo exibir esses dados em um modal?
      window.alert('Dados retornados pelo BE:\n' + JSON.stringify(data.data, null, 2));
      form.value = { name: '', email: '' };
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };
</script>

<style lang="scss" scoped>
  @import url(./RegistrationForm.scss);
</style>
