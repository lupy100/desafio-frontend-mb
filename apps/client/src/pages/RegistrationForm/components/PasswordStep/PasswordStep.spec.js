import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import PasswordStep from './PasswordStep.vue';

const DATA_TESTIDS = {
  PASSWORD_INPUT: '[data-testid="password-step__password-input"]',
  PASSWORD_REQUIREMENTS: '[data-testid="password-step__requirements"]',
  PASSWORD_WITH_ERROR: '[data-testid="input-base__error-message"]',
};

describe('PasswordStep', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(PasswordStep, {
      props: {
        errors: {
          password: 'Senha inválida',
        },
        validateField: vi.fn(),
      },
    });
  });

  it('renders the password input field correctly', () => {
    const input = wrapper.find(DATA_TESTIDS.PASSWORD_INPUT);
    expect(input.exists()).toBe(true);
    expect(input.attributes('name')).toBe('password');
    expect(input.attributes('id')).toBe('password');
    expect(input.attributes('type')).toBe('password');
    expect(input.attributes('required')).toBe('');
    expect(input.attributes('autocomplete')).toBe('password');
  });

  it('displays password requirements when focused', async () => {
    const input = wrapper.find(DATA_TESTIDS.PASSWORD_INPUT);
    await input.trigger('focus');

    const requirements = wrapper.find(DATA_TESTIDS.PASSWORD_REQUIREMENTS);

    expect(requirements.exists()).toBe(true);
    expect(requirements.findAll('li').length).toBe(4);
  });

  it('not display password requirements initially', () => {
    const requirements = wrapper.find(DATA_TESTIDS.PASSWORD_REQUIREMENTS);
    expect(requirements.exists()).toBe(false);
  });

  it('triggers validateField function when input loses focus', async () => {
    const input = wrapper.find(DATA_TESTIDS.PASSWORD_INPUT);
    await input.trigger('blur');

    expect(wrapper.props().validateField).toHaveBeenCalledWith('password', wrapper.vm.password);
  });

  it('displays error message if password has an error', () => {
    const errorMessage = wrapper.find(DATA_TESTIDS.PASSWORD_WITH_ERROR);
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Senha inválida');
  });

  it('not display error message when no errors exist', async () => {
    await wrapper.setProps({
      errors: {},
    });

    const errorMessage = wrapper.find(DATA_TESTIDS.PASSWORD_WITH_ERROR);
    expect(errorMessage.exists()).toBe(false);
  });
});
