<template>
  <div>
    <HeaderContent
      :list="items"
      label="List Channel"
      @click="handleClick"
      labelAction="Tambah Channel"
    />
    <v-data-table :headers="headers" hide-default-footer :items="channels">
      <template v-slot:item.channelImage>
        <div class="image__container">
          <div class="image__box"></div>
        </div>
      </template>
      <template v-slot:item.action>
        <div class="d-flex justify-space-between">
          <v-btn icon color="primary">
            <v-icon>edit</v-icon>
          </v-btn>
					<v-btn icon color="orangered">
            <v-icon>delete_outline</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
export default {
  components: {
    HeaderContent
  },
  methods: {
    handleClick() {
			this.$router.push('/channel/create')
    }
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
					align : 'center'
        }
      ],
      channels: [
        {
          channelName: "DONASI",
          description: "Make some changes by giving some of your somene...",
          channelImage: "image",
          no: "1"
        },
        {
          channelName: "Art",
          description: "Forgot your ex, follow us and move on!...",
          channelImage: "image",
          no: "2"
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
.image
	&__box
		width: 50px
		height: 50px
		background-color: grey
	&__container
		padding: 10px
</style>
