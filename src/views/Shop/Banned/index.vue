<template>
  <div>
     <HeaderContent
      label="List Banned Product"
      :list="crumbs"
    >
    </HeaderContent>
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
       crumbs: [
        {
          text: "Product",
        },
        {
          text : 'Banned',
          disabled : true
        }
      ],
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
    })
  },
  mounted() {
    this.getListProductBanned()
  }
}
</script>