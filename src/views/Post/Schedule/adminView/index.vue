<template>
  <div :class="ad['tb__td']">
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
          >
            <td
              @mouseover="onHover(item)"
              @mouseleave="onLeave"
              @mousemove="getPosition"
              @mouseout="stopTracking"
              
            >
              <LinkDialog @refreshDataFeed="refreshDataFeed" :isAdmin="true"  :item="item" :feeds="feeds" />
              <div
                v-if="item.id === selectedItem"
                :class="ad['tb__hover-image']"
                id="displayAreaSchedule"
                :style="{
                  top: `${
                    (item.index + 1) * 100 - (item.index * 50 + item.index * 20)
                  }px`,
                }"
              >
                <img
                  :src="thumbnailImage"
                  :class="ad['tb__image']"
                />
              </div>
            </td>
            <td>
              <div :class="ad['tb__caption']">{{ item.description }}</div>
              
            </td>
            <td>
              <div :class="ad['tb__caption']">{{ item.channel && item.channel.name }}</div>
            </td>
            <td>
              <div :class="ad['tb__caption']">{{ item.createBy }}</div>
            </td>
            <td>
              <div :class="ad['tb__caption']">{{ item.publishBy }}</div>
            </td>
            <td >
              <div :class="ad['tb__caption']">{{ item.levelPriority }}</div>
            </td>
            <td >
              <div :class="ad['tb__caption']">{{ formatingDate(item.expiredAt) }}</div>
            </td>
            <td>
              <div :class="ad['tb__caption']">
                {{ formatingDate(item.scheduledTime) }}
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import moment from 'moment'
import LinkDialog from "../../containers/dialog/index.vue"
export default {
  components : {
    LinkDialog
  },
  computed : {
    ...mapState({
      feeds : (state) => state.post.feeds,
      totalPages : (state) => state.post.totalPages,
    }),
  },
  methods : {
    ...mapActions({
      fetchFeedById: "post/fetchFeedById",
    }),
    refreshDataFeed() {
      console.log('refresh emit')
      this.$emit('refreshDataFeed')
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format('DD/MM/YYYY HH:mm')
      return cek;
    },
    getPosition(e) {
      const x = e.clientX;
      const y = e.clientY;
      document.getElementById("displayAreaSchedule").style.left =  (x - 246) + 'px';
    },
    stopTracking() {

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
  },
  data () {
    return {
      page : 1,
      selectedItem : null,
      thumbnailImage : "",
      headers : [
        {
          text : 'Media',
          class : 'whitesnow',
          sortable: false,
          value : 'media',
          filterable: false,
          width : "90"
        },
        {
          text : 'Caption',
          class : 'whitesnow',
          value : 'description',
          sortable: false,
          filterable: false,
          width : "260"
        },
        {
          text : 'Channel',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'channel',
          
        },
        {
          text : 'User',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'user'
        },
        {
          text : 'Publisher',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'publisher',
        },
        {
          text : 'Level Konten',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'levelPriority',
        },
        {
          text : 'Expired Tanggal',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'expiredAt',
        },
        {
          text : 'Dijadwalkan Pada',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'date',
          align : 'center',
          width : '150'
        },
      ]
    }
  }
}
</script>

<style src="../../style.scss" lang="scss" module="ad">

</style>