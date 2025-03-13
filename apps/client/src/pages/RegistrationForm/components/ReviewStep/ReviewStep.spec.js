import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import ReviewStep from './ReviewStep.vue';

describe('ReviewStep.vue', () => {
  it('renders correctly and matches snapshot', () => {
    const wrapper = mount(ReviewStep, {
      props: {
        form: {},
        errors: {},
        validateField: vi.fn(),
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
