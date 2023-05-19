<template>
  <v-autocomplete
    v-model="code"
    color="secondary"
    :items="items"
    :search-input.sync="keyword"
    placeholder="Semua Channel"
    outlined
    item-text="name"
    item-value="code"
    dense
    hide-details
    class="font-12"
  />
</template>


<script>
import { mapActions } from "vuex"
export default {
  props : {
    channelCode : {
      type : String
    }
  },
  computed : {
    code : {
      get() {
        return this.channelCode
      },
      set(value) {
        this.$emit('setChannelCode', value)
      }
    }
  },
  data () {
    return {
      keyword : '',
      items : [],
      item : ''
    }
  },
  mounted () {
    this.fetchDataChannel()
  },
  methods : {
    ...mapActions({
      getListChannel: "channel/getAllChannel",
    }),
    fetchDataChannel () {
      return this.getListChannel()
        .then(response => {
          const responseData = response.data.data
          this.items = responseData
        })
        .catch(() => {
          this.channels = []
        })
    },
    handleSearchUser () {
      
    }
  }
}
</script>