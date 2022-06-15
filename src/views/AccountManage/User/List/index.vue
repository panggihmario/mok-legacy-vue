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
        const name = this.$route.name;
        const query = this.$route.query.search
        
        if(query) {
          const payload = {
            params: query,
            type: "users",
            data: {
              page: value - 1,
            },
          };
          return this.handleSearch(payload)
            .then(() => {
              this.$router.push({
                name,
                params: {
                  page: value,
                },
                query : {
                  search : payload.params
                }
              })
            })
        }else {
          this.$router.push({
            name,
            params: {
              page: value,
            },
          });
          return this.getDataBaseOnPage(value);
        }
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
      return this.getDataBaseOnPage()
    },
    onSearch(keyword) {
      const payload = {
        params: keyword,
        type: "users",
        data: {
          page: 0,
        },
      };
      return this.handleSearch(payload)
        .then(() => {
          this.$router.push({
            name: this.$route.name,
            params: {
              page: 1,
            },
            query : {
              search : payload.params
            }
          })
          .catch(() => {})
        })
    },
    handleSearch (payload) {
      return this.searchAccount(payload)
        .then(response =>  {return this.formattingResponse(response)} )
        .catch(err =>  {return err} )
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
      const params = {
        type: "users",
        param: {
          page: value - 1,
        },
      };
      const response = await this.getListRespone(params);
      if (response.status === 200) {
        this.formattingResponse(response);
      }
    },
  },
  mounted() {
    this.getDataBaseOnPage();
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
    // border-bottom: none !important
</style>
