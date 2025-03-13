import { describe, it, expect } from 'vitest';

import { useValidation } from './useValidations.js';

describe('Composable - useValidation', () => {
  it('validates initial state', () => {
    const { errors, validateField, validateAllFields } = useValidation();

    expect(errors.value).toStrictEqual({});
    expect(validateField.value).toBe(undefined);
    expect(validateAllFields.value).toBe(undefined);
  });

  it('validates all fields correctly', () => {
    const { validateAllFields, errors } = useValidation();

    const fields = [
      { field: 'email', value: 'invalid-email' },
      { field: 'name', value: '' },
      { field: 'document', value: '123' },
    ];

    expect(validateAllFields(fields)).toBe(false);
    expect(errors.value.email).toBe('Por favor, insira um e-mail válido.');
    expect(errors.value.name).toBe('Por favor, insira seu nome.');
    expect(errors.value.document).toBe('Por favor, insira um número de documento válido.');

    fields[0].value = 'valid@email.com';
    fields[1].value = 'João';
    fields[2].value = '111.444.777-35';

    expect(validateAllFields(fields)).toBe(true);
    expect(errors.value.email).toBe('');
    expect(errors.value.name).toBe('');
    expect(errors.value.document).toBe('');
  });

  it('validates email correctly', () => {
    const { errors, validateField } = useValidation();

    validateField('email', 'invalid-email');
    expect(errors.value.email).toBe('Por favor, insira um e-mail válido.');

    validateField('email', 'valid@email.com');
    expect(errors.value.email).toBe('');
  });

  it('validates name correctly', () => {
    const { errors, validateField } = useValidation();

    validateField('name', '');
    expect(errors.value.name).toBe('Por favor, insira seu nome.');

    validateField('name', 'Jo');
    expect(errors.value.name).toBe('O nome deve ter pelo menos 3 caracteres.');

    validateField('name', 'João');
    expect(errors.value.name).toBe('');
  });

  it('validates CPF/CNPJ correctly', () => {
    const { errors, validateField } = useValidation();

    validateField('document', '123');
    expect(errors.value.document).toBe('Por favor, insira um número de documento válido.');

    validateField('document', '111.444.777-35');
    expect(errors.value.document).toBe('');

    validateField('document', '12.345.678/0001-95');
    expect(errors.value.document).toBe('');
  });

  it('validates phone number correctly', () => {
    const { errors, validateField } = useValidation();

    validateField('phoneNumber', '12345');
    expect(errors.value.phoneNumber).toBe('O telefone deve conter entre 10 e 11 dígitos.');

    validateField('phoneNumber', '(11) 98765-4321');
    expect(errors.value.phoneNumber).toBe('');
  });

  it('validates password correctly', () => {
    const { errors, validateField } = useValidation();

    validateField('password', '');
    expect(errors.value.password).toBe('Por favor, insira sua senha.');

    validateField('password', 'invalid');
    expect(errors.value.password).toBe('A senha deve seguir os requisitos.');

    validateField('password', 'Valid123!');
    expect(errors.value.password).toBe('');
  });

  it('validates date correctly', () => {
    const { errors, validateField } = useValidation();

    validateField('initialDate', '');
    expect(errors.value.initialDate).toBe('Por favor, insira uma data.');

    validateField('initialDate', '28-05-1999');
    expect(errors.value.initialDate).toBe('Data inválida. Use o formato correto.');

    validateField('initialDate', '28/05/1999');
    expect(errors.value.initialDate).toBe('');
  });

  it('validates documentType correctly', () => {
    const { errors, validateField } = useValidation();

    validateField('documentType', '');
    expect(errors.value.documentType).toBe('Por favor, selecione o tipo de pessoa.');

    validateField('documentType', 'pf');
    expect(errors.value.documentType).toBe('');
  });
});
