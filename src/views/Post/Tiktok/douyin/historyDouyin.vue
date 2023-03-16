<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="listHistoryDouyin"
      hide-default-footer
      class="grey--text"
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
          <td style="font-size: 12px">
            <span
              class="cursor-pointer secondary--text"
              style="text-decoration: underline"
              @click="openInNew(item.originalURL)"
            >
              {{ item.originalURL }}
            </span>
          </td>
          <td style="font-size: 12px; width: 120px">Cleeps China</td>
          <td style="font-size: 12px; width: 300px">
            <span class="ellipsis-second-line">
              {{ item.hashtag }}
            </span>
          </td>
          <td
            style="font-size: 12px; width: 100px"
            v-html="formatDate(item.createAt, true)"
          ></td>
          <td
            style="font-size: 12px; width: 100px"
            v-html="formatDate(item.modifyAt, true)"
          ></td>
          <td
            style="font-size: 12px; width: 160px"
            class="d-flex flex-column justify-center"
          >
            <span
              :class="{
                'green--text': item.status == 'READY_PUBLISH',
                'red--text': item.status == 'FAILED' || item.status == 'REJECT',
              }"
            >
              {{ statusPreview[item.status] }}
            </span>
            <span v-if="item.status == 'FAILED'" style="font-size: 10px">
              {{ item.reasonFailed }}
            </span>
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
              @click="openInNew(previewMedia.originalURL)"
            >
              <img
                :src="previewMedia.thumbnailURL"
                class="image"
                style="width: 100%"
              />
              <div class="middle">
                <div class="d-flex flex-column">
                  <v-icon color="white">mdi-open-in-new</v-icon>
                  <span class="text">Open in new tab</span>
                </div>
              </div>
            </div>
          </div>
          <section
            class="d-flex flex-column pl-4"
            style="gap: 24px; width: 360px"
          >
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
                class="d-flex flex-column whitesnow font-12 px-3 py-2"
                style="border-radius: 4px"
              >
                <span
                  :class="{
                    'green--text': previewMedia.status == 'READY_PUBLISH',
                    'red--text':
                      previewMedia.status == 'FAILED' ||
                      previewMedia.status == 'REJECT',
                  }"
                >
                  {{ statusPreview[previewMedia.status] }}
                </span>
                <span style="font-size: 10px">{{
                  previewMedia.reasonFailed
                }}</span>
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
          text: "Created",
          value: "createdAt",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Modified",
          value: "modifyAt",
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
      statusPreview: {
        NEW: "New",
        READY_PUBLISH: "Ready to Publish",
        REJECT: "Reject",
        FAILED: "Failed",
      },
      previewMedia: {},
      isDialogMedia: false,
      isLoadingDialogMedia: false,
    };
  },
  methods: {
    ...mapActions({
      getDouyinVideoNoWatermark: "tiktok/getDouyinVideoNoWatermark",
    }),
    formatDate(v, withHour) {
      let d = new Date(v);
      let date = d.getDate();
      let month = d.getMonth();
      let year = d.getFullYear();
      let hour = d.getHours();
      let minute = d.getMinutes();
      return withHour
        ? `${date}/${month + 1}/${year} <br /> ${
            hour < 10 ? `0${hour}` : hour
          }:${minute < 10 ? `0${minute}` : minute}`
        : `${date}/${month + 1}/${year}`;
    },
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
        url: v.originalURL,
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

.ellipsis-second-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.font-10 {
  font-size: 10px;
}
</style>
