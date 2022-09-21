<template>
  <div>
    <v-autocomplete
      class="font-12"
      v-model="dataFilter"
      :items="itemsFilter"
      :search-input.sync="searchFilter"
      item-text="name"
      item-value="code"
      label="User"
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
        <span v-if="index === 0 && !isFocus" class="grey--text text-caption">
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
      paramsChannelTrending: (state) => state.post.paramsChannelTrending,
    }),
    dataFilter: {
      get() {
        return this.paramsChannelTrending;
      },
      set(v) {
        this.setParamsChannelTrending(v);
      },
    },
  },
  methods: {
    ...mapMutations({
      setParamsChannelTrending: "post/setParamsChannelTrending",
    }),
  },
};
</script>
