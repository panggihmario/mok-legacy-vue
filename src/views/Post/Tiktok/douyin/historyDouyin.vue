<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="listHistoryDouyin"
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr>
          <td style="font-size: 12px">{{ item.username }}</td>
          <td style="font-size: 12px">
            <span
              class="cursor-pointer secondary--text"
              style="text-decoration: underline"
              @click="openDialogMedia(item)"
              >Lihat</span
            >
          </td>
          <td style="font-size: 12px">{{ item.originalURL }}</td>
          <td style="font-size: 12px">Cleeps China</td>
          <td style="font-size: 12px">{{ item.hashtag }}</td>
          <td style="font-size: 12px">{{ item.createdDate }}</td>
          <td
            style="font-size: 12px"
            :class="{ 'green--text': item.status == 'READY_PUBLISH' }"
          >
            {{ item.status }}
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="isDialogMedia" width="795">
      <v-card class="pa-4">
        <div v-if="isLoadingDialogMedia" class="d-flex justify-center py-12">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div v-else class="d-flex">
          <div
            class="d-flex align-center black"
            style="
              width: 361px;
              height: 470px;
              border-radius: 8px;
              overflow: hidden;
            "
          >
            <div
              class="container-img"
              @click="openInNew(previewMedia.videoURL)"
            >
              <img
                :src="previewMedia.thumbnailURL"
                class="image"
                style="width: 100%"
                loading="lazy"
              />
              <div class="middle">
                <div class="d-flex flex-column">
                  <v-icon color="white">mdi-open-in-new</v-icon>
                  <span class="text">Open in new tab</span>
                </div>
              </div>
            </div>
          </div>
          <section class="d-flex flex-column pl-4" style="gap: 24px;width: 360px;">
            <div class="d-flex flex-column">
              <span class="grey--text font-10">User</span>
              <span class="font-12">{{ previewMedia.username }}</span>
            </div>
            <div
              class="d-flex flex-column whitesnow px-3 py-2"
              style="height: 181px; overflow: auto; border-radius: 4px"
            >
              <span class="font-12">{{ previewMedia.title }}</span>
            </div>
            <div class="d-flex flex-column">
              <span class="grey--text font-10">Channel</span>
              <div
                class="whitesnow font-12 px-3 py-2"
                style="border-radius: 4px"
              >
                Cleeps China
              </div>
            </div>
            <div class="d-flex flex-column">
              <span class="grey--text font-10">Status</span>
              <div
                class="whitesnow font-12 px-3 py-2"
                style="border-radius: 4px"
              >
                {{ previewMedia.status }}
              </div>
            </div>
          </section>
          <v-spacer></v-spacer>
          <section>
            <v-icon class="cursor-pointer" @click="closeDialogMedia"
              >mdi-close</v-icon
            >
          </section>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    listHistoryDouyin: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Akun",
          value: "username",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Media",
          value: "media",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Link Douyin",
          value: "originalURL",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Channel",
          value: "channel",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Hashtag",
          value: "hashtag",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Import",
          value: "createdDate",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Status",
          value: "status",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
      ],
      previewMedia: {},
      isDialogMedia: false,
      isLoadingDialogMedia: false,
    };
  },
  methods: {
    ...mapActions({
      getDouyinVideoNoWatermark: "tiktok/getDouyinVideoNoWatermark",
    }),
    openDialogMedia(v) {
      this.previewMedia = v;
      this.isDialogMedia = true;
      this.handleGetDouyinVideoNoWatermark(v);
    },
    closeDialogMedia(v) {
      this.previewMedia = {};
      this.isDialogMedia = false;
    },
    openInNew(v) {
      window.open(v, "_blank");
    },
    handleGetDouyinVideoNoWatermark(v) {
      const payload = {
        id: v.originalURL.split("/")[4],
        sendRawData: true,
      };
      this.isLoadingDialogMedia = true;
      return this.getDouyinVideoNoWatermark(payload)
        .then((res) => {
          this.previewMedia.title = res.data.data.title;
          this.previewMedia.videoURL = res.data.data.url;
          this.previewMedia.thumbnailURL = res.data.data.image;
          this.isLoadingDialogMedia = false;
        })
        .catch((err) => {
          this.isLoadingDialogMedia = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-img {
  position: relative;
  cursor: pointer;
}

.image {
  opacity: 1;
  display: block;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container-img:hover .image {
  filter: brightness(50%);
}

.container-img:hover .middle {
  opacity: 1;
  filter: brightness(100%);
}
</style>
