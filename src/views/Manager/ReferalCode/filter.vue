<template>
  <div class="code__header">
    <div class="code__header-label">Cari Berdasarkan</div>
    <div style="width : 150px">
      <v-select
        :items="items"
        rounded
        dense
        hide-details
        outlined
        class="code__header-label"
        item-text="title"
        return-object
        v-model="selectedFilter"
      />
    </div>
    <div v-if="selectedFilter.value === 'username' " style="width : 200px">
      <v-autocomplete
        dense
        hide-details
        placeholder="Cari..."
        :items="usernames"
        item-text="username"
        :search-input.sync="search"
        return-object
        outlined
        rounded
        class="code__header-label"
        v-model="selectedUser"
        clearable
        @click:clear="onClear"
        @change="onChange"
    >
      </v-autocomplete>
    </div>
    <div v-else style="width : 250px">
      <v-text-field
        v-model="keyword"
        rounded
        outlined
        dense
        append-icon="fas fa-search"
        hide-details
        class="code__header-label"
        placeholder="Cari ..."
        @change="onChageKeywordCode"
      />
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data () {
    return {
      menu : false,
      selectedUser : {},
      filterBy : 'Username',
      isUsername : true,
      keyword : '',
      items: [
        { 
          title: 'Username',
          value : 'username'
        },
        { 
          title: 'Referral Code' ,
          value : 'referralCode'
        },
      ],
      usernames : [],
      search : null,
      isLoading : false,
      selectedFilter : {
        title : 'Username',
        value : 'username'
      }
    }
  },
  methods : {
    ...mapActions({
      getListAdmin: "account/getListRespone",
      fetchListAccounts : 'post/fetchListAccounts',
      searchAccounts : 'post/searchAccounts'
    }),
    onChageKeywordCode (value) {
      this.$emit('getCodeByKeyword', value)
    },
    onChange (value) {
      if(value) {
        this.$emit('getCodeByUsername', value )
      }
    },
    onClear () {
      this.$emit('onClearUsername')
    },
    selectItem (item) {
      this.filterBy = item.title
    },
    fetchAdminData() {
      this.loading = true
      const payload = {
        page : 1
      };
      return this.fetchListAccounts(payload)
        .then((response) => {
          this.usernames = response;
        });
    },
  },
  mounted () {
    this.fetchAdminData()
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
          const reformatData = response.map((r) => {
              return {
                username : r.username,
                accountId : r.id
              }
            })
          this.usernames = reformatData;
          this.isLoading = false
        })
        .catch(() => this.isLoading = false)
      }, 400)
    }
  },
}
</script>

<style lang="scss" src="./style.scss"></style>

