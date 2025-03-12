import {
  isCNPJValid,
  isCPFValid,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
} from '@mb/shared/utils/validations';
import { ref } from 'vue';

export function useValidation() {
  const errors = ref({});

  const validationRules = {
    email: value => (!value || !validateEmail(value)) && 'Por favor, insira um e-mail válido.',
    documentType: value => !value && 'Por favor, selecione o tipo de pessoa.',
    name: value => {
      if (!value) return 'Por favor, insira seu nome.';
      if (!validateName(value)) return 'O nome deve ter pelo menos 3 caracteres.';
    },
    document: value => {
      value = value.replace(/\D/g, '');
      if (!value || (value.length !== 11 && value.length !== 14))
        return 'Por favor, insira um número de documento válido.';
      if (value.length === 11 && !isCPFValid(value)) {
        return 'CPF inválido. Verifique e tente novamente.';
      }
      if (value.length === 14 && !isCNPJValid(value)) {
        return 'CNPJ inválido. Verifique e tente novamente.';
      }
    },
    initialDate: value => {
      if (!value) return 'Por favor, insira uma data.';
      if (!validateDate(value)) return 'Data inválida. Use o formato correto.';
    },
    phone: value => {
      value = value.replace(/\D/g, '');
      if (!value) return 'Por favor, insira um número de telefone.';
      if (value.length < 10 || value.length > 11)
        return 'O telefone deve conter entre 10 e 11 dígitos.';
    },
    password: value => {
      if (!value) return 'Por favor, insira sua senha.';
      if (!validatePassword(value))
        return 'A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e uma minúscula.';
    },
  };

  const validateField = (field, value, extraParam) => {
    errors.value[field] = validationRules[field]
      ? validationRules[field](value, extraParam) || ''
      : '';
  };

  const validateAllFields = fields => {
    fields.forEach(({ field, value, extraParam }) => validateField(field, value, extraParam));
    return !Object.values(errors.value).some(error => error);
  };

  return {
    errors,
    validateField,
    validateAllFields,
  };
}
