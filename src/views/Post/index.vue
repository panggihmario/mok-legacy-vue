<template>
  <div>
    <HeaderContent :list="list" label="Post Feed">
      <custom-button
        color="kellygreen"
        class="white--text"
        size="small"
        @click="moveToCreatePost"
      >
        Buat Post
      </custom-button>
    </HeaderContent>
    <div class="d-flex">
      <v-tabs color="primary" left class="mb-4">
        <v-tab
          v-for="(tab, idx) in tabs"
          :key="idx"
          :to="{ name: tab.name, params: { page: 1 } }"
          exact
          @click="changeTab(tab.name)"
        >
          <div style="letter-spacing : 0" class="text-capitalize">{{ tab.label }}</div>
        </v-tab>
      </v-tabs>
      <div>
        <div class="d-flex align-center">
          <custom-button
            style="margin-bottom : 24px"
            color="primarylowtint"
            class="mr-4"
            v-if="isFilter"
            @click="resetFilter"
          >
            <div class="warning--text" >Reset Filter</div>
          </custom-button>
          
          <custom-button 
            v-if="!expand"
            style="margin-bottom : 24px"
            class="mr-4"
            @click="expand = !expand"
          >
            Filter Data
          </custom-button>

          <custom-input
            dense
            placeholder="Search"
            style="width: 200px"
            v-model="keyword"
            @keyup.enter="onSubmitFilter"
          />
        </div>
      </div>
    </div>

    <v-expand-transition>
      <v-card
        v-show="expand"
        flat
      >
        <Expand
          @onCancel="onCancel"
          @onSubmitFilter="onSubmitFilter"
        />
      </v-card>
    </v-expand-transition>
      
    <router-view @refreshDataFeed="refreshDataFeed" ></router-view>

    <div  class="d-flex justify-space-between align-center mt-4">
      <div class="d-flex">
        <div :class="p.label" >Total Post : </div>
        <div :class="p.sublabel"> {{totalElements}} </div>
      </div>
      <v-pagination
        v-if="totalPages > 1"
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        total-visible="5"
        color="primary"
        v-model="currentPage"
      />
    </div>
    <v-alert :class="p.alert" :value="alertError" type="error">
      {{ errorMessage }}
    </v-alert>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Expand from "./expand/index.vue"
