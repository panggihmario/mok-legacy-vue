<template>
  <div :class="d.right">
    <div>
      <div :class="d.icon">
        <v-icon
          color="black"
          @click="closeDialog"
          class="cursor-pointer"
          size="18px"
          >fas fa-times</v-icon
        >
      </div>
      <div v-if="isAdmin" :class="d['desc-container']">
       
        <div>
          <div :class="d.label">User</div> 
          <div :class="d['label-user']">@{{ item.createBy }}</div>
        </div>
       
        <textarea 
          :class="d['dg__text-area']" 
          v-model="modelDescription" 
          :readonly="isPublish"
        />
        <div >
          <custom-input 
            v-if="isPublish" 
            v-model="item.channel.name" 
            light 
            label="Channel"
            readonly
          />
          <div v-else>
            <custom-autocomplete
              :items="channels"
              item-text="name"
              label="Channel"
              return-object
              v-model="channelValue"
              outline
              light
            />
            <v-row>
              <v-col cols="6">
                <k-input 
                label="Link dari postingan ini" 
                v-model="modelFloatingLinkLabel" 
                placeholder="Title"
                rules="min:4"
              />
              </v-col>
              <v-col cols="6" >
                <k-input 
                  v-model="modelFloatingLink" 
                  label="-"
                  icon="fas fa-link"
                  placeholder="https:/...."
              />
              </v-col>
            </v-row>
          </div>
        </div>
        <!-- <k-select/> -->
      </div>
      <div v-else :class="d.desc">
        <span :class="d.user">{{ item.createBy }}</span>
        {{ item.description }}
      </div>
    </div>
    <!-- <v-expand-x-transition> -->
    <div v-if="isChanging">
      <custom-button
        size="small"
        color="kellygreen"
        @click="saveCaption"
        :loading="loading"
      >
        <div class="white--text">Simpan Perubahan</div>
      </custom-button>
      <div class="d-flex align-center mt-2">
        <div :class="d['warning-box']">
          <v-icon size="5px" color="white">fas fa-exclamation </v-icon>
        </div>
        <div :class="d['hint-save']">
          Klik tombol “Simpan Perubahan” agar caption terbaru dapat terpublish!
        </div>
      </div>
    </div>
    <!-- </v-expand-x-transition> -->
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      channels: [],
    };
  },
  props: {
    item: {
      type: Object,
    },
    description: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isChanging: {
      type: Boolean,
      default: false,
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
    floatingLinkLabel : {
      type : String
    },
    floatingLink : {
      type : String
    }
  },
  mounted() {
    this.getResponseChannel();
  },
  computed: {
    modelDescription: {
      get() {
        return this.description;
      },
      set(value) {
        this.$emit("setChange", true);
        this.$emit("input", value);
      },
    },
    modelFloatingLinkLabel : {
      get() {
        return this.floatingLinkLabel
      },
      set(value) {
        this.$emit("setChange", true);
        this.$emit('setFloatingLabel', value)
      }
    },
    modelFloatingLink : {
      get() {
        return this.floatingLink
      },
      set(value) {
        this.$emit("setChange", true);
        this.$emit('setFloatingLink', value)
      }
    },
    channelValue: {
      get() {
        return this.item.channel;
      },
      set(value) {
        this.$emit("setChange", true);
        this.item.channel = value;
      },
    },
  },
  methods: {
    ...mapActions({
      getAllChannel: "channel/getAllChannel",
    }),
    saveCaption() {
      this.loading = true;
      console.log(this.floatingLinkLabel, this.floatingLink)
      setTimeout(() => {
        this.$emit("saveCaption", this.channelValue);
        this.loading = false;
        this.$emit("setChange", false);
      }, 1500);
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    async getResponseChannel() {
      const response = await this.getAllChannel();
      if (response.status === 200) {
        const responseData = response.data.data;
        this.channels = responseData;
      } else {
        return response;
      }
    },
  },
};
</script>

<style src="./style.scss"  lang="scss" module="d">
</style>