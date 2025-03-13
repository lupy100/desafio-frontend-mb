import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import RegistrationForm from './RegistrationForm.vue';

import { registerUser } from '@/api/register';

vi.mock('@/api/register', () => ({
  registerUser: vi.fn(() => Promise.resolve({ message: 'Sucesso', data: {} })),
}));

const DATA_TESTIDS = {
  BACK_BUTTON: '[data-testid="registration-form__actions--back-button"]',
  SUBMIT_BUTTON: '[data-testid="registration-form__actions--submit-button"]',
  FORM: '[data-testid="registration-form__form"]',
  TITLE: '[data-testid="registration-form__title"]',
};

const VALID_FORM = {
  email: 'email@email.com',
  documentType: 'pf',
  name: 'João',
  document: '24098684012',
  initialDate: '28/05/1999',
  phoneNumber: '1999119999',
  password: 'Aa123456',
};

describe('RegistrationForm.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.window.alert = vi.fn();
  });

  it('renders the step title correctly', async () => {
    const wrapper = mount(RegistrationForm);

    expect(wrapper.find(DATA_TESTIDS.TITLE).text()).toBe('Seja bem-vindo(a)');

    wrapper.vm.currentStep = 3;
    await wrapper.vm.$nextTick();

    expect(wrapper.find(DATA_TESTIDS.TITLE).text()).toBe('Senha de acesso');
  });

  it('does not call the API if the data is invalid', async () => {
    const wrapper = mount(RegistrationForm);

    wrapper.vm.form = {
      email: 'invalid email',
      documentType: '',
    };
    await wrapper.vm.$nextTick();

    await wrapper.find(DATA_TESTIDS.FORM).trigger('submit.prevent');

    expect(wrapper.vm.currentStep).toBe(1);
    expect(registerUser).not.toHaveBeenCalled();
  });

  it('advances to the next step when a valid form is submitted', async () => {
    const wrapper = mount(RegistrationForm);

    wrapper.vm.form = {
      email: 'email@email.com',
      documentType: 'pf',
    };
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentStep).toBe(1);
    await wrapper.vm.$nextTick();

    await wrapper.find(DATA_TESTIDS.FORM).trigger('submit.prevent');

    expect(wrapper.vm.currentStep).toBe(2);
  });

  it('goes back to the previous step when the back button is clicked', async () => {
    const wrapper = mount(RegistrationForm);

    wrapper.vm.currentStep = 2;
    await wrapper.vm.$nextTick();

    await wrapper.find(DATA_TESTIDS.BACK_BUTTON).trigger('click');
    expect(wrapper.vm.currentStep).toBe(1);
  });

  it('calls the registration API when the form is completed', async () => {
    const wrapper = mount(RegistrationForm);

    wrapper.vm.form = VALID_FORM;

    wrapper.vm.currentStep = 4;
    await wrapper.vm.$nextTick();

    await wrapper.find(DATA_TESTIDS.FORM).trigger('submit.prevent');
    expect(registerUser).toHaveBeenCalled();
    expect(wrapper.vm.form.email).toBe('');
    expect(wrapper.vm.currentStep).toBe(1);
  });

  it('handles API errors correctly', async () => {
    const wrapper = mount(RegistrationForm);

    vi.mocked(registerUser).mockRejectedValueOnce({
      errors: {
        email: 'Email inválido',
        document: 'Documento inválido',
      },
    });

    wrapper.vm.form = VALID_FORM;

    wrapper.vm.currentStep = 4;
    await wrapper.vm.$nextTick();

    await wrapper.find(DATA_TESTIDS.FORM).trigger('submit.prevent');

    expect(registerUser).toHaveBeenCalled();

    expect(wrapper.vm.errors).toEqual({
      email: 'Email inválido',
      document: 'Documento inválido',
      documentType: '',
      name: '',
      initialDate: '',
      phoneNumber: '',
      password: '',
    });
  });

  it('renders the correct step component based on currentStep', async () => {
    const wrapper = mount(RegistrationForm);

    // Step 1: Should render just WelcomeStep
    expect(wrapper.findComponent({ name: 'WelcomeStep' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PersonInfoStep' }).exists()).toBe(false);

    // Step 2: Should render just PersonInfoStep
    wrapper.vm.currentStep = 2;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'WelcomeStep' }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'PersonInfoStep' }).exists()).toBe(true);

    // Step 3: Should render just PasswordStep
    wrapper.vm.currentStep = 3;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'WelcomeStep' }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'PersonInfoStep' }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'PasswordStep' }).exists()).toBe(true);

    // Step 4: Should render ReviewStep with other components
    wrapper.vm.currentStep = 4;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'WelcomeStep' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PersonInfoStep' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PasswordStep' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ReviewStep' }).exists()).toBe(true);
  });
});
