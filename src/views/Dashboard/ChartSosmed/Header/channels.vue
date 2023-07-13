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
          const filerResponseData = responseData.filter(data => {
            if(data.code === 'tiktok' || data.code === 'chinatiktok' || data.code === 'general') {
              return {
                ...data
              }
            }
          })
          
          const changeCodeGeneral = filerResponseData.map(data => {
            if(data.code === 'general') {
              return {
                ...data,
                code : 'home'
              }
            }else{
              return {
                ...data
              }
            }
          })
          this.items = changeCodeGeneral
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