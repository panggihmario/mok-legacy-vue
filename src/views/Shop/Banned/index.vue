<template>
  <div>
     <HeaderContent
      label="List Banned Product"
      :list="crumbs"
    >
    </HeaderContent>
     <v-row>
      <v-col cols="8" class="d-flex">
        <div class="d-flex align-center">
          <span class="mb-8 mr-2">Sort</span>
          <custom-select 
            dense :items="sortList" 
            v-model="selection" 
            item-text="name"
            @input="onSelect"
          />
        </div>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <custom-input @keyup.enter="onSearch" v-model="value" dense placeholder="search" />
      </v-col>
    </v-row>
     <v-row
      dense
    >
      <v-col 
        cols="auto"
        v-for="(item, idx) in bannedProducts"
        :key="idx"
      >
        <CardImage :item="item" />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import HeaderContent from "@/containers/HeaderContent";
import CardImage from './cardImage'
export default {
  data() {
    return {
      value : '',
       crumbs: [
        {
          text: "Product",
          href : '/product'
        },
        {
          text : 'Banned',
          disabled : true
        }
      ],
      sortList: [
        {
          name : 'Newest',
          value : 'desc'
        },
        {
          name : 'Oldest',
          value : 'asc'
        }
      ],
      selection: "desc",
    }
  },
  components : {
    HeaderContent,
    CardImage
  },
  computed : {
    ...mapState ({
      bannedProducts : (state) => state.product.bannedProducts
    })
  },
  methods : {
    ...mapActions({
      getListProductBanned : 'product/getListProductBanned'
    }),
    ...mapMutations({
      setBannedProducts : 'product/setBannedProducts'
    }),
    onSelect(value) {
      console.log(value)
      const payload = {
        size: 24,
        page: 0,
        sort : `createAt,${value}`
      };
      return this.getListProductBanned(payload)
        .then(response =>{
          console.log(response)
          const responseData = response.data.data.content
          return this.setBannedProducts(responseData)
        })
    },
    fetchBannedProduct : function () {
      const payload = {
        size: 24,
        page: 0,
        sort : `createAt,${this.selection}`
      };
      return this.getListProductBanned(payload)
        .then(response =>{
          const responseData = response.data.data.content
          return this.setBannedProducts(responseData)
        })
    },
    onSearch : function () {
      const value = this.value
      this.$router.push({
        name : 'searchProduct',
        query : {
          value,
          isBanned : true
        }
      })
    },
  },
  mounted() {
    this.fetchBannedProduct()
  }
}
</script>