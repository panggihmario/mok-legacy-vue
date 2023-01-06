/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SelectComponent from "./index.vue"


describe('Custom component select' , () => {
  const wrapper = mount(SelectComponent)
  it('should render properly', () => {
    expect(wrapper.find('input').exists()).toBeTruthy()
  })
})