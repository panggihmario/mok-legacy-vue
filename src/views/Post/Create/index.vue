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
            <Upload :id="`post-${idx}`" @saveImageOnPayload="saveImageOnPayload" />
          </div>
        </div>
        <k-textarea title="Caption" v-model="description" :counter="1000" rules="required" rows="8" />
        <!-- <custom-textarea label="Caption" name="Caption" counter v-model="description" :value="description"
          rules="required|max:1000" /> -->
        <v-row>
          <!-- <v-col cols="6">
            <custom-autocomplete :value="channel" v-model="channel" :items="channels" item-text="name" label="Channel"
              return-object />
          </v-col> -->
          <v-col cols="6">
            <k-autocomplete 
            :items="channels" 
            v-model="channel" 
            itemText="name"
            label="Channel"
            rules="required"
           />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <k-input 
            label="Link dari postingan ini" 
            v-model="title" 
          />
          </v-col>
          <v-col cols="6" style="margin-top : auto">
            <k-input 
              v-model="title" 
              icon="fas fa-link"
          />
          </v-col>
        </v-row>
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
    saveImageOnPayload(params) {
      this.$set(this.medias, params.position, params.response);
    },
    emitedFilter(value) {
      this.channels = value
    },
    submitForm() {
      this.loading = true;
      const payloadMedias = this.medias.filter((m) => {
        if (m.url) {
          return m;
        }
      });
      const payload = {
        type: "social",
        medias: [...payloadMedias],
        product: null,
        channel: this.channel,
        description: this.description,
      };

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
  },
};
</script>

<style lang="scss" scoped>
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
</style>
