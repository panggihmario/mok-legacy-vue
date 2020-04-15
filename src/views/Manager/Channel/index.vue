<template>
  <div>
    <HeaderContent :list="items" label="List Channel">
      <custom-input placeholder="Search channel" class="mr-4" width="200" />
      <custom-button class="white--text" color="carmine" @click="handleClick"
        >Tambah Channel</custom-button
      >
    </HeaderContent>
    <v-data-table :headers="headers" hide-default-footer :items="channels">
      <template v-slot:item.channelImage="{ item }">
        <div class="image__container">
          <div class="image__box">
            <v-img 
							:src="item.channelImage" 
						/>
          </div>
        </div>
      </template>
      <template v-slot:item.action="{item}">
        <div class="d-flex justify-space-between">
          <v-btn icon color="primary">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn @click="handleDelete(item.id)" icon color="orangered">
            <v-icon>delete_outline</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    HeaderContent
  },
  methods: {
    ...mapActions({
			listChannel: "channel/getListChannel",
			deleteChannel : "channel/deleteChannel"
    }),
    handleClick() {
      this.$router.push("/channel/create");
		},
		async handleDelete(id) {
			const response = await this.deleteChannel(id)
			if(response.status === 200){
				this.getResponseChannel()
			}else{
				return response
			}
		},
    async getResponseChannel() {
      const response = await this.listChannel();
      if (response.status === 200) {
        const responseData = response.data.data.content;
        const newFormatResponse = responseData.map(res => {
          return {
            channelImage: res.photo,
            channelName: res.name,
						description: res.description,
						id : res.id
          };
        });
        this.channels = newFormatResponse;
      } else {
        return response;
      }
    },
  },
  created() {
    this.getResponseChannel();
  },
  data() {
    return {
      items: [
        {
          text: "Manage Channel",
          disabled: false,
          href: "channel"
        }
      ],
      headers: [
        {
          text: "No",
          value: "no",
          width: "70"
        },
        {
          text: "Gambar Channel",
          value: "channelImage",
          width: "150"
        },
        {
          text: "Nama Channel",
          value: "channelName",
          width: "150"
        },
        {
          text: "Deskripsi",
          value: "description",
          width: "600"
        },
        {
          text: "Manage",
          value: "action",
          align: "center"
        }
      ],
      channels: []
    };
  }
};
</script>

<style lang="sass" scoped>
.image
	&__box
		width: 50px
		height: 50px
	&__failed
		background: grey
	&__container
		padding: 10px
</style>
