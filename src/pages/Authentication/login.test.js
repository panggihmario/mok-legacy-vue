/**
 * @vitest-environment happy-dom
 */

import { describe, it , expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils"
import ComponentInput from "../../components/material/k-input/index.vue"
import ComponentButton from "../../components/material/k-button/index.vue"
import FormComponent from "./form.vue"
import { loginSchema } from "./schema.js"
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
const item = [
  {
    username : 'admin',
    password : 'mabes132'
  },
  {
    username : '',
    password : ''
  }
]

describe('from login auth', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const wrapper = mount(FormComponent, {
    global : {
      components : {
        'k-input' : ComponentInput,
        'k-button' : ComponentButton
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        })
      ]
    }
  })

  const username = wrapper.find('[data-test="username"]')
  const password = wrapper.find('[data-test="password"]')
  it('should pass validation', async () => {
    await username.setValue(item[0].username)
    await password.setValue(item[0].password)
    await wrapper.find('form').trigger('submit.prevent')
    const checkValue = await loginSchema.isValid({
      username : username.element.value,
      password : password.element.value
    })
    expect(checkValue).toEqual(true)
  })
  it('should not pass validation' , async () => {
    await username.setValue(item[1].username)
    await password.setValue(item[1].password)
    await wrapper.find('form').trigger('submit.prevent')
    const checkValue = await loginSchema.isValid({
      username : username.element.value,
      password : password.element.value
    })
    expect(checkValue).toEqual(false)
  })
})

