<template>
  <div>
    <v-card outlined width="386px" style="border-radius: 8px">
      <div>
        <div class="ma-4">
          <v-text-field
            v-model="search"
            placeholder="Search kategori"
            dense
            outlined
            hide-details
            clearable
            class="font-12"
            @keyup.enter="actionSearchListHashtagFormationSubs"
          ></v-text-field>
        </div>

        <v-divider></v-divider>

        <div style="height: 600px; overflow: auto">
          <div class="d-flex font-12 whitesnow">
            <div class="col">Hashtag</div>
            <div class="col">Available</div>
          </div>

          <div
            v-if="alertFailedSearch"
            class="d-flex align-start pa-3"
          >
            <v-icon small color="red" class="mr-1"
              >fas fa-exclamation-circle</v-icon
            >
            <span class="font-12 font-weight-medium red--text"
              >Tidak menemukan keyword yang sesuai dengan yang kamu cari
              silahkan gunakan keyword lain</span
            >
          </div>
          <div v-else>
            <div v-if="listMasterCategorySearch.length > 0">
              <div
                v-for="(i, idx) in listMasterCategorySearch"
                :key="idx"
                class="d-flex align-center font-12"
                style="height: 38px"
                @mouseenter="onHover(i.id)"
                @mouseleave="onHover('')"
              >
                <div class="col">{{ i.value }}</div>
                <div class="col-4">{{ i.available }}</div>
                <div class="col-2">
                  <v-btn
                    v-if="hoverId == i.id && availablePercentage > 0"
                    icon
                    x-small
                    @click="selectCategory(i)"
                  >
                    <v-icon small color="secondary">fas fa-plus-circle</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
            <div v-else>
              <div
                v-for="(i, idx) in listMasterCategory"
                :key="idx"
                class="d-flex align-center font-12"
                style="height: 38px"
                @mouseenter="onHover(i.id)"
                @mouseleave="onHover('')"
              >
                <div class="col">{{ i.value }}</div>
                <div class="col-4">{{ i.available }}</div>
                <div class="col-2">
                  <v-btn
                    v-if="hoverId == i.id && availablePercentage > 0"
                    icon
                    x-small
                    @click="selectCategory(i)"
                  >
                    <v-icon small color="secondary">fas fa-plus-circle</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-card
                v-if="page < totalPage"
                v-intersect="onScrollSubCategory"
              ></v-card>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    listMasterCategory: {
      type: Array,
      default: () => [],
    },
    listMasterCategorySearch: {
      type: Array,
      default: () => [],
    },
    availablePercentage: {
      type: Number,
      default: 100,
    },
    page: {
      type: Number,
    },
    totalPage: {
      type: Number,
    },
    alertFailedSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hoverId: "",
      search: "",
      itemHeaders: [
        {
          text: "Hashtag",
          sortable: false,
          class: "whitesnow",
        },
        {
          text: "Available",
          sortable: false,
          class: "whitesnow",
        },
        {
          sortable: false,
          class: "whitesnow",
          width: 60,
        },
      ],
    };
  },
  watch: {
    search() {
      if (this.search == null) {
        this.search = "";
        this.actionSearchListHashtagFormationSubs();
      }
    },
  },
  methods: {
    selectCategory(i) {
      this.$emit("onChooseCategory", i);
    },
    onHover(id) {
      this.hoverId = id;
    },
    onScrollSubCategory() {
      this.$emit("onScrollSubCategory");
    },
    actionSearchListHashtagFormationSubs() {
      this.$emit("actionSearchListHashtagFormationSubs", this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-category:hover {
  background-color: $secondarylowtint;
}
</style>
