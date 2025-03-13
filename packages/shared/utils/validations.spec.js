import { describe, it, expect } from 'vitest';

import {
  validateEmail,
  validateName,
  validateDate,
  isCPFValid,
  isCNPJValid,
  validatePassword,
  formatPhone,
  formatCPF,
  formatCNPJ,
  formatDate,
} from './validations.js';

describe('validateEmail', () => {
  it('should return true for a valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return false for an invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});

describe('validateName', () => {
  it('should return true for a valid name', () => {
    expect(validateName('João Matheus')).toBe(true);
  });

  it('should return false for a name with less than 3 characters', () => {
    expect(validateName('Jo')).toBe(false);
  });
});

describe('validateDate', () => {
  it('should return true for a valid date', () => {
    expect(validateDate('28/05/1999')).toBe(true);
  });

  it('should return false for an invalid date', () => {
    expect(validateDate('1999-05-28')).toBe(false);
  });
});

describe('isCPFValid', () => {
  it('should return true for a valid CPF', () => {
    expect(isCPFValid('123.456.789-09')).toBe(true);
  });

  it('should return false for an invalid CPF', () => {
    expect(isCPFValid('111.111.111-11')).toBe(false);
  });
});

describe('isCNPJValid', () => {
  it('should return true for a valid CNPJ', () => {
    expect(isCNPJValid('12.345.678/0001-95')).toBe(true);
  });

  it('should return false for an invalid CNPJ', () => {
    expect(isCNPJValid('11.111.111/1111-11')).toBe(false);
  });
});

describe('validatePassword', () => {
  it('should return true for a strong password', () => {
    expect(validatePassword('SenhaFortona1')).toBe(true);
  });

  it('should return false for a weak password', () => {
    expect(validatePassword('senhafraca')).toBe(false);
  });
});

describe('formatPhone', () => {
  it('should format a phone number correctly', () => {
    expect(formatPhone('11941007485')).toBe('(11) 94100-7485');
    expect(formatPhone('1136913032')).toBe('(11) 3691-3032');
  });
});

describe('formatCPF', () => {
  it('should format a CPF correctly', () => {
    expect(formatCPF('12345678909')).toBe('123.456.789-09');
  });
});

describe('formatCNPJ', () => {
  it('should format a CNPJ correctly', () => {
    expect(formatCNPJ('12345678000195')).toBe('12.345.678/0001-95');
  });
});

describe('formatDate', () => {
  it('should format a date correctly', () => {
    expect(formatDate('28051999')).toBe('28/05/1999');
  });
});
