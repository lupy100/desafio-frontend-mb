import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import PersonInfoStep from './PersonInfoStep.vue';

const DATA_TESTIDS = {
  NAME_INPUT: '[data-testid="person-info-step__name-input"]',
  DOCUMENT_INPUT: '[data-testid="person-info-step__document-input"]',
  DATE_INPUT: '[data-testid="person-info-step__date-input"]',
  PHONE_INPUT: '[data-testid="person-info-step__phone-input"]',
  ERROR_MESSAGE: '[data-testid="input-base__error-message"]',
  LABEL_INPUT: '[data-testid="input-base__label"]',
};

describe('PersonInfoStep', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(PersonInfoStep, {
      props: {
        documentType: 'pf',
        errors: {
          name: 'Nome inválido',
          document: 'Documento inválido',
          initialDate: 'Data inválida',
          phoneNumber: 'Número de telefone inválido',
        },
        validateField: vi.fn(),
      },
    });
  });

  it('renders all input fields correctly', () => {
    const nameInput = wrapper.find(DATA_TESTIDS.NAME_INPUT);
    const documentInput = wrapper.find(DATA_TESTIDS.DOCUMENT_INPUT);
    const dateInput = wrapper.find(DATA_TESTIDS.DATE_INPUT);
    const phoneInput = wrapper.find(DATA_TESTIDS.PHONE_INPUT);

    expect(nameInput.exists()).toBe(true);
    expect(nameInput.attributes('name')).toBe('name');
    expect(nameInput.attributes('required')).toBe('');

    expect(documentInput.exists()).toBe(true);
    expect(documentInput.attributes('name')).toBe('document');
    expect(documentInput.attributes('required')).toBe('');

    expect(dateInput.exists()).toBe(true);
    expect(dateInput.attributes('name')).toBe('initial-date');
    expect(dateInput.attributes('required')).toBe('');

    expect(phoneInput.exists()).toBe(true);
    expect(phoneInput.attributes('name')).toBe('tel');
    expect(phoneInput.attributes('required')).toBe('');
  });

  it('displays error messages when fields are invalid', () => {
    const errors = wrapper.findAll(DATA_TESTIDS.ERROR_MESSAGE);

    expect(errors).toHaveLength(4);
    expect(errors[0].text()).toBe('Nome inválido');
    expect(errors[1].text()).toBe('Documento inválido');
    expect(errors[2].text()).toBe('Data inválida');
    expect(errors[3].text()).toBe('Número de telefone inválido');
  });

  it('hides error messages when fields are valid', async () => {
    await wrapper.setProps({
      errors: { name: '', document: '', initialDate: '', phoneNumber: '' },
    });

    const errors = wrapper.findAll(DATA_TESTIDS.ERROR_MESSAGE);
    expect(errors).toHaveLength(0);
  });

  it('triggers validateField function on blur for all inputs', async () => {
    const nameInput = wrapper.find(DATA_TESTIDS.NAME_INPUT);
    const documentInput = wrapper.find(DATA_TESTIDS.DOCUMENT_INPUT);
    const dateInput = wrapper.find(DATA_TESTIDS.DATE_INPUT);
    const phoneInput = wrapper.find(DATA_TESTIDS.PHONE_INPUT);

    await nameInput.trigger('blur');
    expect(wrapper.props().validateField).toHaveBeenCalledWith('name', wrapper.vm.name);

    await documentInput.trigger('blur');
    expect(wrapper.props().validateField).toHaveBeenCalledWith('document', wrapper.vm.document);

    await dateInput.trigger('blur');
    expect(wrapper.props().validateField).toHaveBeenCalledWith(
      'initialDate',
      wrapper.vm.initialDate
    );

    await phoneInput.trigger('blur');
    expect(wrapper.props().validateField).toHaveBeenCalledWith(
      'phoneNumber',
      wrapper.vm.phoneNumber
    );
  });

  it('formats input values correctly', async () => {
    const documentInput = wrapper.find(DATA_TESTIDS.DOCUMENT_INPUT);
    const phoneInput = wrapper.find(DATA_TESTIDS.PHONE_INPUT);

    await documentInput.setValue('12345678900');
    await documentInput.trigger('input');
    expect(wrapper.vm.document).toBe('123.456.789-00');

    await phoneInput.setValue('11987654321');
    await phoneInput.trigger('input');
    expect(wrapper.vm.phoneNumber).toBe('(11) 98765-4321');
  });

  it('updates labels and placeholders when documentType changes', async () => {
    const labels = wrapper.findAll(DATA_TESTIDS.LABEL_INPUT);

    expect(labels[0].text()).toBe('Nome completo *');
    expect(wrapper.find(DATA_TESTIDS.NAME_INPUT).attributes('placeholder')).toBe('João Silva');
    expect(labels[1].text()).toBe('CPF *');
    expect(wrapper.find(DATA_TESTIDS.DOCUMENT_INPUT).attributes('placeholder')).toBe(
      '000.000.000-00'
    );
    expect(labels[2].text()).toBe('Data de nascimento *');

    await wrapper.setProps({ documentType: 'pj' });

    expect(labels[0].text()).toBe('Razão social *');
    expect(wrapper.find(DATA_TESTIDS.NAME_INPUT).attributes('placeholder')).toBe(
      'Mercado Bitcoin Serviços Digitais LTDA'
    );
    expect(labels[1].text()).toBe('CNPJ *');
    expect(wrapper.find(DATA_TESTIDS.DOCUMENT_INPUT).attributes('placeholder')).toBe(
      '00.000.000/0000-00'
    );
    expect(labels[2].text()).toBe('Data de abertura *');
  });
});
