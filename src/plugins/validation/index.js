import { extend } from 'vee-validate';
import {required}   from 'vee-validate/dist/rules';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

extend('required', {
	...required , 
	message (fieldname){
		const [realFieldName] = fieldname.split(" ")
		return `The field ${realFieldName} is required`
	}
})
