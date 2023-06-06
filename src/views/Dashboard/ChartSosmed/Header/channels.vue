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
    return-object
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
        const payload = {
          name : value.name,
          code : value.code
        }
        this.$emit('setChannelCode', payload)
      }
    }
  },
  watch : {
    keyword (value) {
      if(!value) {
        const payload = {
          name : '',
          code : ''
        }
        this.$emit('setChannelCode', payload)
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