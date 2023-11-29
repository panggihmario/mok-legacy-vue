<template>
  <tr>
    <td :class="feed['tb__border']">
      <input style="width: 20px" type="checkbox" :value="item" v-model="choosenItem" />
    </td>
    <td :class="feed['tb__border']" @mouseover="onHover(item)" @mouseleave="onLeave" @mousemove="getPosition"
      >
      <LinkDialog 
        @refreshDataFeed="refreshDataFeed" 
        :item="item" 
        :isAdmin="true" :feeds="feeds" 
        :levelPriority="levelPriority"
        :expiredDate="expiredDate"
      />
      <div v-if="item.id === selectedItem" :class="feed['tb__hover-image']" id="displayAreaDraft"
        :style="{ top: `${((item.index + 1) * 100 - ((item.index * 50 + (item.index * 20))))}px` }">
        <img :src="thumbnailImage" :class="feed['tb__image']" />
      </div>
    </td>
    <td :class="feed['tb__border']">
      <div :class="feed['tb__caption']">{{ item.description }}</div>
    </td>
    <td :class="feed['tb__border']">
      <div :class="feed['tb__caption']">{{ item.channel && item.channel.name }}</div>
    </td>
    <td :class="feed['tb__border']">
      <div :class="feed['tb__caption']">
        {{ formatingDate(item.submittedAt) }}
      </div>
    </td>
    <td :class="feed['tb__border']">
      <div :class="feed['tb__caption']">{{ item.createBy }}</div>
    </td>
    <td :class="feed['tb__border']">
      <DatePicker 
        :item="item" 
        @refreshDataFeed="refreshDataFeed" 
        @setEpochDate="setScheduleTime"
        labelBtn="Jadwalkan Publikasi"
      />
    </td>
    <td :class="feed['tb__border']">
      <LevelPicker 
        :levelPriority="levelPriority" 
        :feeds="feeds" 
        :item="item" 
        @setLevelPriority="setLevelPriority"
      />
      <!-- <Actions  :item="item" @refreshDataFeed="refreshDataFeed" /></td> -->
    </td>
    <td :class="feed['tb__border']">
      <DatePicker 
        :item="item" 
        @refreshDataFeed="refreshDataFeed" 
        @setEpochDate="setExpired"
        labelBtn="Jadwalkan Publikasi"
      />
    </td>
    <td :class="feed['tb__border']">
      <Actions
        :item="item" 
        :levelPriority="levelPriority"
        :scheduledTime="scheduledTime"
        :expiredDate="expiredDate"
        @refreshDataFeed="refreshDataFeed" 
      />
    </td>
</tr>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Actions from "./actions.vue";
import LinkDialog from "../../containers/dialog/index.vue";
import moment from "moment";
import LevelPicker from "./levelPicker.vue";
import DatePicker from "./datePicker.vue";

export default {
  components : {
    Actions,
    LinkDialog,
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
  data () {
    return {
      selectedItem : null,
      levelPriority : null,
      selectedItem : null,
      thumbnailImage : '',
      expiredDate : null,
      scheduledTime : null
    }
  },
  computed :{
    ...mapState({
      feeds: (state) => state.post.feeds,
    }),
    choosenItem : {
      get () {
        return this.selected
      },
      set(value) {
        this.$emit('setSelectedItem' , value)
      }
    },
  },
  methods : {
    ...mapMutations({
      setFeeds : 'post/setFeeds'
    }),
    ...mapActions({
      fetchFeedById: "post/fetchFeedById",
      multipleReject : 'post/multipleReject',
      fetchFeeds: "post/fetchFeeds",
    }),
    setLevelPriority (value ) {
      this.levelPriority = value
      const feedsTemp = this.feeds
      const format = feedsTemp.map(feed => {
        if(feed.id === this.item.id) {
          return {
            ...feed,
            levelPriority : value
          }
        }else{
          return {
            ...feed
          }
        }
      })
      this.setFeeds(format)
    },
    setScheduleTime (value) {
      this.scheduledTime = value
    },
    setExpired (value) {
      this.expiredDate = value
      const feedsTemp = this.feeds
      const format = feedsTemp.map(feed => {
        if(feed.id === this.item.id) {
          return {
            ...feed,
            expiredAt : value
          }
        }else{
          return {
            ...feed
          }
        }
      })
      this.setFeeds(format)
    },
    refreshDataFeed () {
      this.$emit("refreshDataFeed");
      this.levelPriority = null
    },
    formatingDate (rawDate) {
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
    onLeave() {
      this.selectedItem = null
      this.thumbnailImage = ""
    },
    getPosition(e) {
      const x = e.clientX;
      const y = e.clientY;
      document.getElementById("displayAreaDraft").style.left = (x - 246) + 'px';
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
  &__border {
    border-bottom: 1px solid var(--White-Smoke, #EEE);
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