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
            v-model="previewTiktokPayload.description"
            label="Description"
            outlined
            background-color="white"
            class="font-12"
          ></v-textarea>
          <custom-autocomplete
            :value="previewTiktokPayload.channel"
            v-model="previewTiktokPayload.channel"
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

      <v-snackbar v-model="alertSuccess" top right color="success">
        <span>Success Post</span>
        <v-btn outlined text @click="movePageDraft">See Draft</v-btn>
      </v-snackbar>
      <v-snackbar v-model="alertFailed" top right color="error">
        <span>Error: {{ payloadFailed.message }}</span>
      </v-snackbar>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loadingSubmit: false,
      alertSuccess: false,
      alertFailed: false,
      channels: [],
      payload: {
        medias: [],
        description: null,
        channel: null,
      },
      payloadFailed: {
        message: "",
      },
    };
  },
  mounted() {
    this.handleGetChannel();
  },
  computed: {
    ...mapState({
      previewTiktokData: (state) => state.tiktok.previewTiktokData,
      previewTiktokPayload: (state) => state.tiktok.previewTiktokPayload,
    }),
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      changeStatusPreviewTiktokSuccess: "changeStatusPreviewTiktokSuccess",
      getAllChannel: "channel/getAllChannel",
      getTiktokVideoNoWatermark: "tiktok/getTiktokVideoNoWatermark",
      postFeed: "post/postFeed",
    }),
    actionChangeStatusPreviewTiktok(status) {
      this.changeStatusPreviewTiktok(status);
    },
    actionChangeStatusPreviewTiktokSuccess(status) {
      this.changeStatusPreviewTiktokSuccess(status);
    },
    movePageDraft() {
      this.$router.push({
        name: "draft",
        params: {
          page: 1,
        },
      });
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
      const url = `https://www.tiktok.com/@${this.previewTiktokData.author.uniqueId}/video/${this.previewTiktokData.video.id}`;
      if (this.previewTiktokPayload.channel == null) {
        this.alertFailed = true;
        setTimeout(() => {
          this.alertFailed = false;
        }, 3000);
        this.payloadFailed.message = "Harap Pilih Channel";
      } else {
        this.loadingSubmit = true;
        return this.getTiktokVideoNoWatermark(url)
          .then((response) => {
            this.previewTiktokPayload.medias.push(response.data.data);
            this.actionPostToDraft();
          })
          .catch((err) => {
            this.loadingSubmit = false;
          });
      }
    },
    actionPostToDraft() {
      return this.postFeed(this.previewTiktokPayload)
        .then((response) => {
          this.loadingSubmit = false;
          this.actionChangeStatusPreviewTiktokSuccess(true);
          setTimeout(() => {
            this.actionChangeStatusPreviewTiktokSuccess(false);
          }, 3000);
          this.actionChangeStatusPreviewTiktok(false);
        })
        .catch((err) => {
          this.loadingSubmit = false;
          this.payloadFailed = err.response;
          this.alertFailed = true;
          setTimeout(() => {
            this.alertFailed = false;
          }, 3000);
        });
    },
  },
};
</script>

<style lang="scss">
.font-12 {
  font-size: 12px;
}
</style>
