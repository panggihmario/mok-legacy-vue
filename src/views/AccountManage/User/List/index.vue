<template>
  <div>
    <Header />

    <Search
      :totalUser="totalUser"
      @onSearch="onSearch"
      @resetSearch="resetSearch"
    />

    <div class="mt-6"></div>
    <Table :data="data" />

    <div class="mt-8 d-flex justify-end">
      <v-pagination
        v-model="currentPage"
        :length="pageCount"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        :total-visible="6"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Table from "./table.vue";
import Header from "./header.vue";
import Search from "./search.vue";
export default {
  computed: {
    currentPage: {
      get() {
        const page = this.$route.params.page;
        const current = Number(page);
        return current;
      },
      set(value) {
        const query = this.$route.query.search;
        return this.fetchSearchData(value, query)
      },
    },
  },
  components: {
    Table,
    Header,
    Search,
  },
  data() {
    return {
      payloadSearch: "",
      loading: false,
      page: 1,
      pageCount: 0,
      totalUser: 0,
      data: [],
    };
  },
  methods: {
    ...mapActions({
      getListRespone: "account/getListRespone",
      searchAccount: "account/searchAccount",
    }),
    resetSearch() {
      return this.fetchSearchData(1);
    },
    onSearch(keyword) {
      const page = 1
      return this.fetchSearchData(page, keyword)
    },
    fetchSearchData (page, keyword = this.$route.query.search ) {
      const payload = {
        type : 'users',
        params : keyword,
        data : {
          page : page - 1
        }
      }
      console.log(page)
      return this.searchAccount(payload)
        .then((resp) => {
          this.$router
            .push({
              name: this.$route.name,
              params: {
                page  : page,
              },
              query: {
                search: keyword,
              },
            })
            .catch(() => {})
          return resp
        })
        .then((response => {
          return this.formattingResponse(response);
        }))
        .catch((err) => {
          return err;
        });
    },
    formattingResponse(response) {
      const totalDataUser = response.data.data.totalElements;
      this.totalUser = totalDataUser;
      this.totalPages = totalDataUser;
      const totalData = response.data.data.totalPages;
      this.pageCount = totalData;
      const responseData = response.data.data.content;
      const formatResponse = responseData.map((r) => {
        return {
          user: r.name,
          username: r.username,
          photo: r.photo,
          verified: r.isVerified,
          type: r.accountType,
          id: r.id,
        };
      });
      this.data = formatResponse;
    },
    async getDataBaseOnPage(value = this.$route.params.page) {
      const payload = {
        params: this.$route.query.search,
        type: "users",
        data: {
          page: value - 1,
        },
      };
      const response = await this.searchAccount(payload);
      if (response.status === 200) {
        this.formattingResponse(response);
      }
    },
  },
  mounted() {
    this.fetchSearchData(this.$route.params.page)
  },
};
</script>

<style lang="sass" scoped>
.account-manage
  &__title
    font-size: $font-size-24
  &__subTitle
    font-size: $font-size-12
.item
  &__data
    padding-top: 16px
    padding-bottom: 16px
</style>
