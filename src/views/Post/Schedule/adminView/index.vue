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
            @mouseover="onHover(item)"
            @mouseleave="onLeave"
          >
            <td>
              <LinkDialog :item="item" :feeds="feeds" />
            </td>
            <td>
              <div :class="ad['tb__caption']">{{ item.description }}</div>
              <div
                v-if="item.id === selectedItem"
                :class="ad['tb__hover-image']"
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
              <div :class="ad['dg__desc']">{{ item.channel.name }}</div>
            </td>
            <td>
              <div :class="ad['dg__desc']">{{ item.createBy }}</div>
            </td>
            <td>
              <div :class="ad['dg__desc']">{{ item.publishBy }}</div>
            </td>
            <td>
              <div :class="ad['dg__desc']">
                {{ formatingDate(item.publishedAt) }}
              </div>
            </td>
            <td></td>
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
    formatingDate(rawDate) {
      const cek = moment(rawDate).format('DD/MM/YYYY HH:mm')
      return cek;
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