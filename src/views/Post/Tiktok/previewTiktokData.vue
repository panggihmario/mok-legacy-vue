<template>
  <v-navigation-drawer
    floating
    color="whitesmoke"
    app
    width="328"
    permanent
    right
    style="padding:24px"
  >
    <div>
      <h5>Konten Terpilih</h5>
      <p class="font-12 mt-2">
        Konten yang terpilih hanya akan terupload setelah kamu menekan tombol
        “Submit Post”
      </p>
      <div>
        <video
          :src="previewTiktokData.video.playAddr"
          controls
          style="max-width: 100% !important; height: 100% !important"
        ></video>

        <div class="mt-8 font-12 text-break">
          <v-textarea
            v-model="previewTiktokData.desc"
            label="Description"
            outlined
            background-color="white"
            class="font-12"
          ></v-textarea>
          <custom-autocomplete
            :value="payload.channel"
            v-model="payload.channel"
            :items="channels"
            item-text="name"
            placeholder="Select Channel"
            return-object
          />
        </div>
        <div class="d-flex">
          <custom-button
            color="white"
            class="primary--text mr-4"
            @click="actionChangeStatusPreviewTiktok(false)"
          >
            Cancel
          </custom-button>
          <custom-button
            color="primary"
            class="white--text"
            :loading="loadingSubmit"
            @click="actionGetTiktokVideoNoWatermark"
          >
            Submit Post
          </custom-button>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loadingSubmit: false,
      channels: [],
      payload: {
        medias: [],
        description: null,
        channel: null,
      },
    };
  },
  mounted() {
    this.handleGetChannel();
    this.setPayload();
  },
  computed: {
    ...mapState({
      previewTiktokData: (state) => state.tiktok.previewTiktokData,
    }),
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      getAllChannel: "channel/getAllChannel",
      getTiktokVideoNoWatermark: "tiktok/getTiktokVideoNoWatermark",
    }),
    actionChangeStatusPreviewTiktok(status) {
      this.changeStatusPreviewTiktok(status);
    },
    setPayload() {
      this.payload.description = this.previewTiktokData.desc;
    },
    async handleGetChannel() {
      const response = await this.getAllChannel();
      if (response.status === 200) {
        const responseData = response.data.data;
        const formatResponse = responseData.map((d) => {
          return {
            name: d.name,
            id: d.id,
          };
        });
        this.channels = formatResponse;
      } else {
        return response;
      }
    },
    actionGetTiktokVideoNoWatermark() {
      const url = `https://www.tiktok.com/@${this.selectedItem.author.uniqueId}/video/${this.selectedItem.video.id}`;
      if (this.payload.channel == null) {
        this.alertRules = true;
        setTimeout(() => {
          this.alertRules = false;
        }, 3000);
      } else {
        this.loadingSubmit = true;
        return this.getTiktokVideoNoWatermark(url)
          .then((response) => {
            this.payload.medias.push(response.data.data);
            this.actionPostToDraft();
          })
          .catch((err) => {
            this.loadingSubmit = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.font-12 {
  font-size: 12px;
}
</style>
