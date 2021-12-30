<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      class="grey--text"
      :items="feeds"
    >
      <template v-slot:[`item.media`]="{item}" >
        <LinkDialog 
          :item="item" 
          @refreshDataFeed="refreshDataFeed" 
          :isAdmin="true"
        />
      </template>
      <template v-slot:[`item.description`]="{ item }" >
        <div :class="feed['tb__caption']"  > {{item.description}}  </div>
      </template>
      <template v-slot:[`item.channel`]="{ item }" >
        <div :class="feed['tb__caption']"  > {{item.channel.name}}  </div>
      </template>
      <template v-slot:[`item.date`]="{item}">
        <div :class="feed['tb__caption']"> {{formatingDate(item.submittedAt)}} </div>
      </template>
      <template v-slot:[`item.user`]="{item}">
        <div :class="feed['tb__caption']">{{item.createBy}}</div>
      </template>
     
      <template v-slot:[`item.schedule`]="{item}" >
        <ActionsPicker 
          :item="item" 
          @refreshDataFeed="refreshDataFeed"
        />
      </template>
    </v-data-table>
    <div  class="d-flex justify-end mt-4">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        total-visible="10"
        @input="onPagination"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import Picker from "./datePicker.vue"
import Actions from "./actions.vue"
import LinkDialog from "../../containers/dialog/index.vue"
import moment from 'moment'
import ActionsPicker from "./actionsPicker.vue"
export default {
  components : {
    Picker,
    Actions,
    LinkDialog,
    ActionsPicker
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
    ...mapActions({
      fetchFeeds : 'post/fetchFeeds'
    }),
    formatingDate(rawDate) {
      const cek = moment(rawDate).format('DD/MM/YYYY HH:mm')
      return cek;
    },
    refreshDataFeed() {
      this.$emit('refreshDataFeed')
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
          width : "100"
        },
        {
          text : 'Channel',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'channel',
          
        },
        {
          text : 'Submitted',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'date'
        },
        {
          text : 'User',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'user'
        },
        {
          text : 'Schedule',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
          value : 'schedule',
          align : 'left',
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
      ]
    }
  }
}
</script>

<style lang="scss" module="feed">
//$
.fonts {
  font-size: 12px;
  font-weight: 500;
  color: #777777;
}
.tb {
  &__caption {
    @extend .fonts;
    white-space: nowrap!important;
    overflow: hidden!important;
    text-overflow: ellipsis!important;
    max-width: 150px;
  }
  &__schedule {
    background: #FFFFFF;
    border : 0.6px solid #BBBBBB;
    border-radius: 4px;
    box-sizing: border-box;
    width: 138px;
    height: 24px;
    padding: 6px;
    font-size: 10px;
    cursor: pointer;
  }
  &__schedule:focus {
    border : 0.6px solid #BBBBBB;
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