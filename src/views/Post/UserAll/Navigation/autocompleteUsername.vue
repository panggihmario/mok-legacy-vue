<template>
  <div>
    <v-autocomplete
      class="font-12"
      v-model="dataFilter"
      :items="itemsFilter"
      :search-input.sync="searchFilter"
      item-text="username"
      item-value="username"
      placeholder="Pilih User"
      solo
      dense
      hide-details
      flat
      multiple
      background-color="white"
      @focus="isFocus = true"
      @blur="isFocus = false"
    >
      <template v-slot:selection="{ index }">
        <span v-if="index === 0 && !isFocus" class="black--text text-caption">
          {{ dataFilter.length }} selected
        </span>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["selectedItems", "itemsFilter"],
  data() {
    return {
      searchFilter: "",
      isFocus: false,
    };
  },
  watch: {
    searchFilter() {
      if (this.searchFilter != null && this.searchFilter.length > 0) {
        this.$emit("onSearchFilter", this.searchFilter);
      }
    },
  },
  computed: {
    ...mapState({
      paramsUsersTrending: (state) => state.post.paramsUsersTrending,
    }),
    dataFilter: {
      get() {
        return this.paramsUsersTrending;
      },
      set(v) {
        this.setParamsUsersTrending(v);
      },
    },
  },
  methods: {
    ...mapMutations({
      setParamsUsersTrending: "post/setParamsUsersTrending",
    }),
  },
};
</script>

<style lang="scss" scoped>
.font-12 {
  font-size: 12px !important;
}
</style>
