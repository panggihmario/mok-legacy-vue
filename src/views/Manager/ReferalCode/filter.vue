<template>
  <div class="code__header">
    <div class="code__header-label">Cari Berdasarkan</div>
    <div style="width : 150px">
      <v-select :items="items" rounded dense hide-details outlined class="code__header-label" item-text="title"
        return-object v-model="selectedFilter" />
    </div>
    <div v-if="selectedFilter.value === 'username'" style="width : 200px">
      <v-autocomplete dense hide-details placeholder="Cari..." :items="usernames" item-text="username"
        :search-input.sync="search" return-object outlined rounded class="code__header-label" v-model="user" clearable
        @click:clear="onClear">
      </v-autocomplete>
    </div>
    <div v-else style="width : 250px">
      <v-text-field v-model="keyword" rounded outlined dense append-icon="fas fa-search" hide-details
        class="code__header-label" placeholder="Cari ..." v-on:keyup.enter="onChageKeywordCode" />
    </div>

    <v-snackbar v-model="snackbar" :timeout="timeout" top color="warning">
      <div v-if="errorObject">
        <div v-if="errorObject.response">
          <div v-if="errorObject.response.status === 401">
            <div>{{ errorObject.response.data.error }}</div>
            <div>{{ errorObject.response.data.error_description }}</div>
          </div>
          <div v-else>
            <div>{{ errorObject.response.data.message }}</div>
            <div>{{ errorObject.response.data.data }}</div>
          </div>
        </div>
        <div v-else> {{ errorObject }}</div>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  props: {
    selectedUser: {
      type: [Object]
    },
    referralCode : {
      type : String
    }
  },
  computed: {
    keyword : {
      get () {
        return this.referralCode
      },
      set(value) {
        this.$emit('setReferralCode',value)
      }
    },
    user: {
      get() {
        return this.selectedUser
      },
      set(value) {
        this.$emit('onSelectUser', value)
      }
    }
  },
  data() {
    return {
      menu: false,
      timeout: 3000,
      snackbar: false,
      errorObject: null,
      filterBy: 'Username',
      isUsername: true,
      // keyword: '',
      items: [
        {
          title: 'Username',
          value: 'username'
        },
        {
          title: 'Referral Code',
          value: 'referralCode'
        },
      ],
      usernames: [],
      search: null,
      isLoading: false,
      selectedFilter: {
        title: 'Username',
        value: 'username'
      }
    }
  },
  methods: {
    ...mapActions({
      getListAdmin: "account/getListRespone",
      fetchListAccounts: 'post/fetchListAccounts',
      searchAccounts: 'post/searchAccounts'
    }),
    onChageKeywordCode(e) {
      this.$emit('getCodeByKeyword', this.keyword)
    },
    onClear() {
      this.$emit('onClearUsername')
      return this.fetchAdminData()
    },
    selectItem(item) {
      this.filterBy = item.title
    },
    fetchAdminData() {
      this.loading = true
      const payload = {
        page: 1
      };
      return this.fetchListAccounts(payload)
        .then((response) => {
          this.usernames = response;
        });
    },
  },
  mounted() {
    this.fetchAdminData()
  },
  watch: {
    search(value) {
      if (value) {
        this.isLoading = true
        setTimeout(() => {
          const payload = {
            value
          }
          return this.searchAccounts(payload)
            .then((response) => {
              const reformatData = response.map((r) => {
                return {
                  username: r.username,
                  accountId: r.id
                }
              })
              this.usernames = reformatData;
              this.isLoading = false
            })
            .catch((err) => {
              this.snackbar = true
              this.errorObject = err
              this.isLoading = false
            })
        }, 400)
      }else{
        return
      }
    }
  },
}
</script>

<style lang="scss" src="./style.scss"></style>

