<template>
  <div :class="d.right">
    <div>
      <div :class="d.icon">
        <v-icon 
          color="black" 
          @click="closeDialog" 
          class="cursor-pointer"
          size="18px">fas fa-times</v-icon>
      </div>
      <div v-if="isAdmin" :class="d['desc-container']">
        <div>
          <div :class="d.label">User</div>
          <div :class="d['label-user']">@{{ item.createBy }}</div>
        </div>
        <textarea
          :class="d['dg__text-area']"
          v-model="modelDescription"
        />
        <div style="width : 250px">
          <custom-autocomplete
            :items="channels"
            item-text="name"
            label="Channel"
            return-object
            v-model="channelValue"
            outline
            light
          />
        </div>

      </div>
      <div v-else :class="d.desc">
        <span :class="d.user">{{ item.createBy }}</span>
        {{ item.description }}
      </div>
    </div>
    <!-- <v-expand-x-transition> -->
    <div v-if="isTyping">
       
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
        <div :class="d['hint-save']">Klik tombol “Simpan Perubahan” agar caption terbaru dapat terpublish!</div>
      </div>
    </div>
    <!-- </v-expand-x-transition> -->
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  data () {
    return {
      isTyping : false,
      loading : false,
      channels : []
    }
  },
  props : {
    item : {
      type : Object
    },
    description : {
      type : String
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  mounted () {
    this.getResponseChannel();
  },
  computed : {
    modelDescription : {
      get () {
        return this.description
      },
      set(value) {
        this.isTyping = true
        this.$emit('input', value)
      }
    },
    channelValue : {
      get() {
        return this.item.channel
      },
      set(value) {
        this.isTyping = true
        this.item.channel = value
      }
    }
  },
  methods : {
    ...mapActions({
      getAllChannel: "channel/getAllChannel",
    }),
    saveCaption() {
      this.loading = true
      setTimeout(() => {
        this.isTyping = false
        this.$emit('saveCaption' , this.channelValue)
        this.loading = false
      },1500)
    },
    closeDialog () {
      this.$emit('closeDialog')
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
  }
}
</script>

<style src="./style.scss"  lang="scss" module="d">

</style>