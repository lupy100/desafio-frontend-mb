import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import ButtonBase from './ButtonBase.vue';

const BUTTON_TEXT = 'Click me';

describe('ButtonBase.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(ButtonBase, {
      slots: { default: BUTTON_TEXT },
    });

    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Click me');
    expect(button.classes()).toContain('button-base');
    expect(button.classes()).toContain('button-base--flat');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('applies the outlined variant correctly', () => {
    const wrapper = mount(ButtonBase, {
      props: { variant: 'outlined' },
      slots: { default: BUTTON_TEXT },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain('button-base--outlined');
  });

  it('sets the button type correctly', () => {
    const wrapper = mount(ButtonBase, {
      props: { type: 'submit' },
      slots: { default: BUTTON_TEXT },
    });

    const button = wrapper.find('button');
    expect(button.attributes('type')).toBe('submit');
  });

  it('disables the button when disabled prop is true', () => {
    const wrapper = mount(ButtonBase, {
      props: { disabled: true },
      slots: { default: BUTTON_TEXT },
    });

    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(ButtonBase, {
      slots: { default: BUTTON_TEXT },
    });

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(ButtonBase, {
      props: { disabled: true },
      slots: { default: BUTTON_TEXT },
    });

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
