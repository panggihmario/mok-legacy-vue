<template>
  <v-autocomplete
    dense
    hide-details
    placeholder="Username"
    class="ex__field mr-2 field"
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
  >
    <template v-slot:selection="{ index }">
      <span v-if="index === 0 && !focus" class="grey--text text-caption">
        {{ selectedUser.length }} selected
      </span>
    </template>
    <!-- <template v-slot:append-item>
    <div v-intersect="endIntersect" />
  </template> -->
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
      setParamsUsers : 'post/setParamsUsers'
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

<style lang="scss" scoped>
.field{
  border-radius: $border-radius-root;
	font-size: $font-size-root;
}
</style>