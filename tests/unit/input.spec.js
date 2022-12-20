import { shallowMount, mount } from '@vue/test-utils'
import Input from "../../src/components/kipasMaterial/Input/index.vue"
import Vue from 'vue'
import Vuetify from 'vuetify'
import { expect } from 'chai'
Vue.use(Vuetify)

describe(' Custom component input  ',  () => {

  let wrapperDeep;

  beforeEach(() => {
      wrapperDeep = mount(Input, {});
  });


  it('render' , async () => {
    const wrapper = mount({
      data () {
        return {
          name : ''
        }
      },
      components : {
        Input
      },
      template : '<Input v-model="name" />',
    })
    console.log("===>",wrapper)
    const name = 'Brendan Eich';
    await wrapper.find('input').setValue(name);

    expect(wrapper.vm.$data.name).toBe(name);

  })

  
})