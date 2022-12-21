/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect  } from "vitest";
import Button from "./index.vue";
import { mount } from "@vue/test-utils"

describe('reusable button component', () => {
  const wrapper = mount(Button,{
    slots: {
      default: 'Click Me'
    }
  })

  it ('should render properly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.html()).toContain('Click Me')
  })
  it ('should have props ', async() => {
    const button = wrapper.find('button')
    await wrapper.setProps({size : 'md'})
    await wrapper.setProps({color : 'secondary'})
    expect(button.classes()).toContain('button__md')
    expect(button.classes()).toContain('bg-secondary')
  })
  it ('display loading ', async() => {
    const button = wrapper.find('button')
    expect(button.attributes()).not.toHaveProperty('disabled')
    await wrapper.trigger('click')
    await wrapper.setProps({loading : true})
    expect(button.attributes()).toHaveProperty('disabled')
  })
})