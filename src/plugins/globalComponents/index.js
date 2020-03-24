import Components from './list';
import Vue from 'vue';

Components.forEach(x => {
	Vue.component(x.name , x.component)
})