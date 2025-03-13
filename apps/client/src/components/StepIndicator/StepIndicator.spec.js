import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import StepIndicator from './StepIndicator.vue';

const DATA_TESTIDS = {
  currentStep: '[data-testid="step-indicator__current"]',
};

describe('StepIndicator.vue', () => {
  it('renders correctly with given props', () => {
    const wrapper = mount(StepIndicator, {
      props: { currentStep: 2, totalSteps: 5 },
    });

    expect(wrapper.text()).toContain('Etapa 2 de 5');
    expect(wrapper.find(DATA_TESTIDS.currentStep).text()).toBe('2');
  });

  it('updates correctly when props change', async () => {
    const wrapper = mount(StepIndicator, {
      props: { currentStep: 1, totalSteps: 3 },
    });

    expect(wrapper.text()).toContain('Etapa 1 de 3');

    await wrapper.setProps({ currentStep: 2 });
    expect(wrapper.text()).toContain('Etapa 2 de 3');
  });
});
