/**
 * @vitest-environment happy-dom
 */

import { describe, it , expect, vi } from "vitest";
import { mount, shallowMount } from "@vue/test-utils"
import Login from "./login.vue"
import { reactive } from "vue";
import ComponentInput from "../../components/material/k-input/index.vue"
import ComponentButton from "../../components/material/k-button/index.vue"

describe('form login authentication', () => {
  const wrapper = mount(Login, {
    global : {
      components : {
        'k-input' : ComponentInput,
        'k-button' : ComponentButton
      }
    },
    setup () {
      const loginValues = reactive({
        username : '',
        password : ''
      })

      const errorMessages = reactive({
        username : '',
        password : ''
      })

      return {
        loginValues,
        errorMessages
      }
    }
  })
  it('should set value input', async () => {
    const username = wrapper.findComponent('[data-test="username"]').get('input')
    const password = wrapper.findComponent('[data-test="password"]').get('input')
    const spyOnForm = vi.spyOn(wrapper, 'trigger')
    await username.setValue('jhon')
    await password.setValue('doe')
    await wrapper.trigger('click')
    await wrapper.find('form').trigger('submit')
    expect(wrapper).toBeTruthy()
    expect(username.element.value).toBe('jhon')
    expect(password.element.value).toBe('doe')
    expect(spyOnForm).toHaveBeenCalledOnce()
  })
})