import { shallowMount } from '@vue/test-utils'
import TableFeedback from "../../src/views/Manager/FeedBack/tableFeedback.vue"
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    // const shallowWrapper = shallowMount(TableFeedback)
    // console.log(shallowWrapper.html())
    const msg = 'new message'
    console.log("ini testing")
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    // expect(wrapper.text()).toMatch(msg)
  })
})

