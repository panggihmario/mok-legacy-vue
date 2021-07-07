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
          <custom-select dense :items="sortList" v-model="selection" />
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
import { mapActions, mapState } from 'vuex'
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
      sortList: ["Newest", "Oldest"],
      selection: "Newest",
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
    this.getListProductBanned()
  }
}
</script>