<template>
  <v-menu
    v-model="menu2"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
			<ValidationProvider
				v-slot="{errors}"
				:name="name"
				:rules="rules"
			>
			<label-field class="mb-4">{{label}}</label-field>
      <v-text-field
				outlined
				dense
				append-icon="mdi-calendar-blank"
				v-on="on"
				:error-messages="errors"
				:value="valueDate"
				readonly
				:disabled="disabled"
				v-bind="$attrs"
				class="field"
				background-color="white"
      />
			</ValidationProvider>
    </template>
    <v-date-picker 
			color="primary" 
			:value="value"  
			v-on="inputListener"  
			@input="menu2 = false" 
			:max="max"
			:min="min"
		/>
  </v-menu>
</template>

<script>
export default {
	// props : ["value", "name", "rules", "label"],
	props : {
		value : {
			type : String
		},
		name : {
			type : String
		},
		rules : {
			type : String
		},
		label : {
			type : String
		},
		min : {
			type : String,
			default : ''
		},
		max : {
			type : String,
			default : ' '
		},
		disabled : {
			type : Boolean,
			default : false
		}

	},
	computed : {
		inputListener : function () {
			const vm = this
			return Object.assign({},
			this.$listeners,
			{
				input : function (event){
					vm.$emit('input', event)
				}
			})
		},
		
		valueDate() {
			if(this.value){
				const [year, month , date] = this.value.split('-')
				const f = `${date}/${month}/${year}`
				return f
			}else{
				return null
			}
			
		}
	},
	data () {
		return {
			menu2 : false
		}
	},
}
</script>

<style lang="sass" scoped>
.field
	font-size: $font-size-root
</style>
