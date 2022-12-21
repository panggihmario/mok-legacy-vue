/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect  } from "vitest";
import Button from "./index.vue";
import { mount } from "@vue/test-utils"

const testValues = {
  label : 'Click me',
  size : 'md',
  color : 'secondary',
  loading : true
}

describe('reusable button component', () => {
  const wrapper = mount(Button,{
    slots: {
      default: testValues.label
    }
  })

  it ('should render properly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.html()).toContain(testValues.label)
  })
  it ('should have props ', async() => {
    const button = wrapper.find('button')
    await wrapper.setProps({size : testValues.size})
    await wrapper.setProps({color : testValues.color})
    expect(button.classes()).toContain(`button__${testValues.size}`)
    expect(button.classes()).toContain(`bg-${testValues.color}`)
  })
  it ('display loading ', async() => {
    const button = wrapper.find('button')
    expect(button.attributes()).not.toHaveProperty('disabled')
    await wrapper.trigger('click')
    await wrapper.setProps({loading : true})
    expect(button.attributes()).toHaveProperty('disabled')
  })
})