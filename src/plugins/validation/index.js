import { extend } from 'vee-validate';
import {required , alpha_dash, max}   from 'vee-validate/dist/rules';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

extend('required', {
	...required , 
	message (fieldname){
		const [realFieldName] = fieldname.split("-")
		return `The ${realFieldName} field is required`
	}
})

extend('alpha_dash', {
	...alpha_dash , 
	message (fieldname){
		const [realFieldName] = fieldname.split("-")
		return `${realFieldName} hanya dapat berupa huruf, angka dan underscore`
	}
})

extend('max', {
	...max,
	message(fieldname, value) {
		return `The ${fieldname} field may not be greater than ${value.length} characters`
	}
})

// extend('url', {
// 	...url , 
// 	message (fieldname){
// 		const [realFieldName] = fieldname.split("-")
// 		return `${realFieldName} hanya dapat berupa huruf, angka dan underscore`
// 	}
// })

extend('positive', (value) => {
  return 'Password is not same';
});