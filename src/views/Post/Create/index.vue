<template>
  <div>
    <custom-form :onSubmit="submitForm">
      <HeaderContent label="Post Feed" :list="list">
        <custom-button color="secondary" class="white--text" size="small" type="submit" :loading="loading">
          Submit Post
        </custom-button>
      </HeaderContent>
      <div style="width: 584px">
        <div class="d-flex mb-4">
          <div v-for="(d, idx) in medias" :key="idx" class="mr-4">
            <Upload :id="`post-${idx}`" @saveImageOnPayload="saveImageOnPayload" @displayWarning="displayWarning" />
          </div>
        </div>
        <div v-if="isWarning" class="warning-box">
          <v-icon size="15px" color="warning">fas fa-exclamation-triangle</v-icon>
          <div>
            Video ini memiliki resolusi rendah, klik tombol “Gukanan Video” untuk tetap menggunakan video ini, atau klik
            “Ubah Video” jika ingin mengganti dengan video lain
          </div>
        </div>

        <div v-if="!isMediasExist" class="error-message warning--text">Medias are required!</div>

        <k-textarea title="Caption" v-model="description" :counter="1000" rules="required" rows="8"
          errorMessage="Caption is required" />
        <v-row>
          <v-col cols="6">
            <k-autocomplete :items="channels" v-model="channel" itemText="name" label="Channel" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- // <v-list-item-content  color="secondary" dense >
                    //   <v-list-item-title  v-html="data.item.label"></v-list-item-title>
                    // </v-list-item-content> -->
            <!-- <div>Feed Label</div>
            <v-autocomplete
              v-model="selected"
              :items="testLabels"
              outlined
              chips
              color="secondary"
              dense
              item-text="label"
              item-value="label"
              multiple
              hide-details
            >
            <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'" >
                  <v-list-item-content> {{ data.item }} </v-list-item-content>
                </template>
                <template v-else>
               
                    <div>
                      {{ data.item.label }}
                    </div>
                 
                </template>
              </template>
          </v-autocomplete> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <k-input label="Link dari postingan ini" v-model="floatingLinkLabel" placeholder="Title" rules="min:4|max:30"
              errorMessage='Min 4 and Max 30' />
          </v-col>
          <v-col cols="6">
            <k-input v-model="floatingLink" label="-" icon="fas fa-link" placeholder="https:/...."
              :rules="{ regex: '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})' }"
              errorMessage='Gunakan format link yang sesuai contohnya https://youtube.com' />
          </v-col>
        </v-row>
        <div class="error-link" v-if="isLink">Kedua Field Link Harus Diisi</div>
      </div>
      <v-snackbar v-model="alertSucces" top right color="success">
        Success Post
      </v-snackbar>
      <v-snackbar v-model="alertFailed" top right color="error">
        Failed Post
      </v-snackbar>
    </custom-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Upload from "./upload.vue";