import moment from "moment"
import { mapActions, mapMutations, mapState } from "vuex";
export default {

  components: {
    HeaderContent,
    Expand
  },
  mounted() {
    const query = this.$route.query.keyword
    if(query) {
      const page = this.$route.params.page
      const name = this.$route.name
      this.isFilter = true
      return this.onFilterByPage(page, name, query)
    }else{
      this.onInitiateFetchFeeds()
    }
  },
  computed : {
    ...mapState({
      totalPages : (state) => state.post.totalPages,
      totalElements : (state) => state.post.totalElements,
      channelCode : (state) => state.post.channelCode,
      paramsUsers : (state) => state.post.paramsUsers,
      paramsChannel : (state) => state.post.paramsChannel,
      paramsDate : (state) => state.post.paramsDate
    }),
    currentPage : {
      get() {
        const page = this.$route.params.page
        const current = Number(page)
        return current
      },
      set(value) {
        const name = this.$route.name
        this.$router.push({
          name,
          params : {
            page : value
          },
          query : {
            keyword : this.keyword
          }
        })
        if(this.isParamsFilter  ) {
          const page = value - 1
          return this.onFilterByPage(page, name)
        }else{
          return this.onInitiateFetchFeeds(name, value - 1)
        }
        
      }
    }
  },
  watch : {
    keyword : function (value) {
      if(value.length > 0 ){
        this.isFilter = true
      }else{
        this.isFilter = false
      }
    }
  },
  methods: {
    ...mapActions({
      getListChannel: "channel/getAllChannel",
      fetchFeeds: "post/fetchFeeds",
      searchFeed: "post/searchFeed",
      filterFeed : 'post/filterFeed'
    }),
    refreshDataFeed () {
       const name = this.$route.name
       const valuePage = this.$route.params.page
       const page = valuePage - 1
        if(this.isParamsFilter) {
          return this.onFilterByPage(page, name)
        }else{
          return this.onInitiateFetchFeeds(name, page)
        }
    },
    onInitiateFetchFeeds (tab = this.$route.name, page = 0) {
      const sort = this.typeOfSort(tab);
      const payload = {
        size : 10,
        tab,
        page,
        ...(sort &&  {sort : sort} )
      }

      return this.fetchFeeds(payload)
    },
    changeTab(tab) {
      this.isFilter = false
      this.isParamsFilter = false
      this.setParamsUsers([])
      this.setParamsChannel([])
      this.setParamsDate([])
      this.setDisplayDate('')
      this.expand = false
      return this.onInitiateFetchFeeds(tab)
        .then(() => {
          this.$router.push({
            name : tab,
            page : 1
          }).catch(() =>{})
        })
    },
    onCancel (value) {
      this.expand = false
    },
    formatingParamsUsers(users) {
      const tempArrayUsers = []
      users.forEach(element => {
        tempArrayUsers.push(element.username)
      })
      return tempArrayUsers.join(',')
    },
    formatingParamsChannel (channels) {
      const tempArrayChannels = []
      channels.forEach(element => {
        tempArrayChannels.push(element.code)
      })
      return tempArrayChannels.join(',')
    },
    formatingParamsDate (date) {
      const [startDate, endDate] = date
      const epochStartDate = this.convertEpoch(startDate)
      let end
      let epochEndDate
      if(endDate) {
        end = moment(endDate, "YYYY-MM-DD HH:mm").endOf("day").add(7, 'hours').unix()
        epochEndDate = end * 1000
      }else{
        end = moment(startDate, "YYYY-MM-DD HH:mm").endOf("day").add(7, 'hours').unix()
        epochEndDate = end * 1000
      }
      const payload = {
        startAt : epochStartDate ?epochStartDate : '',
        endAt : epochEndDate ? epochEndDate : ''
      }
      return payload
    },
    convertEpoch(d) {
      const epochDate = moment(d, "YYYY-MM-DD").add(7, 'hours').unix()
      const miliEpoch = epochDate * 1000
      return miliEpoch
    },
    onSubmitFilter () {
      this.isFilter = true
      this.isParamsFilter = true
      const routerName = this.$route.name;
      if(this.paramsUsers.length > 0 || this.paramsChannel.length > 0 || this.paramsDate.length > 0 || this.keyword.length > 0 ) {
        const users = this.formatingParamsUsers(this.paramsUsers)
        const channels = this.formatingParamsChannel(this.paramsChannel)
        const date = this.formatingParamsDate(this.paramsDate)
        const sort = this.typeOfSort(routerName);
        const payload = {
          usernames : users,
          tab : routerName,
          channelCodes : channels,
          ...date,
          ...(sort &&  {sort : sort} ),
          keyword : this.keyword
        }
        return this.filterFeed(payload)
          .then(() => {
            this.$router.push({
              name : this.$route.name,
              params : {
                page : 1
              },
              query : {
                keyword : this.keyword
              }
            })
            .catch(() => {})
          })
      }else{
        this.isParamsFilter = false
        this.$router.push({
          name : this.$route.name,
          params : {
            page : 1
          }
        })
        .catch(() => {})
        return this.onInitiateFetchFeeds()
      }
      
    },
    resetFilter () {
      this.isFilter = false
      this.isParamsFilter = false
      this.keyword = ""
      this.setParamsUsers([])
      this.setParamsChannel([])
      this.setParamsDate([])
      this.setDisplayDate('')
      return this.onInitiateFetchFeeds()
        .then(() => {
          this.$router.push({
            name : this.$route.name,
            params : {
              page : 1
            }
          }).catch(() => {})
        })
    },
    onFilterByPage (page, name, keyword = this.keyword) {
        const users = this.formatingParamsUsers(this.paramsUsers)
        const channels = this.formatingParamsChannel(this.paramsChannel)
        const date = this.formatingParamsDate(this.paramsDate)
        const sort = this.typeOfSort(name);
        const payload = {
          usernames : users,
          tab : name,
          page : page,
          channelCodes : channels,
          ...date,
          ...(sort &&  {sort : sort} ),
          keyword
        }
        return this.filterFeed(payload)
    },
    resetFields(routerName) {
      this.setKeyWord('')
      this.setChannelCode(null)
      this.$router.push({
        name : routerName,
        params : {
          page : 1
        }
      })
    },
    fetchSearchApi (routerName) {
      const keyword = this.keyword
      const page = this.$route.params.page
      const payload = {
        keyword: keyword,
        tab: routerName,
        page : page - 1
      };
      this.setKeyWord(keyword)
      return this.searchFeed(payload);
    },
    handleSearch() {
      const routerName = this.$route.name;
      const keyword = this.keyword
      if (keyword) {
        this.$router.push({
          name : routerName,
          params : {
            page : 1
          }
        })
        return this.fetchSearchApi(routerName)
      } else {
        this.setKeyWord('')
        this.resetFields(routerName)
        return this.handleFetchApiFeeds();
      }
    },
    ...mapMutations({
      setChannelCode: "post/setChannelCode",
      setFeeds: "post/setFeeds",
      setKeyWord : 'post/setKeyWord',
      setPage : 'post/setPage',
      setParamsUsers : 'post/setParamsUsers',
      setParamsChannel : 'post/setParamsChannel',
      setDisplayDate : 'post/setDisplayDate',
      setParamsDate : 'post/setParamsDate'
    }),
    moveToCreatePost() {
      this.$router.push({
        name: "createFeed",
      });
    },
    getParams() {
      const routerName = this.$route.name;
      const sort = this.typeOfSort(routerName);
      const page = this.$route.params.page;
      const code = this.channelCode
      const tempPayload = {
        tab : routerName,
        size : 10,
        page : page -1
      }
      const payload = {
        ...tempPayload,
        ...(code  && { channelCode: code }),
        ...(sort &&  {sort : sort} )
      }
      return payload
    },
    handleFetchApiFeeds() {
      const params = this.getParams()
      return this.fetchFeeds(params);
    },
    typeOfSort(tab) {
      if (tab === "draft") {
        return "createAt,DESC";
      } else if (tab === 'schedule') {
        return "scheduledTime,ASC";
      } else {
        return null;
      }
    },
  },
  data() {
    return {
      channels: [],
      expand : false,
      isParamsFilter : false,
      isFilter : false,
      keyword: "",
      channel: null,
      alertError: false,
      errorMessage: "",
      list: [
        {
          text: "Konten Feed",
          disabled: true,
        },
      ],
      page: 1,
      tabs: [
        {
          name: "draft",
          label: "List Post Feed",
        },
        {
          name: "schedule",
          label: "Terjadwal",
        },
        {
          name: "list",
          label: "List Kontent",
        },
        {
          name: "reject",
          label: "Dihapus",
        },
      ],
    };
  },
};
</script>

<style lang="scss" module="p">
.font-content {
  font-size: 12px;
  font-weight: 500;
}
.label {
  color: #BBBBBB;
  @extend .font-content;
}
.sublabel {
  color: black;
  @extend .font-content;
  margin-left: 2px;
}
.alert {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>