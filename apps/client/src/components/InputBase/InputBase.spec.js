import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import InputBase from './InputBase.vue';

const DATA_TESTIDS = {
  input: '[data-testid="input-base__field"]',
  label: '[data-testid="input-base__label"]',
  errorMessage: '[data-testid="input-base__error-message"]',
};

describe('InputBase.vue', () => {
  it('renders props when provided', () => {
    const wrapper = mount(InputBase, {
      props: { label: 'Username', type: 'email', errorMessage: 'Invalid input' },
    });

    const input = wrapper.find(DATA_TESTIDS.input);
    const label = wrapper.find(DATA_TESTIDS.label);
    const errorMessage = wrapper.find(DATA_TESTIDS.errorMessage);

    expect(label.text()).toContain('Username');
    expect(input.attributes('type')).toBe('email');
    expect(errorMessage.text()).toBe('Invalid input');
  });

  it('does not render if not provided', () => {
    const wrapper = mount(InputBase);
    expect(wrapper.find(DATA_TESTIDS.label).exists()).toBe(false);
    expect(wrapper.find(DATA_TESTIDS.errorMessage).exists()).toBe(false);
  });

  it('toggles password visibility', async () => {
    const wrapper = mount(InputBase, {
      props: { type: 'password' },
    });

    const input = wrapper.find(DATA_TESTIDS.input);

    const button = wrapper.find('button');
    expect(input.attributes('type')).toBe('password');

    await button.trigger('click');
    expect(input.attributes('type')).toBe('text');

    await button.trigger('click');
    expect(input.attributes('type')).toBe('password');
  });

  it('emits blur and focus events', async () => {
    const wrapper = mount(InputBase);
    const input = wrapper.find(DATA_TESTIDS.input);

    await input.trigger('focus');
    expect(wrapper.emitted('focus')).toBeTruthy();

    await input.trigger('blur');
    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('binds v-model correctly', async () => {
    const wrapper = mount(InputBase, {
      props: { modelValue: 'Initial value' },
    });

    const input = wrapper.find(DATA_TESTIDS.input);
    expect(input.element.value).toBe('Initial value');

    await input.setValue('New value');
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['New value']);
  });
});
