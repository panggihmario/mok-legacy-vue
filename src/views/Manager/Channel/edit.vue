<template>
 <div>
    <HeaderContent 
			label="Edit Channel" 
			:list="items" 
		/>
		<div class="mt-4"/>
		<FormChannel
			:channel="channel"
			@onSubmit="onSubmit"
			labelButton="Edit Channel"
		/>
  </div>
</template>

<script>
import HeaderContent from "../../../containers/HeaderContent";
import FormChannel from "../../../containers/Form/formChannel";
import { mapActions } from "vuex"
export default {
	 components: {
		HeaderContent,
		FormChannel
  },
	data () {
		return {
			channel : {},
			items: [
        {
          text: "Manage Channel",
          disabled: false,
					href: "/channel",
        },
        {
          text: "Edit Channel",
					disabled: true,
        }
      ]
		}
	},
	methods : {
		...mapActions({
			editChannel : 'channel/editChannel',
			getChannelById : 'channel/getChannelById'
		}),
		async onSubmit(payload){
			const response = await this.editChannel(payload)
			if(response.status === 200) {
				this.$router.push('/channel')
			}else{
				return response
			}
		},
		getResponse(payload) {
      this.status = payload.status;
      this.channel.photo = payload.response.url;
		},
		async getChannel(){
			const id = this.$route.params.id
			const response = await this.getChannelById(id)
			if(response.status === 200) {
				const data = response.data.data
				const payload = {
					name : data.name,
					id : data.id,
					description : data.description,
					photo : data.photo
				}
				this.channel = payload
			}else{
				return response
			}
		}
	},
	mounted(){
		this.getChannel()
	}
}
</script>
