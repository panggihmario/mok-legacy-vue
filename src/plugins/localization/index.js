import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from './locale'

Vue.use(VueI18n)

export default new VueI18n({
	locale : 'en',
	messages : locale
})