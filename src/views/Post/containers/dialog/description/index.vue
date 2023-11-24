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
      <div v-if="isAdmin" >
        <div>
          <div :class="d.label">User</div> 
          <div :class="d['label-user']">@{{ item.createBy }}</div>
        </div>
        <k-textarea 
          v-model="modelDescription" 
          :counter="1000" 
          rules="required" 
          rows="5" 
          :disabled="isEditableAfterPublish"
        />
        
        <div v-if="isChanging" class="mt-2">
          <v-row>
            <v-col cols="6">
              <custom-button
                size="small"
                color="whitesnow"
                style="width : 100%"
                @click="onCancel"
              >
                <div >Batalkan Perubahan </div>
              </custom-button>
            </v-col>
            <v-col cols="6">
              <custom-button
                size="small"
                color="kellygreen"
                @click="saveCaption"
                :loading="loading"
                style="width : 100%" 
              >
                <div class="white--text">Simpan Perubahan</div>
              </custom-button>
            </v-col>
          </v-row>
          <div class="d-flex align-center mt-2">
            <div :class="d['warning-box']">
              <v-icon size="5px" color="white">fas fa-exclamation </v-icon>
            </div>
            <div :class="d['hint-save']">
              Klik tombol “Simpan Perubahan” agar caption terbaru dapat terpublish!
            </div>
          </div>
        </div>
        <div >
         
          <div class="mt-2" v-if="isEditableAfterPublish">
            <div :class="d['dg__label']">Channel</div>
            <div :class="d['dg__content-channel']">{{ item.channel.name }}</div>
            <v-row style="margin-top:5px">
              <v-col :cols="colsLevel">
                <LevelPicker
                  :levelPriority="levelPriority"
                  @setLevelPriority="setLevelPriority"
                  :isPublish="isPublish"
                />
              </v-col>
              <v-col :cols="cols">
                <ExpiredPicker
                  :humanDate="humanDate"
                  :sampleDate="sampleDate"
                  :timeSchedule="timeSchedule"
                  @setPickedDate="setPickedDate"
                  @setPickedTime="setPickedTime"
                  @setDate="setDate"
                />
              </v-col>
              <v-col class="d-flex align-center" cols="3" v-if="isChangingAfterPublish">
                <button @click="saveChanging" :class="d['dg__btn-edit']">{{ btnText }}</button>
              </v-col>
            </v-row>
            <div v-if="floatingLink">
              <div :class="d['dg__label']" class="mt-2">Floating Link</div>
              <div :class="d['dg__content-channel']"  class="mt-2"> {{ modelFloatingLinkLabel }}</div>
              <div :class="d['dg__link']" class="mt-2" >{{ modelFloatingLink }}</div>
            </div>
          </div>
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
                <LevelPicker
                  :levelPriority="levelPriority"
                  @setLevelPriority="setLevelPriority"
                />
              </v-col>
              <v-col v-if="isAdmin" cols="6">
                <ExpiredPicker
                  :humanDate="humanDate"
                  :sampleDate="sampleDate"
                  :timeSchedule="timeSchedule"
                  :expiredEpochDate="expiredEpochDate"
                  @setPickedDate="setPickedDate"
                  @setPickedTime="setPickedTime"
                  @setDate="setDate"
                  @setHumanDate=setHumanDate
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <k-input 
                  label="Link dari postingan ini" 
                  v-model="modelFloatingLinkLabel" 
                  placeholder="Title"
                  rules="min:4|max:30"
                  errorMessage='Min 4 and Max 30'
              />
              </v-col>
              <v-col cols="6" >
                <k-input 
                  v-model="modelFloatingLink" 
                  label="-"
                  icon="fas fa-link"
                  placeholder="https:/...."
                  :rules="{regex: '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'}"
                  errorMessage='Gunakan format link yang sesuai contohnya https://youtube.com'
                />
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div v-else :class="d.desc">
        <span :class="d.user">{{ item.createBy }}</span>
        {{ item.description }}
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import moment from "moment"
import ExpiredPicker from "./expiredPicker.vue"
import LevelPicker from "./levelPriority.vue"
export default {
  components : {
    ExpiredPicker,
    LevelPicker
  },
  data() {
    return {
      loading: false,
      channels: [],
      initDescription : '',
      itemsLevel : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      sampleDate : '',
      timeSchedule : '',
      menu : false,
      humanDate : '',
      menuLevel : false,
      cols : '6',
      colsLevel : '6',
      isChangingAfterPublish : false,
      btnText : 'Terapkan'
    };
  },
  watch : {
    initExpiredDate (value) {
      if(value) {
        const cek = moment(value).format("YYYY-MM-DD HH:mm");
        const split = cek.split(' ')
        this.sampleDate = split[0]
        this.timeSchedule = split[1]
        const [year, month, dates] = split[0].split("-");
        const f = `${dates}/${month}/${year}`;
        const format = `${f} ${split[1]}`;
        this.humanDate = format
      }else{
        return
      }
      
    }
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
    },
    levelPriority : {
      type : Number
    },
    expiredEpochDate : {
      type : [Number, String]
    },
    initExpiredDate : {
      type : Number
    },
    isSchedule : {
      type : Boolean,
      default : false
    }
  },
  mounted() {
    this.getResponseChannel();
  },
  computed: {
    isEditableAfterPublish () {
      if(this.isPublish) {
        return true
      }else if (this.isSchedule) {
        return true
      }else if(this.$route.name === 'schedule'){
        return true
      }else if(this.$route.name === 'list'){
        return true
      }
      else {
        return false
      }
    },
    level : {
      get() {
        return this.levelPriority
      },
      set(value) {
        this.$emit('setLevelPriority', value  )
      }
    },
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
        // this.$emit("setChange", true);
        this.$emit('setFloatingLabel', value)
      }
    },
    modelFloatingLink : {
      get() {
        return this.floatingLink
      },
      set(value) {
        // this.$emit("setChange", true);
        this.$emit('setFloatingLink', value)
      }
    },
    channelValue: {
      get() {
        return this.item.channel;
      },
      set(value) {
        // this.$emit("setChange", true);
        this.item.channel = value;
      },
    },
  },
  methods: {
    ...mapActions({
      getAllChannel: "channel/getAllChannel",
      updateDetailListKonten : 'post/updateDetailListKonten'
    }),
    setHumanDate (value) {
      this.humanDate = value
    },
    setDate () {
      const d = this.sampleDate
      const t = this.timeSchedule
      let schedule = `${d} ${t}`;
      const [year, month, dates] = d.split("-");
      const f = `${dates}/${month}/${year}`;
      const format = `${f} ${t}`;
      this.humanDate = format
      const epochMiliDate = moment(schedule, "YYYY-MM-DD HH:mm").add(7, "hours").valueOf()
      this.$emit('setExpiredDatePayload', epochMiliDate)
      if(this.isEditableAfterPublish) {
        this.isChangingAfterPublish = true
        this.cols = '5'
        this.colsLevel = '4'
      }
    },
    setPickedDate (value) {
      this.sampleDate = value
    },
    setPickedTime (value) {
      this.timeSchedule = value
    },
    setLevelPriority (value) {
      if(this.isEditableAfterPublish) {
        this.isChangingAfterPublish = true
        this.cols = '5'
        this.colsLevel = '4'
        this.$emit('setLevelPriority', value )
      }else{
        // this.$emit("setChange", true);
        this.$emit('setLevelPriority', value )
      }
    },
    onCancel () {
      this.$emit("setChange", false);
      this.$emit('onCancelCaption')
    },
    saveCaption() {
      this.loading = true;
      setTimeout(() => {
        this.$emit("saveCaption", this.channelValue);
        this.loading = false;
        this.$emit("setChange", false);
      }, 1500);
    },
    saveChanging () {
      this.btnText = 'Loading..'
      const payload = {
        levelPriority : this.levelPriority,
        expiredAt : this.expiredEpochDate, 
      }
      setTimeout(() => {
        if(this.isSchedule || this.$route.name ===  'schedule' ) {
          this.$emit('saveCaption', this.channelValue)
        }else{
          this.$emit("saveChanging", payload);
        }
        this.btnText = 'Terapkan';
        this.cols = '6'
        this.colsLevel = '6'
        this.isChangingAfterPublish = false
      }, 1500);
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    async getResponseChannel() {
      
      const response = await this.getAllChannel();
      if (response.status === 200) {
        this.initDescription = this.description
        const responseData = response.data.data;
        this.channels = responseData;
      } else {
        return response;
      }
    },
  },
}; 
</script>

<style src="../style.scss"  lang="scss" module="d">
</style>