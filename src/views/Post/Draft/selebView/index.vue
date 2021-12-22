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
        <div  :class="ad['dg__desc']" > {{item.description}}  </div>
      </template>
      <template v-slot:[`item.channel`]="{ item }" >
        <div :class="ad['dg__desc']"  > {{item.channel.name}}  </div>
      </template>
      <template v-slot:[`item.date`]="{ item }">
        <div :class="ad['dg__desc']"> {{formatingDate(item.createAt)}} </div>
      </template>
      <template v-slot:[`item.action`]="">
       <custom-button size="small" disabled >Submitted</custom-button>
      </template>
    </v-data-table>
    <div  class="d-flex justify-end mt-4">
      <v-pagination
        v-model="page"
        :length="totalPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="onPagination"
      />
    </div>
  </div>
</template>

<script>
import { mapActions , mapState } from "vuex"
import LinkDialog from "./dialog.vue"
import moment from "moment"
export default {
  components : {
    LinkDialog
  },
  computed : {
    ...mapState({
      feeds : (state) => state.post.feeds
    })
  },
  created() {
    this.handleFetchingData()
  },
  mounted () {
    const page = this.$route.params.page
    this.page = Number(page)
  },
  methods : {
    ...mapActions({
      fetchFeeds : 'post/fetchFeeds'
    }),
    handleFetchingData () {
      const page = this.$route.params.page
      const payload = {
        tab : 'draft',
        size : 15,
        page : page -1,
        sort : 'createAt,DESC',
      }
      return this.fetchFeeds(payload)
       .then(response => {
          this.totalPage = response.totalPages
        })
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format('DD/MM/YYYY HH:mm')
      return cek;
    },
     onPagination(page) {
      const payload = {
        tab : 'draft',
        size : 15,
        page : page - 1,
        sort : 'createAt,DESC',
      }
      this.$router.push({
        name : 'draft',
        params : {
          page : page
        }
      })
      return this.fetchFeeds(payload)
    }
  },
  data () {
    return {
      page : 1,
      totalPage : 0,
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