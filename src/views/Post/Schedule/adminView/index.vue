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
       <template v-slot:[`item.user`]="{item}">
        <div :class="ad['tb__caption']">{{item.createBy}}</div>
      </template>
       <template v-slot:[`item.date`]="{item}">
        <div :class="ad['tb__caption']"> {{formatingDate(item.scheduledTime)}} </div>
      </template>
    </v-data-table>
     <div  class="d-flex justify-end mt-4">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="onPagination"
        total-visible="10"
      />
    </div>
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
  mounted () {
    const page = this.$route.params.page
    this.page = Number(page)
  },
  computed : {
    ...mapState({
      feeds : (state) => state.post.feeds,
      totalPages : (state) => state.post.totalPages,
      channelCode : (state) => state.post.channelCode
    }),
    currentPage() {
      const page = this.$route.params.page
      const current = Number(page)
      return current
    }
  },
  methods : {
    formatingDate(rawDate) {
      const cek = moment(rawDate).format('DD/MM/YYYY HH:mm')
      return cek;
    },
    onPagination(page) {
      const code = this.channelCode
      let payload
      if(code) {
        payload = {
          page,
          code
        }
      }else {
        payload = {
          page
        }
      }
      this.$router.push({
        name : 'schedule',
        params : {
          page : page
        }
      })
      this.$emit('onPagination', payload)
    }
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
          text : 'User',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'user'
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