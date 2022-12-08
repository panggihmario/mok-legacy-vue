<template>
  <div>
    <HeaderContent label="Manager Socmed" :list="items" >
      <input 
        placeholder="Search"  
        v-model="keyword" 
        class="filter__search" 
        @keyup.enter="onSearch"
       />
    </HeaderContent>

    <FilterTable 
      @getDeviceParams="getDeviceParams"
      @getPayloadDate="getPayloadDate"
    />
    <TableFeedback 
      :feedbackData="feedbackData" 
      :totalPages="totalPages" 
      :totalFeedBack="totalFeedBack"
      @updatePagination="updatePagination"
    />
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import FilterTable from "./filter.vue"
import TableFeedback from "./tableFeedback.vue"
export default {
  components: {
    HeaderContent,
    FilterTable,
    TableFeedback
  },
  data() {
    return {
      items: [
        {
          text: "Feedback User",
          disabled: true,
          href: "feedback",
        },
      ],
      keyword : '',
      feedbackData: [],
      totalPages: 0,
      totalFeedBack : 0,
      payload: {
        size: 10,
        page: 0,
        sort: 'createAt,desc',
        startAt: '',
        endAt: '',
        deviceType: '',
        keyword : ''
      }
    }
  },
  watch: {
    payload: {
      handler(val) {
        this.fetchFeedbackData()
      },
      deep: true
    }
  },
  methods: {
    onSearch() {
      this.payload.keyword = this.keyword
    },
    getPayloadDate(data) {
      this.payload.startAt = data.startAt
      this.payload.endAt = data.endAt
    },  
    getDeviceParams (data) {
      this.payload.deviceType = data.value
      this.payload.page = 0
      this.resetPage()
    },
    resetPage() {
      const name = this.$route.name
        this.$router.push({
          name,
          params : {
            page : 1
          },
        })
        .catch(() => {})
    },
    updatePagination(value) {
      const pagePayload = value - 1
      this.payload.page = pagePayload
    },
    fetchFeedbackData() {
      return this.$httpWithToken().get('admin/feedback', {
        params: {
          ...this.payload,
        }
      })
        .then(response => {
          const dataResponse = response.data.data
          const contents = dataResponse.content
          this.totalPages = dataResponse.totalPages
          this.totalFeedBack = dataResponse.totalElements
          this.feedbackData = contents
        })
    }
  },
  mounted() {
    this.fetchFeedbackData()
  }
}

</script>

<style lang="scss" scoped  src="./filter.scss" >
</style>