<template>
  <div>
    <v-autocomplete
      v-model="valueAccount"
      color="secondary"
      :items="items"
      placeholder="Username"
      :search-input.sync="keyword"
      outlined
      item-value="id"
      item-color="secondary"
      dense
      return-object
      hide-details
      class="font-12"
      item-text="username"
    />
  </div>

</template>


<script>
import { mapActions } from "vuex";
export default {
  props : {
    performerId : {
      type : String
    },
    isReset : {
      type : Boolean
    }
  },
  computed : {
    valueAccount : {
      get() {
        return this.performerId
      },
      set(value) {
        const params = {
          id : value.id,
          name : value.username
        }
        this.$emit('setPerfomerId', params)
      }
    }
  },
  data () {
    return {
      keyword : '',
      items : [],
      item : null
    }
  },
  watch : {
    keyword(value) {
      value && value !== this.item && this.handleSearchUser(value)
    },
    isReset (value) {
      if(!value) {
        this.items = []
      }
    }
  },
  methods : {
    ...mapActions({
      searchUser: "account/searchUser",
    }),
    handleSearchUser (value) {
      const keyword = value
      return this.searchUser(keyword)
        .then(response => {
          const responseData = response.data.data
          this.items = responseData
        })
    }
  }
}
</script>