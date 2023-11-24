<template>
  <v-autocomplete
    dense
    hide-details
    placeholder="Username"
    class="mr-2 expand__field"
    :items="items"
    item-text="username"
    return-object
    multiple
    v-model="selectedUser"
    solo
    flat
    
    :search-input.sync="search"
    @focus="isFocus"
    @blur="isBlur"
    :loading="isLoading"
    style="width : '100px'"
  >
    <template v-slot:selection="{ index }">
      <span v-if="index === 0 && !focus" class="grey--text expand__selected">
        {{ selectedUser.length }} selected
      </span>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {

  computed : {
    ...mapState({
      paramsUsers : (state) => state.post.paramsUsers
    }),
    selectedUser : {
      get() {
        return this.paramsUsers
      },
      set(value) {
        this.setIsFilterable(true)
        this.setParamsUsers(value)
      }
    }
  },
  mounted () {
    this.fetchAdminData()
  },
  data () {
    return {
      items: [],
      selected: [],
      focus : false,
      page : 1,
      search : null,
      isLoading : false
    }
  },
  watch : {
    search(value) {
      if (this.isLoading) return
      this.isLoading = true
      setTimeout(() => {
        const payload = {
        value
      }
      return this.searchAccounts(payload)
        .then((response) => {
          this.items = response;
          this.isLoading = false
        })
        .catch(() => this.isLoading = false)
      }, 1500)
    }
  },
  methods: {
    ...mapActions({
      getListAdmin: "account/getListRespone",
      fetchListAccounts : 'post/fetchListAccounts',
      searchAccounts : 'post/searchAccounts'
    }),
    ...mapMutations({
      setParamsUsers : 'post/setParamsUsers',
      setIsFilterable : 'post/setIsFilterable'
    }),
    isFocus () {
      this.focus = true
    },
    isBlur () {
      this.focus = false
    },
    fetchAdminData() {
      this.loading = true
      const payload = {
        page : 1
      };
      return this.fetchListAccounts(payload)
        .then((response) => {
          this.items = response;
        });
    },
  },
}
</script>

<style lang="scss" scoped  src="./expand.scss" >
</style>