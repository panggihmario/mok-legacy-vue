<template>
  <tr>
    <td>
      <input style="width: 20px" type="checkbox" :value="item" v-model="choosenItem" />
    </td>
    <td @mouseover="onHover(item)" @mouseleave="onLeave" @mousemove="getPosition" @mouseout="stopTracking">
      <LinkDialog 
        :item="item" 
        @refreshDataFeed="refreshDataFeed" 
        :isAdmin="true" 
        :feeds="feeds" 
        :levelPriority="levelPriority"
        @setLevelPriority="setLevelPriority"
      />
      <div v-if="item.id === selectedItem" :class="feed['tb__hover-image']" id="displayAreaDraft"
        :style="{ top: `${((item.index + 1) * 100 - ((item.index * 50 + (item.index * 20))))}px` }">
        <img :src="thumbnailImage" :class="feed['tb__image']" />
      </div>
    </td>
    <td>
      <div :class="feed['tb__caption']">{{ item.description }}</div>
    </td>
    <td>
      <div :class="feed['tb__caption']">{{ item.channel && item.channel.name }}</div>
    </td>
    <td>
      <div :class="feed['tb__caption']">
        {{ formatingDate(item.submittedAt) }}
      </div>
    </td>
  <td>
    <div :class="feed['tb__caption']">{{ item.createBy }}</div>
  </td>
  <td>
    <SchedulePicker 
      :item="item" 
      @refreshDataFeed="refreshDataFeed" 
      @setEpochDate="setEpochDate" 
    />
  </td>
  <td>
    <LevelPicker :levelPriority="levelPriority" @setLevelPriority="setLevelPriority" />
  </td>
  <td>
    <DatePicker :item="item" @refreshDataFeed="refreshDataFeed" @setEpochDate="setExpiredDate" />
  </td>
  <td>
    <Actions 
      :item="item" 
      @refreshDataFeed="refreshDataFeed" 
      :epochDate="epochDate" 
      :expiredDate="expiredDate"
      :levelPriority="levelPriority"
    />
  </td>
</tr>
 
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Picker from "./datePicker.vue";
import Actions from "./actions.vue";
import LinkDialog from "../../containers/dialog/index.vue";
import moment from "moment";
import SchedulePicker from "./actionsPicker.vue";
import actions from "./actions.vue";
import LevelPicker from "./levelPicker.vue";
import DatePicker from "./datePicker.vue";
export default {
  data () {
    return  {
      levelPriority : null,
      epochDate : null,
      selectedItem : null,
      thumbnailImage : '',
      expiredDate : null,
    }
  },
  computed : {
    choosenItem : {
      get () {
        return this.selected
      },
      set(value) {
        this.$emit('setSelectedItem' , value)
      }
    },
    ...mapState({
      feeds: (state) => state.post.feeds,
    }),
  },
  components : {
    LinkDialog,
    SchedulePicker,
    Actions : actions,
    Picker,
    LevelPicker,
    DatePicker
  },
  props : {
    item : {
      type : Object
    },
    selected : {
      type : Array
    },
  },
  methods : {
    ...mapActions({
      fetchFeedById: "post/fetchFeedById",
      multipleReject : 'post/multipleReject',
      fetchFeeds: "post/fetchFeeds",
    }),
    setEpochDate(value) {
      this.epochDate = value
    },
    setExpiredDate (value) {
      this.expiredDate = value
    },
    setLevelPriority (value) {
      this.levelPriority = value
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    onHover(item) {
      this.selectedItem = item.id
      return this.fetchFeedById(item.id).then((response) => {
        const medias = response.medias
        const [media] = medias
        const thumbnail = media.thumbnail.large
        this.thumbnailImage = thumbnail
      });
    },
    getPosition(e) {
      const x = e.clientX;
      const y = e.clientY;
      document.getElementById("displayAreaDraft").style.left = (x - 246) + 'px';
    },
    stopTracking() {

    },
    onLeave() {
      this.selectedItem = null
      this.thumbnailImage = ""
    },
    refreshDataFeed() {
      this.$emit("refreshDataFeed");
      this.levelPriority = null
    },
  }
}
</script>


<style lang="scss" module="feed">
.my-table thead th {
  background-color: #fafafa;
  // &:first-child { border-radius: 10px 0 0 0; }
  // &:last-child { border-radius: 0 10px 0 0; }
}
.fonts {
  font-size: 12px;
  font-weight: 500;
  color: #777777;
}

.tb {
  &__hover-image {
    position: absolute;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.1);
    left: 25px;
    z-index: 999;
    width: 141px;
    height: 172px;
    border-radius: 16px;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    max-width: 100%;
    border-radius: 8px;
    max-height: 100%;
  }

  &__td {
    position: relative;
  }

  &__caption {
    @extend .fonts;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 150px;
  }

  &__schedule {
    background: #ffffff;
    border: 0.6px solid #bbbbbb;
    border-radius: 4px;
    box-sizing: border-box;
    width: 138px;
    height: 24px;
    padding: 6px;
    font-size: 10px;
    cursor: pointer;
  }

  &__schedule:focus {
    border: 0.6px solid #bbbbbb;
    outline: none;
  }

  &__icon-input {
    position: absolute;
    right: 35px;
    bottom: 3px;
  }
}
</style>

<style src="../../style.scss" lang="scss" module="ad"></style>