import HeaderContent from "@/containers/HeaderContent";
export default {
  components: {
    HeaderContent,
    Upload,
  },
  data() {
    return {
      description: "",
      selected : [],
      isLink: false,
      isWarning: false,
      isMediasExist: true,
      title: '',
      testUrl: "",
      file: "",
      urlUpload: "https://test-api-upload.kipaskipas.com/api/v1",
      visibleThumbnail: false,
      list: [
        {
          text: "Konten Feed",
          disabled: true,
        },
      ],
      medias: [{}, {}, {}, {}, {}],
      channels: [],
      channel: null,
      loading: false,
      alertSucces: false,
      alertFailed: false,
      dataChannel: null,
      floatingLinkLabel: '',
      floatingLink: '',
      testLabels : [],
      friends : [],
      labels: [
        {
          id: 1,
          parentId: null,
          label: "Sport",
          root: null,
          totalChild: 3,
          child: [
            {
              id: 11,
              parentId: 1,
              label: "Bola",
              root: "011, 111",
              totalChild: 0
            },
            {
              id: 12,
              parentId: 1,
              label: "Basket",
              root: "011, 111",
              totalChild: 0
            },
            {
              id: 13,
              parentId: 1,
              label: "Voli",
              root: "011, 111",
              totalChild: 0
            }
          ]
        },
        {
          id: 2,
          parentId: null,
          label: "Entertainment",
          root: null,
          level: 0,
          totalChild: 3,
          child: [
            {
              id: 21,
              parentId: 2,
              label: "Musik",
              root: "011, 111",
              totalChild: 0
            },
            {
              id: 22,
              parentId: 2,
              label: "Film",
              root: "011, 111",
              totalChild: 0
            },
            {
              id: 23,
              parentId: 2,
              label: "Show",
              root: "011, 111",
              totalChild: 0
            }
          ]
        }
      ]
    };
  },

  computed: {
    ...mapState({
      role: (state) => state.authentication.role,
    }),
  },
  methods: {
    ...mapActions({
      getChannel: "channel/getListChannel",
      postFeed: "post/postFeed",
      getAllChannel: "channel/getAllChannel",
    }),
    displayWarning(value) {
      this.isWarning = value
    },
    saveImageOnPayload(params) {
      this.$set(this.medias, params.position, params.response);
    },
    emitedFilter(value) {
      this.channels = value
    },
    checkMediasAreExist() {
      const payloadMedias = this.medias.filter((m) => {
        if (m.url) {
          return m;
        }
      });
      return payloadMedias
    },
    setPayloadForPostFeed(payloadMedias) {
      const payload = {
        type: "social",
        medias: [...payloadMedias],
        product: null,
        channel: this.channel,
        description: this.description,
        floatingLink: this.floatingLink,
        floatingLinkLabel: this.floatingLinkLabel
      };
      return payload
    },
    checkFloatingUrl() {
      if (this.floatingLink && this.floatingLinkLabel || !this.floatingLink && !this.floatingLinkLabel) {
        return true
      } else {
        return false
      }
    },
    handlePostApi(payload) {
      return this.postFeed(payload)
        .then(() => {
          this.alertSucces = true;
          setTimeout(() => {
            this.alertSucces = false;
            this.loading = false;
            this.$router.push({
              name: "draft",
              params: {
                page: 1,
              },
            });
          }, 1500);
        })
        .catch(() => {
          this.loading = false;
          this.alertFailed = true;
          setTimeout(() => {
            this.alertFailed = false;
          }, 1500);
        });
    },
    submitForm() {
      this.loading = true;
      const medias = this.checkMediasAreExist()
      if (medias.length > 0) {
        this.isMediasExist = true
        const payload = this.setPayloadForPostFeed(medias)
        console.log(payload)
        const isFloatinUrl = this.checkFloatingUrl()
        if (isFloatinUrl) {
          this.isLink = false
          return this.handlePostApi(payload)
        } else {
          this.isLink = true
          this.loading = false
          setTimeout(() => {
            this.isLink = false
          }, 1800)
        }
      } else {
        this.isMediasExist = false
        this.loading = false
        setTimeout(() => {
          this.isMediasExist = true
        }, 1500)
      }
    },
    async getResponseChannel() {
      const response = await this.getAllChannel();
      if (response.status === 200) {
        const responseData = response.data.data;
        const formatResponse = responseData.map((d) => {
          return {
            name: d.name,
            id: d.id,
          };
        });
        this.channels = responseData;
      } else {
        return response;
      }
    },
  },
  mounted() {
    this.getResponseChannel();
    // console.log(this.labels)
    const labelsData = this.labels
    let arrLabel = []
    labelsData.forEach(data => {
      let group = {
        header : data.label
      }
      arrLabel.push(group)
      data.child.forEach(c => {
        arrLabel.push(c)
      })
    })
    this.testLabels = arrLabel
    // console.log(arrLabel)
  },
};
</script>

<style lang="scss" scoped>
  .v-list .v-list-item--active { 
  background-color: green!important; 
}

.image-box {
  width: 104px;
  height: 104px;
  background: #ffffff;
  border: 1px dashed #1890ff;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1890ff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.select-label {
  border-radius: 6px;
  border: 1px solid #bbbbbb;
  background: var(--White, #FFF);
  padding: 4px;
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.error-link {
  color: $warning;
  transition: 0.3s ease-in-out;
  font-size: 12px;
  font-weight: 400;
  margin-top: 5px;
}

.warning-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #FFEBEF;
  border: 1px solid #FA7F96;
  border-radius: 4px;
  color: #000000;
  font-size: 11px;
  font-weight: 500;
  padding: 6px;
  margin: 4px 0 16px 0;
}

.error-message {
  font-size: 11px;
  font-weight: 500;
}
</style>
