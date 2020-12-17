<template>
  <div>
    <HeaderContent label="List Iklan">
      <custom-button color="primary" class="white--text" @click="goToCreateAds">
        Buat Iklan
      </custom-button>
      <custom-button color="primary" class="white--text ml-4" @click="openPositionModal">
        Buat Posisi Iklan
      </custom-button>
    </HeaderContent>
    <div style="width : 70%">
      <v-data-table hide-default-footer :headers="headers" :items="listAds">
        <template v-slot:item.media="{ item }">
          <div
            class="primary--text caption"
            style="cursor:pointer"
            @click="openDialogMedia(item)"
          > 
            Lihat 
          </div>
        </template>
        <template v-slot:item.position="{item}" >
          <v-edit-dialog
            :return-value.sync="item.position"
            @save="save(item)"
            large
            persistent
            @open="openEditPosition"
          >
            {{item.position && item.position.name}}
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
    DialogPosition
  },
  data() {
    return {
      listAds: [],
      dialogMedia : false,
      dialogForm : false,
      dialogPosition : false,
      itemsPosition : [],
      position : {},
      imageAds : '',
      headers: [
        {
          text: "Nama",
          value: "bannerName",
          width : '300'
        },
        {
          text: "Media",
          value: "media",
          // align : 'center',
          width : '150'
        },
        {
          text: "Posisi",
          value: "position",
        },
      ],
    };
  },
  mounted() {
    this.handleGetBanner();
  },
  methods: {
    async save(item) {
      const params = {
        name : item.position.name,
        banner : {
          id : item.id
        }
      }
      const payload = {
        params,
        id : item.position.id
      }
      const response = await this.editBannerPosition(payload)
      if(response.status === 200) {
        this.handleGetBanner()
      }
    },
    async openEditPosition() {
      const response = await this.getBannerPosition()
      if(response.status === 200) {
        const responseData = response.data.data
        this.itemsPosition = responseData
      }
    },
    ...mapActions({
      getNewsBanner: "ads/getNewsBanner",
      getBannerPosition : "ads/getBannerPosition",
      editBannerPosition : "ads/editBannerPosition"
    }),
    closeDialogPosition(params) {
      this.dialogPosition = params
    },
    closeDialogForm(params) {
      this.dialogForm = params
    },
    closeDialogMedia(params) {
      this.dialogMedia = params
      this.imageAds = ''
    },
    openPositionModal() {
      this.dialogPosition = true
    },
    openDialogMedia(item) {
      if(item.media.length > 0) {
        const [data] = item.media
        this.imageAds = data.url
        this.$nextTick(() => {
          this.dialogMedia = true
        })
      }
      this.dialogMedia = true
      
    },
    goToCreateAds() {
      this.dialogForm  = true
    },
    reloadListAds() {
      this.handleGetBanner()
    },
    async handleGetBanner() {
      let payload = {
        size: 10,
      };
      const response = await this.getNewsBanner(payload);
      if (response.status === 200) {
        const responsePosition = await this.getBannerPosition()
        if(responsePosition.status === 200) {
          const responsePositionData = responsePosition.data.data
          const responseData = response.data.data;
          const formatingList = responseData.map((ads) => {
            for(let i =0; i<responsePositionData.length ;i++) {
              if(responsePositionData[i].banner){
                if(responsePositionData[i].banner.id === ads.id) {
                  return {
                    bannerName: ads.name,
                    id: ads.id,
                    media: ads.media,
                    position : responsePositionData[i]
                  }
                }
              }
              
            }
            return {
              bannerName: ads.name,
              id: ads.id,
              media: ads.media,
              position : ''
            };
          })
          this.listAds = formatingList;
        }
        
      }
    },
  },
};
</script>