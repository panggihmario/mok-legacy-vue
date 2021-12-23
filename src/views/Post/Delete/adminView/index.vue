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
       <template v-slot:[`item.delete`]="{item}">
        <div :class="ad['tb__caption']">{{item.deletedBy}}</div>
      </template>
      <template v-slot:[`item.publish`]="{item}">
        <div :class="ad['tb__caption']"> {{formatingDate(item.publishedAt)}} </div>
      </template>
       <template v-slot:[`item.date`]="{item}">
        <div :class="ad['tb__caption']"> {{formatingDate(item.deletedAt)}} </div>
      </template>
    </v-data-table>
     <div  class="d-flex justify-end mt-4">
      <v-pagination
        v-model="page"
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="onPagination"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import moment from 'moment'
import LinkDialog from "../../containers/linkDialog.vue"
export default {
  components : {
    LinkDialog
  },
  created() {
    this.handleFetchingData()
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
    })
  },
  methods : {
    ...mapActions({
      fetchFeeds : 'post/fetchFeeds'
    }),
    formatingDate(rawDate) {
      if(rawDate){
        const cek = moment(rawDate).format('DD/MM/YYYY HH:mm')
        return cek;
      }else{
        return 'Rejected'
      }
      
    },
    handleFetchingData () {
      const page = this.$route.params.page
      const payload = {
        tab : 'reject',
        size : 15,
        page : page - 1,
      }
      return this.fetchFeeds(payload)
    },
    onPagination(page) {
      const code = this.channelCode
      const payload = {
          tab : 'reject',
          size : 15,
          page : page - 1,
          channelCode : code
        }
      let tempPayload = {}
      if(code) {
        tempPayload = {
          ...payload,
          channelCode : code
        }
      }else{
        tempPayload = {
          ...payload
        }
      }
      this.$router.push({
        name : 'reject',
        params : {
          page : page
        }
      })
      return this.fetchFeeds(tempPayload)
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
          text : 'Dipublish Pada',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'publish',
          align : 'center',
        },
        {
          text : 'Dihapus Oleh',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'delete'
        },
         {
          text : 'Dihapus Pada',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'date',
          align : 'center',
        },
      ]
    }
  }
}
</script>

<style src="../../style.scss" lang="scss" module="ad">

</style>