import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import WelcomeStep from './WelcomeStep.vue';

const DATA_TESTIDS = {
  EMAIL_INPUT: '[data-testid="welcome-step__email-input"]',
  RADIO_PF: '[data-testid="welcome-step__radio--pf"]',
  RADIO_PJ: '[data-testid="welcome-step__radio--pj"]',
  EMAIL_WITH_ERROR: '[data-testid="input-base__error-message"]',
  RADIO_WITH_ERROR: '[data-testid="welcome-step__error-message"]',
};

describe('WelcomeStep', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(WelcomeStep, {
      props: {
        errors: {
          email: 'E-mail inválido',
          documentType: 'Escolha um tipo de documento',
        },
        validateField: vi.fn(),
      },
    });
  });

  it('renders the email input field correctly', () => {
    const input = wrapper.find(DATA_TESTIDS.EMAIL_INPUT);
    expect(input.exists()).toBe(true);
    expect(input.attributes('name')).toBe('email');
    expect(input.attributes('id')).toBe('email');
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('required')).toBe('');
    expect(input.attributes('placeholder')).toBe('joao.silva@mb.com.br');
  });

  it('displays error message if email has an error', () => {
    const errorMessage = wrapper.find(DATA_TESTIDS.EMAIL_WITH_ERROR);
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('E-mail inválido');
  });

  it('does not display error message when no errors exist for email', async () => {
    await wrapper.setProps({
      errors: { email: '' },
    });

    const errorMessage = wrapper.find(DATA_TESTIDS.EMAIL_WITH_ERROR);
    expect(errorMessage.exists()).toBe(false);
  });

  it('triggers validateField function when email input loses focus (blur)', async () => {
    const input = wrapper.find(DATA_TESTIDS.EMAIL_INPUT);
    await input.trigger('blur');

    expect(wrapper.props().validateField).toHaveBeenCalledWith('email', wrapper.vm.email);
  });

  it('updates documentType when radio buttons are clicked', async () => {
    const pfRadioButton = wrapper.find(DATA_TESTIDS.RADIO_PF);
    const pjRadioButton = wrapper.find(DATA_TESTIDS.RADIO_PJ);

    await pfRadioButton.setChecked();
    expect(wrapper.vm.documentType).toBe('pf');

    await pjRadioButton.setChecked();
    expect(wrapper.vm.documentType).toBe('pj');
  });

  it('displays error message if documentType has an error', async () => {
    await wrapper.setProps({
      errors: { documentType: 'Escolha um tipo de documento' },
    });

    const errorMessage = wrapper.find(DATA_TESTIDS.RADIO_WITH_ERROR);
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Escolha um tipo de documento');
  });

  it('does not display error message when documentType has no error', async () => {
    await wrapper.setProps({
      errors: { documentType: '' },
    });

    const errorMessage = wrapper.find(DATA_TESTIDS.RADIO_WITH_ERROR);
    expect(errorMessage.exists()).toBe(false);
  });
});
