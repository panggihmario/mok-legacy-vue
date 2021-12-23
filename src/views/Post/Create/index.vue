<template>
  <div>
    <custom-form :onSubmit="submitForm">
      <HeaderContent label="Post Feed" :list="list">
        <custom-button 
          color="secondary" 
          class="white--text" 
          size="small"
          type="submit"
          :loading="loading"
        >
          Submit Post
        </custom-button>
      </HeaderContent>
      <div class="d-flex mb-4">
        <div 
          v-for="(d, idx) in medias" :key="idx" 
          class="mr-4"
        >
        <Upload
          :id="`post-${idx}`"
          @saveImageOnPayload="saveImageOnPayload"
        />
        </div>
      </div>
      <div style="width : 584px">
        <custom-textarea
          label="Caption"
          name="Caption"
          counter
          v-model="description"
          :value="description"
          rules="required|max:1000"
        />
      </div>

      <div style="width : 250px">
        <custom-select
          return-object
          label="Channel"
          :items="channels"
          item-text="name"
          v-model="channel"
          rules="required"
          name="Channel"
          :value="channel"
        />
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
    Upload
  },
  data() {
    return {
      description : '',
      visibleThumbnail : false,
      list: [
        {
          text: "Konten Feed",
          disabled: true,
        },
      ],
      medias : [{}, {}, {}, {}, {}],
      channels: [],
      channel : null,
      loading: false,
      alertSucces: false,
      alertFailed: false,
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
      this.$set(this.medias, params.position , params.response)
    },
    submitForm() {
      this.loading = true
      const payloadMedias = this.medias.filter(m => {
        if(m.url) {
          return m
        }
      })
      const payload = {
        type : 'social',
        medias  : [...payloadMedias],
        product : null,
        channel : this.channel,
        description : this.description
      }
      return this.postFeed(payload)
        .then(() => {
          this.alertSucces = true
          setTimeout(() => {
            this.alertSucces = false
            this.loading = false
            this.$router.push({
              name : 'draft',
              params : {
                page : 1
              }
            })
          }, 1500)
        })
        .catch(() => {
          this.loading = false
          this.alertFailed = true
          setTimeout(() => {
            this.alertFailed = false
          }, 1500)
        })
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
        this.channels = formatResponse;
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
  background: #FFFFFF;
  border: 1px dashed #1890FF;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1890FF;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
</style>
