<template>
  <div>
    <v-card outlined width="300px" style="border-radius: 8px">
      <v-data-table
        :headers="itemHeader"
        :items="listPreviewCategory"
        hide-default-footer
        :items-per-page="-1"
        fixed-header
        height="480px"
      >
        <template v-slot:item="{ index, item }">
          <tr :class="{ primarylowtint: item.qty > item.available }">
            <td class="font-12 font-weight-medium" style="border: none">
              {{ item.value }}
            </td>
            <td class="font-12 font-weight-medium" style="border: none">
              {{ item.percentage }}%
            </td>
            <td
              class="d-flex align-center font-12 font-weight-medium"
              style="border: none"
            >
              <v-tooltip
                v-if="item.qty > item.available"
                color="primary"
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    v-on="on"
                    :class="{ 'primary--text': item.qty > item.available }"
                  >
                    {{ item.qty }}
                  </span>
                </template>
                <span class="font-12 font-weight-medium"
                  >Qty melebihi Available harap diganti</span
                >
              </v-tooltip>
              <span v-else>
                {{ item.qty }}
              </span>
            </td>
            <td class="font-12 font-weight-medium" style="border: none">
              <div class="d-flex">
                <v-btn icon x-small @click="editPreviewCategory(item, index)">
                  <v-icon size="12px" color="secondary">fas fa-pen</v-icon>
                </v-btn>
                <v-btn
                  icon
                  x-small
                  @click="removePreviewCategory(item, index)"
                  class="ml-2"
                >
                  <v-icon color="red">fas fa-times</v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div class="whitesnow pt-3 px-5 pb-4" style="height: 193px">
        <div class="d-flex justify-space-between font-12 font-weight-medium">
          <span class="grey--text">Total</span>
          <b>{{ totalPercentage }}%</b>
        </div>
        <div
          class="d-flex justify-space-between font-12 font-weight-medium mt-2"
        >
          <span class="grey--text">Tersedia</span>
          <b>{{ availablePercentage }}%</b>
        </div>

        <div class="d-flex justify-space-between mt-5">
          <v-btn
            height="38px"
            block
            class="text-capitalize secondary"
            @click="submitData"
            :loading="loadingSubmit"
            :disabled="
              loadingSubmit ||
                totalData < 1 ||
                totalQtyGreater > 0 ||
                availablePercentage !== 0
            "
            >Terapkan Trending</v-btn
          >
        </div>

        <p class="carmine--text font-10 mt-3">
          Saat trending ini digunakan, maka trending sebelumnya tidak berlaku
          lagi dan akan digantikan dengan trending baru yang ada pada form ini.
        </p>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    listPreviewCategory: {
      type: Array,
      default: () => [],
    },
    availablePercentage: {
      type: Number,
    },
    totalData: {
      type: [Number, String],
    },
    totalQtyGreater: {
      type: Number,
    },
    loadingSubmit: {
      type: Boolean,
    },
  },
  data() {
    return {
      itemHeader: [
        {
          text: "Hashtag",
          sortable: false,
          class: "whitesnow",
          width: 80,
        },
        {
          text: "%",
          sortable: false,
          class: "whitesnow",
          width: 10,
        },
        {
          text: "Qty",
          sortable: false,
          class: "whitesnow",
          width: 10,
        },
        {
          sortable: false,
          class: "whitesnow",
        },
      ],
      totalPercentage: 0,
    };
  },
  watch: {
    listPreviewCategory() {
      if (this.listPreviewCategory.length > 0) {
        this.totalPercentage = 0;
        for (let i = 0; i < this.listPreviewCategory.length; i++) {
          const e = this.listPreviewCategory[i];
          this.totalPercentage += e.percentage;
        }
        this.changeAvailablePercentage();
      } else {
        this.totalPercentage = 0;
        this.changeAvailablePercentage();
      }
    },
  },
  methods: {
    changeAvailablePercentage() {
      this.$emit("changeAvailablePercentage", this.totalPercentage);
    },
    editPreviewCategory(i, idx) {
      this.$emit("editPreviewCategory", i, idx);
    },
    removePreviewCategory(i, idx) {
      this.$emit("removePreviewCategory", i, idx);
    },
    submitData() {
      this.$emit("submitData");
    },
  },
};
</script>

<style lang="scss" scoped>
.font-10 {
  font-size: 10px;
}
</style>
