<template>
  <div :class="feed['tb__td']">
    <v-data-table
      :headers="headers"
      hide-default-footer
      class="grey--text"
      :items="feeds"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr 
            v-for="item in items" 
            :key="item.id"
            @mouseover="onHover(item)"
            @mouseleave="onLeave"
            @mousemove="getPosition"
            @mouseout="stopTracking"
          >  
            <td>
              <LinkDialog
                :item="item"
                @refreshDataFeed="refreshDataFeed"
                :isAdmin="true"
                :feeds="feeds"
              />
              <div
                  v-if="item.id === selectedItem" 
                  :class="feed['tb__hover-image']"
                  id="displayAreaDraft"
                  :style="{top : `${((item.index + 1) * 100 - ((item.index * 50 + (item.index * 20))) )}px`  }"
                >
                  <img
                    :src="thumbnailImage"
                    :class="feed['tb__image']"
                  />
                </div>
            </td>
            <td >
              <div :class="feed['tb__caption']">{{ item.description }}</div>
                
            </td>
            <td>
              <div :class="feed['tb__caption']">{{ item.channel.name }}</div>
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
              <ActionsPicker :item="item" @refreshDataFeed="refreshDataFeed" />
            </td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Picker from "./datePicker.vue";
import Actions from "./actions.vue";
import LinkDialog from "../../containers/dialog/index.vue";
import moment from "moment";
import ActionsPicker from "./actionsPicker.vue";
export default {
  components: {
    Picker,
    Actions,
    LinkDialog,
    ActionsPicker,
  },
  computed: {
    ...mapState({
      feeds: (state) => state.post.feeds,
    }),
  },
  methods: {
    ...mapActions({
      fetchFeedById: "post/fetchFeedById",
    }),
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    refreshDataFeed() {
      this.$emit("refreshDataFeed");
    },
    onHover(item) {
      this.selectedItem = item.id
      return this.fetchFeedById(item.id).then((response) => {
        const medias = response.medias
        const [media] = medias
        const thumbnail = media.thumbnail.medium
        this.thumbnailImage = thumbnail
      });
    },
    getPosition(e) {
      const x = e.clientX;
      const y = e.clientY;
      document.getElementById("displayAreaDraft").style.left =  (x - 246) + 'px';
    },
    stopTracking() {

    },
    onLeave() {
      this.selectedItem = null
      this.thumbnailImage = ""
    },
  },
  data() {
    return {
      selectedItem : null,
      thumbnailImage : "",
      headers: [
        {
          text: "Media",
          class: "whitesnow",
          sortable: false,
          value: "media",
          filterable: false,
          width: "90",
        },
        {
          text: "Caption",
          class: "whitesnow",
          value: "description",
          sortable: false,
          filterable: false,
          width: "100",
        },
        {
          text: "Channel",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          value: "channel",
        },
        {
          text: "Submitted",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          value: "date",
        },
        {
          text: "User",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          value: "user",
        },
        {
          text: "Schedule",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          value: "schedule",
          align: "left",
        },
        // {
        //   text : 'Action',
        //   class : 'whitesnow',
        //   sortable: false,
        //   filterable: false,
        //   value : 'action',
        //   align : 'center',
        //   width : "200"
        // }
      ],
    };
  },
};
</script>

<style lang="scss" module="feed">
//$

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

<style src="../../style.scss" lang="scss" module="ad">
</style>