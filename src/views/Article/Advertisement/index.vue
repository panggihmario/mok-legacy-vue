<template>
  <div>
    <HeaderContent label="List Iklan">
      <custom-button color="primary" class="white--text" @click="goToCreateAds">
        Buat Iklan
      </custom-button>
      <custom-button
        color="primary"
        class="white--text ml-4"
        @click="openPositionModal"
      >
        Buat Posisi Iklan
      </custom-button>
    </HeaderContent>

    <div class="d-flex">
      <div style="width : 30%">
        <v-data-table
          disable-sort
          disable-filtering
          hide-default-footer
          :headers="headers"
          :items="listAds"
        >
          <template v-slot:[`item.media`]="{ item }">
            <div
              class="primary--text caption"
              style="cursor:pointer"
              @click="openDialogMedia(item)"
            >
              Lihat
            </div>
          </template>
          <template v-slot:[`item.position`]="{ item }">
            <v-edit-dialog
              :return-value.sync="item.position"
              @save="save(item)"
              large
              persistent
              @open="openEditPosition"
            >
              {{ item.position && item.position.name }}
              <template v-slot:input>
                <v-select
                  class="mt-4"
                  v-model="item.position"
                  item-text="name"
                  return-object
                  :items="itemsPosition"
                />
              </template>
            </v-edit-dialog>
          </template>
        </v-data-table>
      </div>

      <div class="ml-12">
        <v-data-table
          disable-sort
          disable-filtering
          hide-default-footer
          :headers="headersPosition"
          :items="listPosition"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>
                <v-edit-dialog
                  :return-value.sync="item.banner"
                  @save="save(item)"
                  large
                  persistent
                >
                  {{ item.banner && item.banner.name }}
                  <template v-slot:input>
                    <v-select
                      class="mt-4"
                      v-model="item.banner"
                      item-text="name"
                      return-object
                      :items="itemsPosition"
                    />
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </div>

    <DialogPosition
      :dialogPosition="dialogPosition"
      @closeDialogPosition="closeDialogPosition"
    />

    <DialogMedia
      :dialogMedia="dialogMedia"
      @closeDialogMedia="closeDialogMedia"
      :imageAds="imageAds"
    />

    <DialogForm
      :dialogForm="dialogForm"
      @closeDialogForm="closeDialogForm"
      @reloadListAds="reloadListAds"
    />
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import DialogForm from "./dialogForm";
import DialogMedia from "./dialogMedia";
import DialogPosition from "./dialogPosition";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    DialogForm,
    DialogMedia,
    DialogPosition,
  },
  data() {
    return {
      listAds: [],
      listPosition: [],
      dialogMedia: false,
      dialogForm: false,
      dialogPosition: false,
      itemsPosition: [],
      imageAds: "",
      headers: [
        {
          text: "Nama",
          value: "bannerName",
          class: "whitesnow",
          width: "200",
        },
        {
          text: "Media",
          value: "media",
          class: "whitesnow",
          width: "150",
        },
      ],
      headersPosition: [
        {
          text: "Position",
          value: "name",
          class: "whitesnow",
          width: "200",
        },
        {
          text: "Nama",
          value: "name",
          class: "whitesnow",
          width: "150",
        },
      ],
    };
  },
  mounted() {
    this.handleGetBanner();
    this.handleGetBannerPosition();
  },
  methods: {
    ...mapActions({
      getNewsBanner: "ads/getNewsBanner",
      getBannerPosition: "ads/getBannerPosition",
      editBannerPosition: "ads/editBannerPosition",
    }),
    async save(item) {
      const params = {
        name: item.name,
        banner: {
          id: item.banner.id,
        },
      };
      const payload = {
        params,
        id: item.id,
      };
      console.log({ item });
      console.log({ payload });
      const response = await this.editBannerPosition(payload);
      if (response.status === 200) {
        this.handleGetBanner();
        this.handleGetBannerPosition();
      }
    },
    async openEditPosition() {
      const response = await this.getBannerPosition();
      console.log(response);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.itemsPosition = responseData;
      }
    },
    closeDialogPosition(params) {
      this.dialogPosition = params;
    },
    closeDialogForm(params) {
      this.dialogForm = params;
    },
    closeDialogMedia(params) {
      this.dialogMedia = params;
      this.imageAds = "";
    },
    openPositionModal() {
      this.dialogPosition = true;
    },
    openDialogMedia(item) {
      if (item.media.length > 0) {
        const [data] = item.media;
        this.imageAds = data.url;
        this.$nextTick(() => {
          this.dialogMedia = true;
        });
      }
      this.dialogMedia = true;
    },
    goToCreateAds() {
      this.dialogForm = true;
    },
    reloadListAds() {
      this.handleGetBanner();
    },
    async handleGetBanner() {
      let payload = {
        size: 10,
      };
      const response = await this.getNewsBanner(payload);
      const responseData = response.data.data;
      this.itemsPosition = responseData;
      console.log(response);
      const formattingList = responseData.map((ads) => {
        return {
          bannerName: ads.name,
          id: ads.id,
          media: ads.media,
        };
      });
      this.listAds = formattingList;
    },
    async handleGetBannerPosition() {
      const response = await this.getBannerPosition();
      console.log(response);
      this.listPosition = response.data.data;
    },
  },
};
</script>
