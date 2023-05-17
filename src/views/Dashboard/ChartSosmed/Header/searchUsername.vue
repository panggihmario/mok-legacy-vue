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
    }
  },
  computed : {
    valueAccount : {
      get() {
        return this.performerId
      },
      set(value) {
        this.$emit('setPerfomerId', value)
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