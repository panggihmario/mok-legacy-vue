<template>
  <div>
    <div>
      <v-data-table
        :headers="tableHeaders"
        :items="tableItems"
        :loading="loadingList"
        disable-filtering
        disable-sort
        disable-pagination
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, idx) in items" :key="idx">
              <td class="font-12">
                <span class="show-post" @click="openDialogPost(item.id, idx)"
                  >Lihat Post</span
                >
              </td>
              <td class="font-12">
                <div class="text-truncate" style="width: 200px">
                  {{ item.description }}
                </div>
              </td>
              <td class="font-12">{{ item.channel.name }}</td>
              <td class="font-12">{{ item.createBy }}</td>
              <td class="font-12">{{ item.trendingBy }}</td>
              <td class="font-12">{{ formatingDate(item.trendingExpired) }}</td>
              <td class="font-12 grey--text font-weight-medium">
                <div class="d-flex align-center">
                  <v-icon
                    size="46px"
                    :color="item.isMp4Ready ? 'green' : 'red'"
                    style="margin-right: -16px"
                    >mdi-circle-small</v-icon
                  >
                  <span
                    :class="item.isMp4Ready ? 'green--text' : 'red--text'"
                    >MP4</span
                  >
                </div>
              </td>
              <td class="font-12 text-center flex-actions " style="gap: 10px;">
                <custom-button
                  color="secondary"
                  size="x-small"
                  @click="openDialogPushNotif(item.id)"
                >
                  Push Notif 
                </custom-button>
                <div v-if="item.isPriority">
                  <div class="flex-actions isPriority">
                    <v-icon color="grey" size="small">fas fa-check-square</v-icon>
                    <div class="grey--text">Priority</div>
                  </div>
                </div>
                <div v-else  class="flex-actions" @click="openDialogPriority(item.id)">
                  <v-icon size="small">far fa-square</v-icon>
                  <div>Priority</div>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </div>
    <DialogPriority
      @closeDialogPriority="closeDialogPriority"
      @handlePriority="handlePriority"
      :dialogPriority="dialogPriority"
    />
    <div class="row no-gutters mt-4 font-12">
      <div class="col d-flex align-center pl-4">
        <span class="silver--text"
          >Total Post :
          <span class="black--text">{{ totalElements }}</span>
        </span>
      </div>
      <v-pagination
        v-model="page"
        :length="totalPages"
        total-visible="7"
        class="col d-flex justify-end"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="changePage"
      ></v-pagination>
    </div>

    <v-dialog v-model="dialogPost" width="880">
      <v-btn
        rounded
        icon
        x-large
        elevation="2"
        color="white"
        class="nav__btn-left mx-2"
        @click="changeDialogPostData(-1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-card>
        <div
          v-if="!loadingDetail && tableItemsDialog.createBy"
          class="d-flex align-center"
        >
          <div class="pt-7" style="width: 100%">
            <div class="row no-gutters mx-6">
              <div class="col">
                <div
                  class="black"
                  style="
                    width: 362px;
                    height: 456px;
                    border-radius: 8px;
                    overflow: hidden;
                  "
                >
                  <video
                    v-if="
                      tableItemsDialog.medias[dialogPostMediasIdx].url.includes(
                        'mp4'
                      )
                    "
                    :id="`videodialog-${dialogPostMediasIdx}-${tableItemsDialog.medias[dialogPostMediasIdx].id}`"
                    controls
                    :src="tableItemsDialog.medias[dialogPostMediasIdx].url"
                    alt=""
                    class="vid"
                  />
                  <v-img
                    v-else
                    :src="tableItemsDialog.medias[dialogPostMediasIdx].url"
                    alt=""
                    contain
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
              <div class="col font-12">
                <div>
                  <span class="font-10">User</span>
                  <p>@{{ tableItemsDialog.createBy }}</p>
                </div>
                <div class="whitesnow mt-5 pa-2" style="min-height: 400px">
                  {{ tableItemsDialog.description }}
                </div>
              </div>
            </div>

            <div class="trending__bottom">
              <div v-if="tableItemsDialog.medias.length > 1"  class="trending__action-arrow" >
                <div v-if="dialogPostMediasIdx == 0"  class="trending__box-arrow disable">
                  <v-icon size="12px">fas fa-chevron-left</v-icon>
                </div>
                <div v-else @click="changeDialogPostImg(-1)" class="trending__box-arrow">
                  <v-icon size="12px">fas fa-chevron-left</v-icon>
                </div>
                <div v-if="dialogPostMediasIdx == tableItemsDialog.medias.length - 1"  class="trending__box-arrow disable">
                  <v-icon size="12px">fas fa-chevron-right</v-icon>
                </div>
                <div v-else @click="changeDialogPostImg(1)" class="trending__box-arrow">
                  <v-icon size="12px">fas fa-chevron-right</v-icon>
                </div>
              </div>
              <div class="trending__notes">
                Postingan tampil menjadi trending dalam waktu
                  {{ tableItemsDialog.trendingExpired }} jam setelah status
                  postingan berubah menjadi trending!
              </div>
            </div>

          </div>
        </div>
        <div
          v-else
          class="d-flex justify-center align-center"
          style="height: 556px"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-card>
      <v-btn
        rounded
        icon
        x-large
        elevation="2"
        color="white"
        class="nav__btn-right mx-2"
        @click="changeDialogPostData(1)"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-dialog>

    <DialogPushNotif
      :dialogPushNotif="dialogPushNotif"
      @closeDialogPushNotif="closeDialogPushNotif"
      @actionPushNotif="actionPushNotif"
    />

    <v-dialog v-model="dialogPushNotif" width="410">
      <v-card >
        <div class="d-flex no-gutters">
          <div class="text-end pt-6" style="width: 40px">
            <v-icon color="secondary" size="20">mdi-alert-circle</v-icon>
          </div>
          <div class="font-12 pt-6 px-4" style="width: 340px">
            <span class="font-14 black--text"
              >Apakah kamu yakin ingin melakukan push notif untuk konten
              ini?</span
            >
            <p class="mt-2 pr-4 grey--text">
              Postingan ini akan disebarkan ke seluruh user kipaskipas dalam
              bentuk notifikasi, hati-hati untuk tidak terlalu sering melakukan
              ini karena akan sangat mengganggu user nantinya.
            </p>
            <div class="d-flex justify-space-between mb-6">
              <v-btn
                x-small
                height="29"
                width="146"
                depressed
                class="text-capitalize"
                style="border-radius: 8px"
                @click="closeDialogPushNotif"
                >Batalkan Push Notif</v-btn
              >
              <v-btn
                x-small
                height="29"
                width="150"
                depressed
                class="text-capitalize"
                color="secondary"
                style="border-radius: 8px"
                @click="actionPushNotif"
                >Push Notif Sekarang</v-btn
              >
            </div>
          </div>
          <div class="d-flex justify-end" style="width: 30px">
            <v-btn rounded icon>
              <v-icon size="18" @click="closeDialogPushNotif">mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import dialogPriority from "./dialogPriority.vue";
