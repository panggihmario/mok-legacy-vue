/**
 * @vitest-environment happy-dom
 */

import { describe, it , expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputComponent from "./index.vue"


const testProps = {
  size : 'md',
  label : 'label'
}

describe('Custom component input', () => {
  const wrapper = mount(InputComponent)
  it('should render properly', () => {
    expect(wrapper.find('input').exists()).toBeTruthy()
  })
  it('should set value',  async () => {
    const input = wrapper.find('input')
    await input.setValue('username')
    expect(input.element.value).toBe('username')
  })
  it('should have props', async () => {
    const input = wrapper.find('#input')
    await wrapper.setProps({label : testProps.label})
    await wrapper.setProps({size : testProps.size})
    expect(wrapper.html()).toContain(testProps.label)
    expect(input.classes()).toContain(`input__outline-${testProps.size}`)
  })
})