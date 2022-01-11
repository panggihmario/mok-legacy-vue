<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      class="grey--text"
      :items="feeds"
    >
      <template v-slot:[`item.media`]="{item}" >
        <LinkDialog  :item="item" />
      </template>
      <template v-slot:[`item.description`]="{ item }" >
        <div :class="ad['tb__caption']"  > {{item.description}}  </div>
      </template>
       <template v-slot:[`item.channel`]="{ item }" >
        <div :class="ad['tb__caption']"  > {{item.channel.name}}  </div>
      </template>
       <template v-slot:[`item.date`]="{item}">
        <div :class="ad['tb__caption']"> {{formatingDate(item.publishedAt)}} </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex"
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
    formatingDate(rawDate) {
      const cek = moment(rawDate).format('DD/MM/YYYY HH:mm')
      return cek;
    },
  },
  data () {
    return {
      page : 1,
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
          text : 'Dipublish Pada',
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