import dialogPushNotif from "./dialogPushNotif.vue";
export default {
  components : {
    DialogPriority : dialogPriority,
    DialogPushNotif : dialogPushNotif
  },
  props: ["tableItems", "loadingList", "totalPages", "totalElements"],
  data() {
    return {
      tableHeaders: [
        { text: "Media", class: "whitesnow" },
        { text: "Caption", class: "whitesnow" },
        { text: "Channel", class: "whitesnow" },
        { text: "User", class: "whitesnow" },
        { text: "Di Trendingkan Oleh", class: "whitesnow" },
        { text: "Trending Berakhir", class: "whitesnow" },
        { text: "", class: "whitesnow" },
        { text: "Action", class: "whitesnow", align: "center" },
      ],
      // tableItems: [],
      tableItemsDialog: {
        medias: [],
      },
      // loadingList: false,
      loadingDetail: false,
      loadingPriority : false,
      dialogPriority : false,
      loadingMakeTrending: false,
      dialogPost: false,
      dialogPostDataIdx: 0,
      dialogPostMediasIdx: 0,
      dialogPushNotif: false,
      dialogPushNotifId: "",
      page: 1,
      idPost : ''
      // totalPages: 0,
    };
  },
  watch: {
    "$route.params.page"() {
      this.getRoute();
    },
    dialogPost() {
      this.stopVideo();
    },
    dialogPostDataIdx() {
      this.stopVideo();
      this.dialogPostMediasIdx = 0;
      if (this.dialogPostDataIdx < 0) {
        this.dialogPostDataIdx = this.tableItems.length - 1;
      } else if (this.dialogPostDataIdx > this.tableItems.length - 1) {
        this.dialogPostDataIdx = 0;
      } else {
        let id = this.tableItems[this.dialogPostDataIdx].id;
        this.handleGetUserPostDetail(id);
      }
    },
  },
  mounted() {
    this.getRoute();
  },
  methods: {
    ...mapActions({
      fetchPostAllUserTrendingDetailById: "post/fetchPostAllUserTrendingDetailById",
      postPriority : 'post/postPriority'
    }),
    openDialogPriority (id) {
      this.dialogPriority = true
      this.idPost = id
    },
    closeDialogPriority (value) {
      this.dialogPriority = value
      this.idPost = ''
    },
    handlePriority () {
      return this.postPriority(this.idPost)
        .then(() => {
          this.loadingPriority = false
          this.closeDialogPriority(false)
          this.$emit('refreshPriority')
        })
        .catch(err => {
          this.loadingPriority = false
        })
    },
    getRoute() {
      this.page = parseInt(this.$route.params.page);
    },
    handleGetUserPostDetail(id) {
      const payload = {
        id: id,
      };
      this.loadingDetail = true;
      return this.fetchPostAllUserTrendingDetailById(payload)
        .then((response) => {
          this.loadingDetail = false;
          this.tableItemsDialog = response.data.data;
        })
        .catch((err) => {
          this.loadingDetail = false;
        });
    },
    actionPushNotif() {
      this.$emit("actionPushNotif", this.dialogPushNotifId);
      this.closeDialogPushNotif();
    },
    openDialogPushNotif(id) {
      this.dialogPushNotif = true;
      this.dialogPushNotifId = id;
    },
    closeDialogPushNotif(value) {
      this.dialogPushNotif = value;
      this.dialogPushNotifId = "";
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    openDialogPost(id, idx) {
      this.dialogPost = true;
      this.dialogPostDataIdx = idx;
      this.handleGetUserPostDetail(id);
    },
    changeDialogPostImg(v) {
      this.dialogPostMediasIdx += v;
    },
    changeDialogPostData(v) {
      this.dialogPostDataIdx += v;
    },
    changePage() {
      this.$emit("onChangePage", this.page);
    },
    stopVideo() {
      const slide = this.dialogPostMediasIdx;
      const medias = this.tableItemsDialog.medias;
      let idVideo;
      medias.forEach((m, idx) => {
        if (m.type === "video") {
          if (idx === slide) {
            idVideo = document.getElementById(`videodialog-${slide}-${m.id}`);
          }
        }
      });
      if (idVideo) {
        idVideo.load();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-actions {
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  & .isPriority {
    cursor: default;
  }
}
.show-post {
  color: $secondary;
  text-decoration: underline;
  cursor: pointer;
}
.nav {
  &__btn-left {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 10em;
    background: rgba($color: #000000, $alpha: 0.5);
  }
  &__btn-right {
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 10em;
    background: rgba($color: #000000, $alpha: 0.5);
  }
}
.img {
  max-width: 100%;
  max-height: 100%;
}
.vid {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
}
.font-10 {
  font-size: 10px;
}
.font-12 {
  font-size: 12px;
}
</style>


<style lang="scss" src="./style.scss" scoped ></style>
