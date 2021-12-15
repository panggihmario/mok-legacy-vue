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
        >
          <div class="text-capitalize">{{ tab.label }}</div>
        </v-tab>
      </v-tabs>
      <div>
        <div class="d-flex align-center">
          <custom-select 
            :items="channels"
            dense placeholder="Channel" 
            return-object
            item-text="name"
            @change="changeChannel"
            v-model="channel"
          />
          <v-icon 
            class="mr-6 mb-6 ml-2" 
            style="cursor: pointer"
            size="20px" 
            @click="removeChannel"
          >
            fas fa-times
          </v-icon>
          <custom-input  
            dense 
            placeholder="Search" 
            style="width : 250px"
            v-model="keyword"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>
    </div>

    <router-view />
    <v-alert :class="p.alert" :value="alertError"  type="error">
      {{errorMessage}}
    </v-alert>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions , mapMutations } from "vuex"
export default {
  components: {
    HeaderContent,
  },
  mounted() {
    this.fetchDataChannel()
  },
  methods: {
    ...mapActions({
      getListChannel : 'channel/getAllChannel',
      fetchFeeds : 'post/fetchFeeds',
      searchFeed : 'post/searchFeed'
    }),
    handleSearch() {
      if(this.keyword) {
        const payload = {
        keyword : this.keyword
      }
        return this.searchFeed(payload)
      }else{
        const routerName = this.$route.name
        const payload = {
          tab : routerName,
          size : 15
        }
        return this.fetchFeeds(payload)
      } 
      
    },
    ...mapMutations({
      setChannelCode : 'post/setChannelCode'
    }),
    moveToCreatePost() {
      this.$router.push({
        name: "createFeed",
      });
    },
    changeChannel(c) {
      const routerName = this.$route.name
      const code = c.code
      const payload = {
        tab : routerName,
        channelCode : code,
        size : 15
      }
      this.setChannelCode(code)
      return this.fetchFeeds(payload)
      .catch(err => {
        if(err.response) {
          this.alertError = true
          const message = err.response.data.message
          this.errorMessage = message
          setTimeout(() => {
            this.alertError = false
            this.errorMessage = ''
            this.channel = null
          }, 2500)
        }
      })
    },
    removeChannel() {
      this.channel = null
      const routerName = this.$route.name
      const payload = {
        tab : routerName,
      }
      return this.fetchFeeds(payload)
    },
    fetchDataChannel() {
      return this.getListChannel()
        .then(response => {
          const responseData = response.data.data
          this.channels = responseData
        })
    }
  },
  data() {
    return {
      channels: [],
      keyword : '',
      channel : null,
      alertError : false,
      errorMessage : '',
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
          name : 'reject',
          label : 'Dihapus'
        }
      ],
    };
  },
};
</script>

<style lang="scss" module="p">
.alert {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>