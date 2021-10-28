import Components from './list';
import Vue from 'vue';
import TrendChart from "vue-trend-chart";

Components.forEach(x => {
	Vue.component(x.name , x.component)
})

Vue.use(TrendChart)