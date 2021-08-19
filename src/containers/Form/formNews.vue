<template>
  <div>
    <v-row align="center">
      <v-col md="7">
        <custom-textarea
          label="Headline"
          v-model="payloadNews.headline"
          :value="payloadNews.headline"
          rules="required"
          name="Headline"
          counter
        />
      </v-col>
      <v-col md="5" class="d-flex">
        <div>
          <custom-upload
            class="mb-1 ml-4"
            id="upload-editor"
            @response="getImage"
            style="display: none"
          />
          <div
            @click="uploadImage('upload-editor')"
            class="form__container-image ml-4"
          >
            <v-img
              contain
              v-if="image"
              :src="image"
              max-height="100%"
              max-width="100%"
              :aspect-ratio="1"
            ></v-img>
            <div v-else>
              <v-icon size="18px" color="secondary">$upload</v-icon>
              <span class="ml-2 text-secondary">Foto / Video</span>
              <v-progress-linear
                color="secondary"
                indeterminate
                rounded
                height="6"
                v-if="visible"
              />
            </div>
          </div>
        </div>

        <div>
          <custom-upload
            class="mb-1 ml-4"
            id="upload-thumbnail"
            @response="getImageThumbnail"
            style="display: none"
            typeUpload="thumbnails"
          />
          <div
            @click="uploadImage('upload-thumbnail')"
            class="form__container-image ml-4"
          >
            <v-img
              contain
              v-if="thumbnailImage"
              :src="thumbnailImage"
              max-height="100%"
              max-width="100%"
              :aspect-ratio="1"
            ></v-img>
            <div v-else>
              <v-icon size="18px" color="secondary">$upload</v-icon>
              <span class="ml-2 text-secondary">Thumbnail</span>
              <v-progress-linear
                color="secondary"
                indeterminate
                rounded
                height="6"
                v-if="visibleThumbnail"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row :style="{ marginTop: '-20px' }">
      <v-col cols="7">
        <custom-input
          label="Judul"
          v-model="payloadNews.title"
          :value="payloadNews.title"
          rules="required"
          name="Title"
        />
        <text-editor
          v-model="payloadNews.content"
          :value="payloadNews.content"
          rules="required"
          name="Content"
        />
        <custom-input
          label="Tag Artikel"
          placeholder="Tag"
          v-model="payloadNews.newsTagString"
        />
        <custom-input label="Keyword Meta" v-model="payloadNews.metaKeyword" />
      </v-col>
      <v-col cols="5">
        <div class="ml-4">
          <custom-select
            label="Kategori News"
            placeholder="Kategori"
            :items="categoryNews"
            v-model="payloadNews.newsCategory"
            :value="payloadNews.newsCategory"
            return-object
            item-text="name"
            rules="required"
            name="Kategori"
          />
          <icon-input
            label="Sumber Artikel Utama"
            v-model="payloadNews.linkReference"
            :value="payloadNews.linkReference"
            name="Link Refrence"
            :rules="{ regex: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi }"
          />
          <icon-input :disabled="true" label="Artikel Terkait 1" />
          <icon-input :disabled="true" label="Artiket Terkait 2" />
          <v-checkbox
            v-model="payloadNews.isScheduled"
            :label="`Publikasi Terjadwal`"
            :disabled="!schedule"
          />
          <custom-input
            @focus="openDate"
            :disabled="!schedule"
            :value="humanDate"
            readonly
          />

          <v-dialog persistent v-model="dialogDate" max-width="650">
            <v-card>
              <v-card-text>
                <div class="d-flex justify-space-between form__dialog-date">
                  <div>
                    <v-date-picker v-model="scheduleDate" color="primary" />
                  </div>
                  <div>
                    <v-time-picker v-model="scheduleTime" ampm-in-title />
                  </div>
                </div>
                <div class="d-flex justify-space-between form__dialog-date">
                  <div class="form__date-box">
                    {{ newFormatDate }} {{ scheduleTime }}
                  </div>
                  <div>
                    <custom-button @click="cancelSchedule">
                      <span class="form__dialog-button">Batalkan</span>
                    </custom-button>
                    <custom-button
                      color="primary"
                      @click="setSchedule"
                      class="ml-4"
                    >
                      <span class="form__dialog-button"
                        >Jadwalkan Publikasi</span
                      >
                    </custom-button>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    payloadNews: {
      type: Object,
    },
    propsImage: {
      type: String,
    },
    loadingDraft: {
      type: Boolean,
    },
    categoryNews: {
      type: Array,
    },
    propsThumbnail: {
      type: String,
    },
    schedule: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    status() {
      if (this.payloadNews.medias.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    newFormatDate() {
      if (this.scheduleDate) {
        const [year, month, date] = this.scheduleDate.split("-");
        const f = `${date}/${month}/${year}`;
        return f;
      } else {
        return null;
      }
    },
  },
  data() {
    return {
      dialog: false,
      image: "",
      visible: false,
      thumbnailImage: "",
      visibleThumbnail: false,
      checkbox: false,
      dialogDate: false,
      scheduleDate: "",
      scheduleTime: "",
      humanDate: "",
    };
  },
  methods: {
    uploadImage(id) {
      document.getElementById(id).click();
    },
    setSchedule() {
      let schedule = `${this.scheduleDate} ${this.scheduleTime}`;
      // const epochDate = moment(schedule, "YYYY-MM-DD HH:mm").unix();
      const epochDate = moment(schedule, "YYYY-MM-DD HH:mm").add(7, 'hours').unix()
      // console.log({test})
      const [year, month, date] = this.scheduleDate.split("-");
      const f = `${date}/${month}/${year}`;
      const miliEpoch = epochDate * 1000;
      this.humanDate = `${f} ${this.scheduleTime}`;
      this.$emit("getEpochDate", miliEpoch);
      this.dialogDate = false;
    },
    cancelSchedule() {
      this.dialogDate = false;
    },
    openDate() {
      if (this.payloadNews.isScheduled) {
        this.dialogDate = true;
      }
    },
    getImageThumbnail(payload) {
      if (payload.status === "success") {
        this.thumbnailImage = payload.response.url;
        this.$emit("getThumbnail", payload.response);
        this.visibleThumbnail = false;
      }
      else if(payload.status === 'failed') {
        this.visibleThumbnail = false
      }
      else {
        this.visibleThumbnail = true;
      }
    },
    getImage(payload) {
      this.image = "";
      if (payload.status === "success") {
        this.image = payload.response.thumbnail.medium;
        this.$emit("getImageUpload", payload.response);
        this.visible = false;
      }
      else if(payload.status === 'failed') {
        this.visible = false
      }
      else {
        this.visible = true;
      }
    },
  },
  watch: {
    propsImage() {
      this.image = this.propsImage;
    },
    propsThumbnail() {
      this.thumbnailImage = this.propsThumbnail;
    },
  },
};
</script>

<style lang="sass" scoped>
.form
  &__container-image
    width: 180px
    height: 126px
    background: #FFFFFF
    border: 1px dashed #1890FF
    box-sizing: border-box
    border-radius: 4px
    display: flex
    justify-content: center
    align-items: center
    color: #1890FF
    font-size: 12px
    font-weight: 500
    cursor: pointer
  &__image
    max-width: 100%
    max-width: 100%
    overflow: hidden
  &__container-date
    display: flex
    justify-content: center
  &__dialog-button
    font-size: 12px
  &__dialog-date
    width: 100%
    padding-top: 24px
  &__date-box
    border: 1px solid #DDDDDD
    border-radius: 4px
    width: 180px
    height: 40px
    display: flex
    align-items: center
    padding-left: 10px
    color: #4A4A4A
    font-size: 12px
    font-weight: 500
</style>
