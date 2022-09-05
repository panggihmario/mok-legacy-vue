import Components from './list';
import Vue from 'vue';
import TrendChart from "vue-trend-chart";
import allComponents from "@/components/index.js"

Components.forEach(x => {
	Vue.component(x.name , x.component)
})

allComponents.forEach(component => {
	Vue.component(component.registeredAs , component.name)
})

Vue.use(TrendChart)