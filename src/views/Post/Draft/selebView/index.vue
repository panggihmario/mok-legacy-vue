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
        <div  :class="ad['tb__caption']" > {{item.description}}  </div>
      </template>
      <template v-slot:[`item.channel`]="{ item }" >
        <div :class="ad['tb__caption']"  > {{item.channel.name}}  </div>
      </template>
      <template v-slot:[`item.date`]="{ item }">
        <div :class="ad['dg__desc']"> {{formatingDate(item.submittedAt)}} </div>
      </template>
      <template v-slot:[`item.action`]="">
       <custom-button size="small" disabled >Submitted</custom-button>
      </template>
    </v-data-table>
    <div  class="d-flex justify-end mt-4">
      <v-pagination
        v-model="page"
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
import { mapActions , mapState } from "vuex"
import LinkDialog from "../../containers/dialog/index.vue"
import moment from "moment"
export default {
  components : {
    LinkDialog
  },
  computed : {
    ...mapState({
      feeds : (state) => state.post.feeds,
      totalPages : (state) => state.post.totalPages,
      channelCode : (state) => state.post.channelCode
    })
  },
  mounted () {
    const page = this.$route.params.page
    this.page = Number(page)
  },
  methods : {
    ...mapActions({
      fetchFeeds : 'post/fetchFeeds'
    }),
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
        name : 'draft',
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
          text : 'Tanggal',
          class : 'whitesnow',
          value : 'date',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Status',
          class : 'whitesnow',
          value : 'status',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Action',
          class : 'whitesnow',
          value : 'action',
          sortable: false,
          filterable: false,
        }
      ]
    }
  }
}
</script>

<style src="../../style.scss" lang="scss" module="ad">

</style>