<template>
  <div class="registration-form">
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
  import ButtonBase from '../components/ButtonBase.vue';

  const form = {
    name: '',
    email: '',
  };

  const submitForm = () => {
    console.log('submitForm');
    console.log('form', form);
  };
</script>

<style scoped>
  .registration-form {
    background-color: #ccc;
    padding: 2rem;
    border-radius: 8px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-weight: var(--font-weight-bold);
    color: var(--color-brand-primary-regular);
  }
</style>
